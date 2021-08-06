import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {connectionAction} from '../../reducers/sftp';
import {SSH_SEND_CONNECTION_REQUEST} from '../../reducers/ssh';
import {
	ADD_FAVORITES_FOLDER,
	BOOKMARKING,
	LOCAL_SAVE_FAVORITES,
} from '../../reducers/common';
import {ContextMenu} from '../../styles/components/contextMenu';

const FavoritesContextMenu = ({correspondedIdentity, data}) => {
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
		dispatch(
			connectionAction({
				token: userTicket.access_token, // connection info
				host: correspondedServer.host,
				port: correspondedServer.port,
				user: correspondedIdentity.user,
				password: correspondedIdentity.password,

				name: correspondedServer.name, // create tab info
				key: correspondedServer.key,
				id: correspondedServer.id,
			}),
		);
	}, [server, dispatch, userTicket, correspondedIdentity, data.key]);

	const openSSH = useCallback(() => {
		const correspondedServer = server.find((i) => i.key === data.key);

		dispatch({
			type: SSH_SEND_CONNECTION_REQUEST,
			payload: {
				token: userTicket.access_token,
				...correspondedServer,
				user: correspondedIdentity.user,
				password: correspondedIdentity.password,
			},
		});
	}, [server, dispatch, userTicket, correspondedIdentity, data.key]);

	const isValidFolderName = useCallback((folderArray, name) => {
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
	}, []);

	const newFolder = useCallback(() => {
		let folderName = t('newFolder');
		let i = 0;
		while (!isValidFolderName(favorites, folderName)) {
			folderName = `${t('newFolder')} ${i}`;
			i++;
		}
		dispatch({
			type: ADD_FAVORITES_FOLDER,
			payload: {name: folderName, key: 'favorites'},
		});
	}, [dispatch, favorites, isValidFolderName, t]);

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
					dispatch({type: BOOKMARKING, payload: data, there: true});
					dispatch({type: LOCAL_SAVE_FAVORITES});
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
	correspondedIdentity: PropTypes.object.isRequired,
};

export default FavoritesContextMenu;
