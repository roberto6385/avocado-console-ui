import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';

import {useDoubleClick} from '../../../hooks/useDoubleClick';
import ResourceContextMenu from '../../ContextMenus/ResourceContextMenu';
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

function searchNode(node, id) {
	if (node.id === id) {
		return true;
	} else if (node.children && node.children.length > 0) {
		for (let x of node.children) {
			searchNode(x, id);
		}
	}
	return false;
}

function isFavoriteServer(root, id) {
	for (let x of root) {
		if (searchNode(x, id)) return true;
	}
	return false;
}

const Resource = ({data, indent}) => {
	const dispatch = useDispatch();
	const {favoriteTree} = useSelector(favoritesSelector.all);

	const {selectedResource, computingSystemServicePorts, resources, accounts} =
		useSelector(remoteResourceSelector.all);
	const {userData} = useSelector(authSelector.all);
	const resource = useMemo(
		() => resources.find((v) => v.id === data.id),
		[resources, data.id],
	);

	const {show} = useContextMenu({
		id: data.id + '-resources-context-menu',
	});

	const onClickResource = useDoubleClick(
		() => {
			const computingSystemPort = computingSystemServicePorts.find(
				(v) => v.id === data.id,
			);
			const account = accounts.find(
				(v) => v.resourceId === data.id && v.isDefaultAccount === true,
			);

			if (computingSystemPort.protocol === 'SSH2') {
				dispatch(
					sshAction.connectRequest({
						token: userData.access_token,
						host: computingSystemPort.host,
						port: computingSystemPort.port,
						user: account.user,
						password: account.password,
						id: computingSystemPort.id,
					}),
				);
			}
			if (computingSystemPort.protocol === 'SFTP') {
				dispatch({
					type: CONNECTION_REQUEST,
					payload: {
						token: userData.access_token, // connection info
						host: computingSystemPort.host,
						port: computingSystemPort.port,
						user: account.user,
						password: account.password,
						name: computingSystemPort.name, // create tab info
						id: computingSystemPort.id,
					},
				});
			}
		},
		() => {
			if (selectedResource === data.id) {
				dispatch(remoteResourceAction.setSelectedResource(null));
			} else {
				dispatch(remoteResourceAction.setSelectedResource(data.id));
			}
		},

		[
			selectedResource,
			data.id,
			userData,
			computingSystemServicePorts,
			accounts,
			dispatch,
		],
	);

	const openResourceContextMenu = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(remoteResourceAction.setSelectedResource(data.id));
			show(e);
		},
		[data, dispatch, show],
	);

	const onClickFavoriteIcon = useCallback(() => {
		if (favoriteTree && isFavoriteServer(favoriteTree, data.id)) {
			dispatch(favoritesAction.deleteFavorite(data.id));
		} else {
			dispatch(favoritesAction.addFavorite(data.id));
		}
	}, [data.id, dispatch, favoriteTree]);

	return (
		<React.Fragment>
			<ServerItem
				onClick={onClickResource}
				onContextMenu={openResourceContextMenu}
				selected={selectedResource === data.id ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					size={'sm'}
					margin_right={'12px'}
					itype={selectedResource === data.id && 'selected'}
				>
					{resource.data.osType === 'linux' && linuxServerIcon}
					{resource.data.osType === 'aws' && awsServerIcon}
				</Icon>

				<ResourceItemTitle>
					{resource.name}
					<IconButton
						className={
							isFavoriteServer(favoriteTree, data.id)
								? 'bookmark_button active'
								: 'bookmark_button'
						}
						size={'sm'}
						margin_right={'0px'}
						onClick={onClickFavoriteIcon}
						itype={
							isFavoriteServer(favoriteTree, data.id)
								? 'selected'
								: undefined
						}
					>
						{bookmarkIcon}
					</IconButton>
				</ResourceItemTitle>
			</ServerItem>
			<ResourceContextMenu resourceId={data.id} />
		</React.Fragment>
	);
};

Resource.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Resource;
