import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';

import {useDoubleClick} from '../../../hooks/useDoubleClick';
import {awsServerIcon, linuxServerIcon} from '../../../icons/icons';
import {CONNECTION_REQUEST} from '../../../reducers/sftp';
import FavoriteContextMenu from '../../ContextMenus/FavoriteContextMenu';
import {Icon} from '../../../styles/components/icon';
import {
	ResourceItem,
	ResourceItemTitle,
} from '../../../styles/components/navigationBar';
import {authSelector} from '../../../reducers/api/auth';
import {
	remoteResourceAction,
	remoteResourceSelector,
} from '../../../reducers/remoteResource';
import {favoritesAction} from '../../../reducers/favorites';
import {sshAction} from '../../../reducers/ssh';

const Favorite = ({data, indent}) => {
	const dispatch = useDispatch();
	const {selectedResource, resources, accounts} = useSelector(
		remoteResourceSelector.all,
	);

	const {userData} = useSelector(authSelector.all);

	const account = useMemo(
		() =>
			accounts.find(
				(v) => v.resourceId === data.key && v.isDefaultAccount === true,
			),
		[accounts, data],
	);

	const onClickFavorite = useDoubleClick(
		() => {
			const resource = resources.find((i) => i.id === data.id);

			if (resource.protocol === 'SSH2') {
				dispatch(
					sshAction.connectRequest({
						token: userData.access_token,
						...account,
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
		[
			selectedResource,
			data,
			userData,
			resources,
			accounts,
			dispatch,
			account,
		],
	);

	const {show} = useContextMenu({
		id: data.key + '-favorites-context-menu',
	});

	const openFavoriteContextMenu = useCallback(
		(e) => {
			e.preventDefault();

			dispatch(remoteResourceAction.setSelectedResource(data.key));

			show(e);
		},
		[data, dispatch, show],
	);

	const onDragStartFavorite = useCallback(() => {
		console.log('prev put item');
		dispatch(remoteResourceAction.setSelectedResource(data.key));
	}, [data, dispatch]);

	const onDropFavorite = useCallback(
		(e) => {
			console.log('favorites server next put item');

			e.stopPropagation();

			data.type === 'folder' &&
				dispatch(favoritesAction.sortFavorites({next: data}));
		},
		[data, dispatch],
	);

	return (
		<React.Fragment>
			<ResourceItem
				onClick={onClickFavorite}
				draggable='true'
				onDragStart={onDragStartFavorite}
				onDrop={onDropFavorite}
				onContextMenu={openFavoriteContextMenu}
				selected={selectedResource === data.key ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					size={'sm'}
					margin_right={'12px'}
					itype={
						selectedResource === data.key ? 'selected' : undefined
					}
				>
					{data.icon === 'linux' && linuxServerIcon}
					{data.icon === 'aws' && awsServerIcon}
				</Icon>

				<ResourceItemTitle>{data.name}</ResourceItemTitle>
			</ResourceItem>

			<FavoriteContextMenu identity={account} data={data} />
		</React.Fragment>
	);
};

Favorite.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Favorite;
