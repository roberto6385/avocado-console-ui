import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {CONNECTION_REQUEST} from '../../reducers/sftp';
import {SSH_SEND_CONNECTION_REQUEST} from '../../reducers/ssh';
import {
	ADD_FOLDER_ON_FAVORITES,
	DELETE_FAVORITE_SERVER,
} from '../../reducers/common';
import {ContextMenu} from '../../styles/components/contextMenu';
import {authSelector} from '../../reducers/api/auth';

const FavoritesContextMenu = ({identity, data}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('contextMenu');
	const {server} = useSelector((state) => state.common, shallowEqual);
	const {userData} = useSelector(authSelector.all);

	const contextMenuList = {
		'connect-ssh': t('connectSsh'),
		'connect-sftp': t('connectSftp'),
		'delete-favorite': t('deleteBookmark'),
		'add-folder': t('newFolder'),
	};

	const onClickOpenSFTP = useCallback(() => {
		const resource = server.find((v) => v.key === data.key);

		dispatch({
			type: CONNECTION_REQUEST,
			payload: {
				token: userData.access_token, // connection info
				host: resource.host,
				port: resource.port,
				user: identity.user,
				password: identity.password,
				name: resource.name, // create tab info
				key: resource.key,
				id: resource.id,
			},
		});
	}, [server, dispatch, userData, identity, data.key]);

	const onClickOpenSSH = useCallback(() => {
		const resource = server.find((v) => v.key === data.key);

		dispatch({
			type: SSH_SEND_CONNECTION_REQUEST,
			payload: {
				token: userData.access_token,
				...resource,
				user: identity.user,
				password: identity.password,
			},
		});
	}, [server, dispatch, userData, identity, data.key]);

	const onClickAddFolder = useCallback(() => {
		dispatch({
			type: ADD_FOLDER_ON_FAVORITES,
			payload: {name: t('newFolder'), key: 'favorites'},
		});
	}, [dispatch, t]);

	const handleOnClickEvents = useCallback(
		(v) => () => {
			switch (v) {
				case 'connect-ssh':
					onClickOpenSSH();
					break;
				case 'connect-sftp':
					onClickOpenSFTP();
					break;
				case 'delete-favorite':
					dispatch({
						type: DELETE_FAVORITE_SERVER,
						payload: data.key,
					});
					break;
				case 'add-folder':
					onClickAddFolder();
					break;
				default:
					return;
			}
		},
		[data.key, dispatch, onClickOpenSFTP, onClickOpenSSH, onClickAddFolder],
	);

	return (
		<ContextMenu
			id={data.key + '-favorites-context-menu'}
			animation={animation.slide}
		>
			{Object.entries(contextMenuList).map(([key, value]) => (
				<Item key={key} onClick={handleOnClickEvents(key)}>
					{value}
				</Item>
			))}
		</ContextMenu>
	);
};

FavoritesContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	identity: PropTypes.object.isRequired,
};

export default FavoritesContextMenu;
