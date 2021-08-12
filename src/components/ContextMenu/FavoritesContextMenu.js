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

const isValidFolderName = (folderArray, name) => {
	let pass = true;

	for (let i of folderArray) {
		if (i.type === 'folder') {
			if (i.name === name) return false;
			else if (i.contain.length > 0) {
				pass = pass && isValidFolderName(i.contain, name);
			}
		}
	}
	return pass;
};

const FavoritesContextMenu = ({identity, data}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('contextMenu');
	const {server, favorites} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);

	const menu = {
		connect: t('connectSsh'),
		open_sftp: t('connectSftp'),
		delete_bookmark: t('deleteBookmark'),
		new_folder: t('newFolder'),
	};

	const openSFTP = useCallback(() => {
		const correspondedServer = server.find((i) => i.key === data.key);
		dispatch({
			type: CONNECTION_REQUEST,
			payload: {
				token: userTicket.access_token, // connection info
				host: correspondedServer.host,
				port: correspondedServer.port,
				user: identity.user,
				password: identity.password,

				name: correspondedServer.name, // create tab info
				key: correspondedServer.key,
				id: correspondedServer.id,
			},
		});
	}, [server, dispatch, userTicket, identity, data.key]);

	const openSSH = useCallback(() => {
		const correspondedServer = server.find((i) => i.key === data.key);

		dispatch({
			type: SSH_SEND_CONNECTION_REQUEST,
			payload: {
				token: userTicket.access_token,
				...correspondedServer,
				user: identity.user,
				password: identity.password,
			},
		});
	}, [server, dispatch, userTicket, identity, data.key]);

	const newFolder = useCallback(() => {
		let folderName = t('newFolder');
		let i = 0;
		while (!isValidFolderName(favorites, folderName)) {
			folderName = `${t('newFolder')} ${i}`;
			i++;
		}
		dispatch({
			type: ADD_FOLDER_ON_FAVORITES,
			payload: {name: folderName, key: 'favorites'},
		});
	}, [dispatch, favorites, t]);

	const handleItemClick = useCallback(
		(v) => () => {
			switch (v) {
				case 'connect':
					openSSH();
					break;
				case 'open_sftp':
					openSFTP();
					break;
				case 'delete_bookmark':
					dispatch({
						type: DELETE_FAVORITE_SERVER,
						payload: data.key,
					});
					break;
				case 'new_folder':
					newFolder();
					break;
				default:
					return;
			}
		},
		[data, dispatch, openSFTP, openSSH],
	);

	return (
		<ContextMenu id={data.key + 'server'} animation={animation.slide}>
			{Object.keys(menu).map((v) => (
				<Item onClick={handleItemClick(v)} key={v}>
					{menu[v]}
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
