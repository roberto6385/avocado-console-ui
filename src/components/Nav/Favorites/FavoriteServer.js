import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {useDoubleClick} from '../../../hooks/useDoubleClick';
import {
	LOCAL_SAVE_FAVORITES,
	SET_CLICKED_SERVER,
	SORT_FAVORITES_SERVER_AND_FOLDER,
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
import {AUTH} from '../../../reducers/api/auth';

const FavoriteServer = ({data, indent, temp}) => {
	const dispatch = useDispatch();
	const {clicked_server, server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {userData} = useSelector((state) => state[AUTH], shallowEqual);
	const correspondedIdentity = useMemo(
		() => identity.find((it) => it.key === data.key && it.checked === true),
		[identity, data],
	);

	const onHybridClick = useDoubleClick(
		() => {
			if (temp) return;

			const correspondedServer = server.find((i) => i.id === data.id);

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
			correspondedIdentity,
		],
	);

	const {show} = useContextMenu({
		id: data.key + 'server',
	});

	const contextMenuOpen = useCallback(
		(e) => {
			e.preventDefault();
			console.log('contextMenuOpen item');
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
					type: SORT_FAVORITES_SERVER_AND_FOLDER,
					payload: {next: data},
				});
			dispatch({type: LOCAL_SAVE_FAVORITES});
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
				onClick={onHybridClick}
				draggable='true'
				onDragStart={prevPutItem}
				onDragOver={handleDragOver}
				onDrop={nextPutItem}
				onContextMenu={contextMenuOpen}
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
			{!temp && (
				<FavoritesContextMenu
					correspondedIdentity={correspondedIdentity}
					data={data}
				/>
			)}
		</React.Fragment>
	);
};

FavoriteServer.propTypes = {
	data: PropTypes.object.isRequired,
	temp: PropTypes.bool.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FavoriteServer;
