import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {animation, Item, Menu} from 'react-contexify';
import ConfirmPopup from './ConfirmPopup/ConfirmPopup';
import {useDispatch, useSelector} from 'react-redux';
import {ssht_ws_request} from '../ws/ssht_ws_request';
import {GetMessage} from '../ws/ssht_ws_logic';
import {OPEN_TAB} from '../reducers/common';
import newSftp_ws from '../ws/sftp_ws';
import {SFTP_SAVE_LIST_MODE} from '../reducers/sftp';
import AddServerForm from './AddServerForm/AddServerForm';

const ServerContextMenu = ({data, indent, setOpenRename}) => {
	const [open, setOpen] = useState(false);
	const [openAddServerForm, setOpenAddServerForm] = useState(false);
	const [keyword, setKeyword] = useState('');
	const {clicked_server, server, me} = useSelector((state) => state.common);
	const dispatch = useDispatch();

	const MENU_ID = data.key + 'server';
	const serverData = server.find((item) => item.key === clicked_server);
	function handleItemClick({event}) {
		setKeyword(event.currentTarget.id);
		switch (event.currentTarget.id) {
			case 'Connect':
				openSSHT();
				break;
			case 'Open SFTP':
				openSFTP();
				break;
			case 'Rename':
				setOpenRename(true);
				break;
			case 'Delete':
				setOpen(true);
				break;
			case 'Properties':
				setOpenAddServerForm(true);
				break;
			default:
				return;
		}
	}

	const openSFTP = () => {
		const ws = new WebSocket(`ws://${serverData.host}:8081/ws/sftp`);
		ws.onopen = async () => {
			const {uuid} = await newSftp_ws({
				keyword: 'Connection',
				ws,
				token: me.token,
				data: serverData,
			});
			dispatch({
				type: OPEN_TAB,
				data: {
					id: serverData.id,
					type: 'SFTP',
					ws: ws,
					uuid: uuid,
				},
			});
			dispatch({
				type: SFTP_SAVE_LIST_MODE,
				data: {
					uuid,
					mode: 'list',
				},
			});
		};
	};

	const openSSHT = () => {
		const correspondedServer = server.find((i) => i.id === data.id);
		const ws = new WebSocket(
			'ws://' + correspondedServer.host + ':8081/ws/ssh',
		);

		ws.binaryType = 'arraybuffer';

		ws.onopen = () => {
			ssht_ws_request({
				keyword: 'SendConnect',
				ws: ws,
				data: {
					token: me.token,
					host: correspondedServer.host,
					user: correspondedServer.user,
					password: correspondedServer.password,
					port: correspondedServer.port,
				},
			});

			ws.onmessage = (evt) => {
				const message = GetMessage(evt);
				console.log(message);

				if (message.type === 'CONNECT')
					dispatch({
						type: OPEN_TAB,
						data: {
							id: data.id,
							type: 'SSHT',
							ws: ws,
							uuid: message.result,
						},
					});
				else console.log('V ServerNavBar onmessage: ', message);
			};
		};
	};

	return (
		<>
			<Menu
				id={MENU_ID}
				animation={animation.slide}
				style={{fontSize: '14px'}}
			>
				<Item onClick={handleItemClick} id='Connect'>
					Connect
				</Item>
				<Item onClick={handleItemClick} id='Open SFTP'>
					Open SFTP
				</Item>
				<Item onClick={handleItemClick} id='Rename'>
					Rename
				</Item>
				<Item onClick={handleItemClick} id='Delete'>
					Delete
				</Item>
				<Item onClick={handleItemClick} id='Properties'>
					Properties
				</Item>
			</Menu>
			<ConfirmPopup
				keyword={'delete_server'}
				open={open}
				setOpen={setOpen}
			/>
			<AddServerForm
				setOpen={setOpenAddServerForm}
				open={openAddServerForm}
				type='edit'
				id={data.id}
			/>
		</>
	);
};

ServerContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
	setOpenRename: PropTypes.func.isRequired,
};

export default ServerContextMenu;
