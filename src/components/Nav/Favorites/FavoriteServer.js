import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {useDoubleClick} from '../../../hooks/useDoubleClick';
import {
	SET_CLICKED_SERVER,
	SORT_FAVORITE_RESOURCES,
} from '../../../reducers/common';
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

const FavoriteServer = ({data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server, server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

	const {userData} = useSelector(authSelector.all);

	const searchedIdentity = useMemo(
		() => identity.find((it) => it.key === data.key && it.checked === true),
		[identity, data],
	);

	const onClickServerItem = useDoubleClick(
		() => {
			const searchedServer = server.find((i) => i.id === data.id);

			if (searchedServer.protocol === 'SSH2') {
				dispatch({
					type: SSH_SEND_CONNECTION_REQUEST,
					payload: {
						token: userData.access_token,
						...searchedIdentity,
						user: searchedIdentity.user,
						password: searchedIdentity.password,
					},
				});
			} else if (searchedServer.protocol === 'SFTP') {
				dispatch({
					type: CONNECTION_REQUEST,
					payload: {
						token: userData.access_token, // connection info
						host: searchedServer.host,
						port: searchedServer.port,
						user: searchedIdentity.user,
						password: searchedIdentity.password,
						name: searchedServer.name, // create tab info
						key: searchedServer.key,
						id: searchedServer.id,
					},
				});
			}
		},
		() => {
			if (clicked_server === data.key) {
				dispatch({type: SET_CLICKED_SERVER, payload: null});
			} else {
				dispatch({type: SET_CLICKED_SERVER, payload: data.key});
			}
		},
		[
			clicked_server,
			data,
			userData,
			server,
			identity,
			dispatch,
			searchedIdentity,
		],
	);

	const {show} = useContextMenu({
		id: data.key + 'server',
	});

	const OpenFavoriteServerContextMenu = useCallback(
		(e) => {
			e.preventDefault();
			console.log('OpenServerContextMenu item');
			dispatch({type: SET_CLICKED_SERVER, payload: data.key});
			show(e);
		},
		[data, dispatch, show],
	);

	const prevPutItem = useCallback(() => {
		console.log('prev put item');
		dispatch({type: SET_CLICKED_SERVER, payload: data.key});
	}, [data, dispatch]);

	const nextPutItem = useCallback(
		(e) => {
			console.log('favorites server next put item');

			e.stopPropagation();

			data.type === 'folder' &&
				dispatch({
					type: SORT_FAVORITE_RESOURCES,
					payload: {next: data},
				});
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
				selected={clicked_server === data.key ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					size={'sm'}
					margin_right={'12px'}
					itype={clicked_server === data.key ? 'selected' : undefined}
				>
					{data.icon === 'linux' && linuxServerIcon}
					{data.icon === 'aws' && awsServerIcon}
				</Icon>

				<NavigationItemTitle>{data.name}</NavigationItemTitle>
			</NavigationItem>

			<FavoritesContextMenu identity={searchedIdentity} data={data} />
		</React.Fragment>
	);
};

FavoriteServer.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FavoriteServer;
