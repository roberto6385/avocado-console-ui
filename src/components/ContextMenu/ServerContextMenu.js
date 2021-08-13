import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {CONNECTION_REQUEST} from '../../reducers/sftp';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {SSH_SEND_CONNECTION_REQUEST} from '../../reducers/ssh';
import {ContextMenu} from '../../styles/components/contextMenu';
import {AUTH} from '../../reducers/api/auth';

const ServerContextMenu = ({identity, data}) => {
	const {t} = useTranslation('contextMenu');
	const dispatch = useDispatch();
	const {server} = useSelector((state) => state.common, shallowEqual);
	const {userData} = useSelector((state) => state[AUTH], shallowEqual);
	const searchedServer = useMemo(
		() => server.find((i) => i.key === data.key),
		[server, data],
	);

	const SSHContextMenuList = {
		connect: t('connectSsh'),
		open_sftp: t('connectSftp'),
		properties: t('properties'),
	};

	const SFTPContextMenuList = {
		open_sftp: t('connectSftp'),
		properties: t('properties'),
	};

	const onClickOpenSFTP = useCallback(() => {
		const searchedServer = server.find((i) => i.key === data.key);
		dispatch({
			type: CONNECTION_REQUEST,
			payload: {
				token: userData.access_token, // connection info
				host: searchedServer.host,
				port: searchedServer.port,
				user: identity.user,
				password: identity.password,

				name: searchedServer.name, // create tab info
				key: searchedServer.key,
				id: searchedServer.id,
			},
		});
	}, [
		server,
		dispatch,
		userData,
		identity.user,
		identity.password,
		data.key,
	]);

	const onClickOpenSSH = useCallback(() => {
		const searchedServer = server.find((i) => i.key === data.key);

		dispatch({
			type: SSH_SEND_CONNECTION_REQUEST,
			payload: {
				token: userData.access_token,
				...searchedServer,
				user: identity.user,
				password: identity.password,
			},
		});
	}, [
		server,
		dispatch,
		userData,
		identity.user,
		identity.password,
		data.key,
	]);

	const handleOnClickEvents = useCallback(
		(v) => () => {
			switch (v) {
				case 'connect':
					onClickOpenSSH();
					break;
				case 'open_sftp':
					onClickOpenSFTP();
					break;
				case 'rename':
					break;
				case 'delete':
					dispatch(
						dialogBoxAction.openAlert({
							key: 'delete_server_folder',
						}),
					);
					break;
				case 'properties':
					dispatch(
						dialogBoxAction.openForm({id: data.id, key: 'server'}),
					);
					break;
				default:
					return;
			}
		},
		[data.id, dispatch, onClickOpenSFTP, onClickOpenSSH],
	);

	return (
		<ContextMenu id={data.key + 'server'} animation={animation.slide}>
			{searchedServer?.protocol === 'SSH2'
				? Object.keys(SSHContextMenuList).map((v) => (
						<Item onClick={handleOnClickEvents(v)} key={v}>
							{SSHContextMenuList[v]}
						</Item>
				  ))
				: Object.keys(SFTPContextMenuList).map((v) => (
						<Item onClick={handleOnClickEvents(v)} key={v}>
							{SFTPContextMenuList[v]}
						</Item>
				  ))}
		</ContextMenu>
	);
};

ServerContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	identity: PropTypes.object.isRequired,
};

export default ServerContextMenu;
