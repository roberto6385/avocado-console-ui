import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {connectionAction, READY_STATE} from '../../reducers/sftp';
import {
	OPEN_ADD_SERVER_FORM_POPUP,
	OPEN_WARNING_ALERT_POPUP,
} from '../../reducers/popup';
import {SSH_SEND_CONNECTION_REQUEST} from '../../reducers/ssh';
import {ContextMenu} from '../../styles/default';
import {BOOKMARKING} from '../../reducers/common';

const FavoritesContextMenu = ({correspondedIdentity, data, setOpenRename}) => {
	const {t} = useTranslation('contextMenu');
	const dispatch = useDispatch();
	const {server, theme} = useSelector((state) => state.common, shallowEqual);
	const userTicket = useSelector((state) => state.userTicket.userTicket);
	const correspondedServer = useMemo(
		() => server.find((i) => i.key === data.key),
		[server, data],
	);

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
				dispatch: dispatch,
			}),
		);
	}, [
		server,
		dispatch,
		userTicket,
		correspondedIdentity.user,
		correspondedIdentity.password,
		data.key,
	]);

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
	}, [
		server,
		dispatch,
		userTicket,
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
				case 'delete_bookmark':
					dispatch({type: BOOKMARKING, data: data});
					break;
				case 'new_folder':
					break;
				default:
					return;
			}
		},
		[data, dispatch, openSFTP, openSSH, setOpenRename],
	);

	return (
		<ContextMenu
			id={data.key + 'server'}
			animation={animation.slide}
			theme_value={theme}
		>
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
	setOpenRename: PropTypes.func.isRequired,
};

export default FavoritesContextMenu;
