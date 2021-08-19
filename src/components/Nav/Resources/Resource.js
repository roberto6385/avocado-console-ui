import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';

import {useDoubleClick} from '../../../hooks/useDoubleClick';
import ResourcesContextMenu from '../../ContextMenus/ResourcesContextMenu';
import {
	awsServerIcon,
	bookmarkIcon,
	linuxServerIcon,
} from '../../../icons/icons';
import styled from 'styled-components';
import {CONNECTION_REQUEST} from '../../../reducers/sftp';
import {Icon, IconButton} from '../../../styles/components/icon';
import {
	ResourceItem,
	ResourceItemTitle,
} from '../../../styles/components/navigationBar';
import {authSelector} from '../../../reducers/api/auth';
import {
	remoteResourceAction,
	remoteResourceSelector,
} from '../../../reducers/remoteResource';
import {favoritesAction, favoritesSelector} from '../../../reducers/favorites';
import {startSearchingNode} from '../../../utils/redux';
import {sshAction} from '../../../reducers/ssh';

export const ServerItem = styled(ResourceItem)`
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

const Resource = ({data, indent}) => {
	const dispatch = useDispatch();
	const {favoriteTree} = useSelector(favoritesSelector.all);

	const {selectedResource, resources, resourceTree, accounts} = useSelector(
		remoteResourceSelector.all,
	);
	const {userData} = useSelector(authSelector.all);

	const account = useMemo(
		() => accounts.find((it) => it.key === data.key && it.checked === true),
		[accounts, data],
	);

	const {show} = useContextMenu({
		id: data.key + '-resources-context-menu',
	});

	const onClickResource = useDoubleClick(
		() => {
			const resource = resources.find((i) => i.id === data.id);

			if (resource.protocol === 'SSH2') {
				dispatch(
					sshAction.connectRequest({
						token: userData.access_token,
						...resource,
						user: account.user,
						password: account.password,
					}),
				);
			} else if (resource.protocol === 'SFTP') {
				dispatch({
					type: CONNECTION_REQUEST,
					payload: {
						token: userData.access_token, // connection info
						host: resource.host,
						port: resource.port,
						user: account.user,
						password: account.password,

						name: resource.name, // create tab info
						key: resource.key,
						id: resource.id,
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

		[selectedResource, data, userData, resources, accounts, dispatch],
	);

	const openResourceContextMenu = useCallback(
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
			dispatch(
				favoritesAction.addFavorite(
					startSearchingNode(resourceTree, data.key),
				),
			);
		}
	}, [data.key, dispatch, favoriteTree, resourceTree]);

	return (
		<React.Fragment>
			<ServerItem
				onClick={onClickResource}
				onContextMenu={openResourceContextMenu}
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

				<ResourceItemTitle>
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
				</ResourceItemTitle>
			</ServerItem>
			<ResourcesContextMenu identity={account} data={data} />
		</React.Fragment>
	);
};

Resource.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Resource;
