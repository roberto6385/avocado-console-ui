import React, {useCallback} from 'react';
import * as PropTypes from 'prop-types';
import {animation, Item, Menu} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';

import {connectionAction} from '../../reducers/sftp';
import {
	OPEN_ADD_SERVER_FORM_POPUP,
	OPEN_CONFIRM_POPUP,
} from '../../reducers/popup';
import {SSHT_SEND_CONNECTION_REQUEST} from '../../reducers/ssht';

const ServerContextMenuMessage = {
	connect: 'Connect',
	open_sftp: 'Open SFTP',
	rename: 'Rename',
	delete: 'Delete',
	properties: 'Properties',
};

const ServerContextMenu = ({data, setOpenRename}) => {
	const dispatch = useDispatch();
	const {server} = useSelector((state) => state.common);
	const {userTicket} = useSelector((state) => state.userTicket);
	const MENU_ID = data.key + 'server';

	const handleItemClick = useCallback(
		(e) => () => {
			switch (e) {
				case 'connect':
					openSSHT();
					break;
				case 'open_sftp':
					openSFTP();
					break;
				case 'rename':
					setOpenRename(true);
					break;
				case 'delete':
					dispatch({
						type: OPEN_CONFIRM_POPUP,
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
		[],
	);

	const openSFTP = useCallback(() => {
		const correspondedServer = server.find((i) => i.key === data.key);
		dispatch(
			connectionAction({
				...correspondedServer,
				token: userTicket,
			}),
		);
	}, [server, userTicket, data]);

	const openSSHT = useCallback(() => {
		const correspondedServer = server.find((i) => i.key === data.key);
		dispatch({
			type: SSHT_SEND_CONNECTION_REQUEST,
			data: {
				token: userTicket,
				...correspondedServer,
			},
		});
	}, [server, data]);

	return (
		<Menu
			id={MENU_ID}
			animation={animation.slide}
			style={{fontSize: '14px'}}
		>
			{Object.keys(ServerContextMenuMessage).map((v) => (
				<Item onClick={handleItemClick(v)} key={v}>
					{ServerContextMenuMessage[v]}
				</Item>
			))}
		</Menu>
	);
};

ServerContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	setOpenRename: PropTypes.func.isRequired,
};

export default ServerContextMenu;
