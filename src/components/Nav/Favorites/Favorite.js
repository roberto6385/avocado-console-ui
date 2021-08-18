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
import FavoritesContextMenu from '../../ContextMenus/FavoritesContextMenu';
import {Icon} from '../../../styles/components/icon';
import {
	ResourceItem,
	ResourceItemTitle,
} from '../../../styles/components/navigationBar';
import {authSelector} from '../../../reducers/api/auth';

const Favorite = ({data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server, server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

	const {userData} = useSelector(authSelector.all);

	const account = useMemo(
		() => identity.find((it) => it.key === data.key && it.checked === true),
		[identity, data],
	);

	const onClickFavorite = useDoubleClick(
		() => {
			const resource = server.find((i) => i.id === data.id);

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
			if (clicked_server === data.key) {
				dispatch({type: SET_CLICKED_SERVER, payload: null});
			} else {
				dispatch({type: SET_CLICKED_SERVER, payload: data.key});
			}
		},
		[clicked_server, data, userData, server, identity, dispatch, account],
	);

	const {show} = useContextMenu({
		id: data.key + '-favorites-context-menu',
	});

	const openFavoriteContextMenu = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({type: SET_CLICKED_SERVER, payload: data.key});
			show(e);
		},
		[data, dispatch, show],
	);

	const onDragStartFavorite = useCallback(() => {
		console.log('prev put item');
		dispatch({type: SET_CLICKED_SERVER, payload: data.key});
	}, [data, dispatch]);

	const onDropFavorite = useCallback(
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

	return (
		<React.Fragment>
			<ResourceItem
				onClick={onClickFavorite}
				draggable='true'
				onDragStart={onDragStartFavorite}
				onDrop={onDropFavorite}
				onContextMenu={openFavoriteContextMenu}
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

				<ResourceItemTitle>{data.name}</ResourceItemTitle>
			</ResourceItem>

			<FavoritesContextMenu identity={account} data={data} />
		</React.Fragment>
	);
};

Favorite.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Favorite;
