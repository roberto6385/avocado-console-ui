import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {connectionAction} from '../../reducers/sftp/sftp';
import {
	OPEN_ADD_SERVER_FORM_POPUP,
	OPEN_WARNING_ALERT_POPUP,
} from '../../reducers/popup';
import {SSH_SEND_CONNECTION_REQUEST} from '../../reducers/ssh';
import {ContextMenu} from '../../styles/default';

const ServerContextMenu = ({correspondedIdentity, data, setOpenRename}) => {
	const {t} = useTranslation('contextMenu');
	const dispatch = useDispatch();
	const {server, theme} = useSelector((state) => state.common, shallowEqual);
	const userTicket = useSelector((state) => state.userTicket.userTicket);
	const correspondedServer = useMemo(
		() => server.find((i) => i.key === data.key),
		[server, data],
	);

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
	}, [server, userTicket, data, correspondedIdentity]);

	const openSSH = useCallback(() => {
		const correspondedServer = server.find((i) => i.key === data.key);

		dispatch({
			type: SSH_SEND_CONNECTION_REQUEST,
			data: {
				token: userTicket.access_token,
				...correspondedServer,
				user: correspondedIdentity.user,
				password: correspondedIdentity.password,
			},
		});
	}, [server, data, userTicket, correspondedIdentity]);

	const handleItemClick = useCallback(
		(v) => () => {
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
		<ContextMenu
			id={data.key + 'server'}
			animation={animation.slide}
			theme_value={theme}
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
		</ContextMenu>
	);
};

ServerContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	correspondedIdentity: PropTypes.object.isRequired,
	setOpenRename: PropTypes.func.isRequired,
};

export default ServerContextMenu;
