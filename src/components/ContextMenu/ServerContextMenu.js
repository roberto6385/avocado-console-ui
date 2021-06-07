import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item, Menu} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {connectionAction} from '../../reducers/sftp';
import {
	OPEN_ADD_SERVER_FORM_POPUP,
	OPEN_WARNING_ALERT_POPUP,
} from '../../reducers/popup';
import {SSH_SEND_CONNECTION_REQUEST} from '../../reducers/ssh';

const ServerContextMenu = ({correspondedIdentity, data, setOpenRename}) => {
	const {t} = useTranslation('contextMenu');

	const dispatch = useDispatch();
	const {server} = useSelector((state) => state.common);
	const {userTicket} = useSelector((state) => state.userTicket);
	const MENU_ID = data.key + 'server';
	const correspondedServer = server.find((i) => i.key === data.key);

	const Ssh2ServerContextMenuMessage = {
		connect: t('connectSsh'),
		open_sftp: t('connectSftp'),
		// rename: 'Rename',
		// delete: 'Delete',
		properties: t('properties'),
	};

	const SftpServerContextMenuMessage = {
		open_sftp: t('connectSftp'),
		// rename: 'Rename',
		// delete: 'Delete',
		properties: t('properties'),
	};

	const openSFTP = useCallback(() => {
		const correspondedServer = server.find((i) => i.key === data.key);
		console.log(correspondedIdentity);

		dispatch(
			connectionAction({
				token: userTicket,
				...correspondedServer,
				user: correspondedIdentity.user,
				password: correspondedIdentity.password,
			}),
		);
	}, [server, userTicket, data, correspondedIdentity]);

	const openSSH = useCallback(() => {
		const correspondedServer = server.find((i) => i.key === data.key);

		console.log(correspondedIdentity);
		dispatch({
			type: SSH_SEND_CONNECTION_REQUEST,
			data: {
				token: userTicket,
				...correspondedServer,
				user: correspondedIdentity.user,
				password: correspondedIdentity.password,
			},
		});
	}, [server, data, userTicket, correspondedIdentity]);

	const handleItemClick = useCallback(
		(v) => () => {
			console.log(v);
			switch (v) {
				case 'connect':
					openSSH();
					break;
				case 'open_sftp':
					openSFTP();
					break;
				case 'rename':
					setOpenRename(true);
					break;
				case 'delete':
					dispatch({
						type: OPEN_WARNING_ALERT_POPUP,
						data: {key: 'delete_server_folder'},
					});
					break;
				case 'properties':
					dispatch({
						type: OPEN_ADD_SERVER_FORM_POPUP,
						data: {type: 'edit', id: data.id},
					});
					break;
				default:
					return;
			}
		},
		[correspondedIdentity],
	);

	return (
		<Menu
			id={MENU_ID}
			animation={animation.slide}
			style={{fontSize: '14px'}}
		>
			{correspondedServer?.protocol === 'SSH2'
				? Object.keys(Ssh2ServerContextMenuMessage).map((v) => (
						<Item onClick={handleItemClick(v)} key={v}>
							{Ssh2ServerContextMenuMessage[v]}
						</Item>
				  ))
				: Object.keys(SftpServerContextMenuMessage).map((v) => (
						<Item onClick={handleItemClick(v)} key={v}>
							{SftpServerContextMenuMessage[v]}
						</Item>
				  ))}
		</Menu>
	);
};

ServerContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	correspondedIdentity: PropTypes.object.isRequired,
	setOpenRename: PropTypes.func.isRequired,
};

export default ServerContextMenu;
