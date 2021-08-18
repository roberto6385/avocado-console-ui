import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {useDoubleClick} from '../../../hooks/useDoubleClick';
import {SSH_SEND_CONNECTION_REQUEST} from '../../../reducers/ssh';
import {awsServerIcon, linuxServerIcon} from '../../../icons/icons';
import {CONNECTION_REQUEST} from '../../../reducers/sftp';
import FavoritesContextMenu from '../../ContextMenu/FavoritesContextMenu';
import {Icon} from '../../../styles/components/icon';
import {
	NavigationItem,
	NavigationItemTitle,
} from '../../../styles/components/navigationBar';
import {authSelector} from '../../../reducers/api/auth';
import {
	remoteResourceAction,
	remoteResourceSelector,
} from '../../../reducers/remoteResource';
import {favoritesAction} from '../../../reducers/favorites';

const FavoriteServer = ({data, indent}) => {
	const dispatch = useDispatch();
	const {selectedResource, resources, accounts} = useSelector(
		remoteResourceSelector.all,
	);

	const {userData} = useSelector(authSelector.all);

	const account = useMemo(
		() => accounts.find((it) => it.key === data.key && it.checked === true),
		[accounts, data],
	);

	const onClickServerItem = useDoubleClick(
		() => {
			const resource = resources.find((i) => i.id === data.id);

			if (resource.protocol === 'SSH2') {
				dispatch({
					type: SSH_SEND_CONNECTION_REQUEST,
					payload: {
						token: userData.access_token,
						...account,
						user: account.user,
						password: account.password,
					},
				});
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
		id: data.key + 'server',
	});

	const OpenFavoriteServerContextMenu = useCallback(
		(e) => {
			e.preventDefault();
			console.log('OpenServerContextMenu item');
			dispatch(remoteResourceAction.setSelectedResource(data.key));
			show(e);
		},
		[data, dispatch, show],
	);

	const prevPutItem = useCallback(() => {
		console.log('prev put item');
		dispatch(remoteResourceAction.setSelectedResource(data.key));
	}, [data, dispatch]);

	const nextPutItem = useCallback(
		(e) => {
			console.log('favorites server next put item');

			e.stopPropagation();

			data.type === 'folder' &&
				dispatch(favoritesAction.sortFavorites({next: data}));
		},
		[data, dispatch],
	);

	const handleDragOver = useCallback((e) => {
		e.stopPropagation();
		e.preventDefault();
	}, []);

	return (
		<React.Fragment>
			<NavigationItem
				onClick={onClickServerItem}
				draggable='true'
				onDragStart={prevPutItem}
				onDragOver={handleDragOver}
				onDrop={nextPutItem}
				onContextMenu={OpenFavoriteServerContextMenu}
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

				<NavigationItemTitle>{data.name}</NavigationItemTitle>
			</NavigationItem>

			<FavoritesContextMenu identity={account} data={data} />
		</React.Fragment>
	);
};

FavoriteServer.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FavoriteServer;
