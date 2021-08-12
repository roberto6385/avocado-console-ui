import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {CONNECTION_REQUEST} from '../../reducers/sftp';
import {
	OPEN_SERVER_DIALOG_BOX,
	OPEN_DELETE_DIALOG_BOX,
} from '../../reducers/dialogBoxs';
import {SSH_SEND_CONNECTION_REQUEST} from '../../reducers/ssh';
import {ContextMenu} from '../../styles/components/contextMenu';
import {AUTH} from '../../reducers/api/auth';

const ServerContextMenu = ({correspondedIdentity, data}) => {
	const {t} = useTranslation('contextMenu');
	const dispatch = useDispatch();
	const {server} = useSelector((state) => state.common, shallowEqual);
	const {userData} = useSelector((state) => state[AUTH], shallowEqual);
	const correspondedServer = useMemo(
		() => server.find((i) => i.key === data.key),
		[server, data],
	);

	const Ssh2ServerContextMenuMessage = {
		connect: t('connectSsh'),
		open_sftp: t('connectSftp'),
		properties: t('properties'),
	};

	const SftpServerContextMenuMessage = {
		open_sftp: t('connectSftp'),
		properties: t('properties'),
	};

	const openSFTP = useCallback(() => {
		const correspondedServer = server.find((i) => i.key === data.key);
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
	}, [
		server,
		dispatch,
		userData,
		correspondedIdentity.user,
		correspondedIdentity.password,
		data.key,
	]);

	const openSSH = useCallback(() => {
		const correspondedServer = server.find((i) => i.key === data.key);

		dispatch({
			type: SSH_SEND_CONNECTION_REQUEST,
			payload: {
				token: userData.access_token,
				...correspondedServer,
				user: correspondedIdentity.user,
				password: correspondedIdentity.password,
			},
		});
	}, [
		server,
		dispatch,
		userData,
		correspondedIdentity.user,
		correspondedIdentity.password,
		data.key,
	]);

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
					break;
				case 'delete':
					dispatch({
						type: OPEN_DELETE_DIALOG_BOX,
						payload: {key: 'delete_server_folder'},
					});
					break;
				case 'properties':
					dispatch({
						type: OPEN_SERVER_DIALOG_BOX,
						payload: {id: data.id},
					});
					break;
				default:
					return;
			}
		},
		[data.id, dispatch, openSFTP, openSSH],
	);

	return (
		<ContextMenu id={data.key + 'server'} animation={animation.slide}>
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
};

export default ServerContextMenu;
