import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {useDoubleClick} from '../../../hooks/useDoubleClick';
import ServerContextMenu from '../../ContextMenu/ServerContextMenu';
import {SSH_SEND_CONNECTION_REQUEST} from '../../../reducers/ssh';
import {
	awsServerIcon,
	bookmarkIcon,
	linuxServerIcon,
} from '../../../icons/icons';
import styled from 'styled-components';
import {CONNECTION_REQUEST} from '../../../reducers/sftp';
import {Icon, IconButton} from '../../../styles/components/icon';
import {
	NavigationItem,
	NavigationItemTitle,
} from '../../../styles/components/navigationBar';
import {authSelector} from '../../../reducers/api/auth';
import {
	remoteResourceAction,
	remoteResourceSelector,
} from '../../../reducers/remoteResource';
import {favoritesAction, favoritesSelector} from '../../../reducers/favorites';

export const ServerItem = styled(NavigationItem)`
	.bookmark_button {
		display: none;
	}
	.active {
		display: block;
	}
	&:hover {
		.bookmark_button {
			display: block;
		}
	}
`;

function searchNode(node, key) {
	if (node.key === key) {
		return true;
	} else if (node.contain && node.contain.length > 0) {
		for (let x of node.contain) {
			searchNode(x, key);
		}
	}
	return false;
}

function isFavoriteServer(root, key) {
	for (let x of root) {
		if (searchNode(x, key)) return true;
	}
	return false;
}

const Server = ({data, indent}) => {
	const dispatch = useDispatch();
	const {favoriteTree} = useSelector(favoritesSelector.all);

	const {selectedResource, resources, accounts} = useSelector(
		remoteResourceSelector.all,
	);
	const {userData} = useSelector(authSelector.all);
	const correspondedIdentity = useMemo(
		() => accounts.find((it) => it.key === data.key && it.checked === true),
		[accounts, data],
	);

	const onHybridClick = useDoubleClick(
		() => {
			const correspondedServer = resources.find((i) => i.id === data.id);

			if (correspondedServer.protocol === 'SSH2') {
				dispatch({
					type: SSH_SEND_CONNECTION_REQUEST,
					payload: {
						token: userData.access_token,
						...correspondedServer,
						user: correspondedIdentity.user,
						password: correspondedIdentity.password,
					},
				});
			} else if (correspondedServer.protocol === 'SFTP') {
				dispatch({
					type: CONNECTION_REQUEST,
					payload: {
						token: userData.access_token, // connection info
						host: correspondedServer.host,
						port: correspondedServer.port,
						user: correspondedIdentity.user,
						password: correspondedIdentity.password,

						name: correspondedServer.name, // create tab info
						key: correspondedServer.key,
						id: correspondedServer.id,
					},
				});
			}
		},
		() => {
			if (selectedResource === data.key) {
				dispatch(remoteResourceAction.setSelectedResource(null));
			} else {
				dispatch(remoteResourceAction.setSelectedResource(data.key));
			}
		},
		[
			selectedResource,
			data,
			userData,
			resources,
			accounts,
			dispatch,
			correspondedIdentity,
		],
	);

	const {show} = useContextMenu({
		id: data.key + 'server',
	});

	const openServerContextMenu = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(remoteResourceAction.setSelectedResource(data.key));
			show(e);
		},
		[data, dispatch, show],
	);

	const onClickFavoriteIcon = useCallback(() => {
		console.log(isFavoriteServer(favoriteTree, data.key));

		if (isFavoriteServer(favoriteTree, data.key)) {
			dispatch(favoritesAction.deleteFavorite(data.key));
		} else {
			dispatch(favoritesAction.addFavorite(data.key));
		}
	}, [data, favoriteTree]);

	return (
		<React.Fragment>
			<ServerItem
				onClick={onHybridClick}
				onContextMenu={openServerContextMenu}
				selected={selectedResource === data.key ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					size={'sm'}
					margin_right={'12px'}
					itype={selectedResource === data.key && 'selected'}
				>
					{data.icon === 'linux' && linuxServerIcon}
					{data.icon === 'aws' && awsServerIcon}
				</Icon>

				<NavigationItemTitle>
					{data.name}
					<IconButton
						className={
							isFavoriteServer(favoriteTree, data.key)
								? 'bookmark_button active'
								: 'bookmark_button'
						}
						size={'sm'}
						margin_right={'0px'}
						onClick={onClickFavoriteIcon}
						itype={
							isFavoriteServer(favoriteTree, data.key)
								? 'selected'
								: undefined
						}
					>
						{bookmarkIcon}
					</IconButton>
				</NavigationItemTitle>
			</ServerItem>
			<ServerContextMenu identity={correspondedIdentity} data={data} />
		</React.Fragment>
	);
};

Server.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Server;
