import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as PropTypes from 'prop-types';

import {FaServerIcon, ServerNavItem} from '../../styles/common';
import {useDoubleClick} from '../../hooks/useDoubleClick';
import {
	CHANGE_SERVER_FOLDER_NAME,
	OPEN_TAB,
	SET_CLICKED_SERVER,
	SORT_SERVER_AND_FOLDER,
	SSHT_SEND_CONNECTION_REQUEST,
} from '../../reducers/common';
import {useDispatch, useSelector} from 'react-redux';
import {HIGHLIGHT_COLOR} from '../../styles/global';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {useContextMenu} from 'react-contexify';
import ServerContextMenu from '../ContextMenu/ServerContextMenu';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import {Terminal} from 'xterm';

const RenameForm = styled.form`
	display: inline-block;
`;

const RenameInput = styled.input`
	display: inline-block;
	height: 24px;
	border: none;
	outline: none;
	border-bottom: 1px solid black;
`;

const Server = ({data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server, server} = useSelector((state) => state.common);
	const {userTicket} = useSelector((state) => state.userTicket);
	const [openRename, setOpenRename] = useState(false);
	const renameRef = useRef(null);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');
	const {font} = useSelector((state) => state.ssht);

	const onHybridClick = useDoubleClick(
		() => {
			const correspondedServer = server.find((i) => i.id === data.id);

			dispatch({
				type: SSHT_SEND_CONNECTION_REQUEST,
				data: {
					token: userTicket,
					host: correspondedServer.host,
					user: correspondedServer.user,
					password: correspondedServer.password,
					port: correspondedServer.port,
				},
			});
			// const ws = new WebSocket(
			// 	'ws://' + correspondedServer.host + ':8081/ws/ssh',
			// );
			//
			// ws.binaryType = 'arraybuffer';
			//
			// ws.onopen = () => {
			// 	ssht_ws_request({
			// 		keyword: 'SendConnect',
			// 		ws: ws,
			// 		data: {
			// 			token: userTicket.access_token,
			// 			host: correspondedServer.host,
			// 			user: correspondedServer.user,
			// 			password: correspondedServer.password,
			// 			port: correspondedServer.port,
			// 		},
			// 	});
			//
			// 	ws.onmessage = (evt) => {
			// 		const message = GetMessage(evt);
			//
			// 		if (message.type === 'CONNECT')
			// 			dispatch({
			// 				type: OPEN_TAB,
			// 				data: {
			// 					id: data.id,
			// 					type: 'SSHT',
			// 					ws: ws,
			// 					uuid: message.result,
			// 					terminal: new Terminal({
			// 						cursorBlink: true,
			// 						minimumContrastRatio: 7,
			// 						fontFamily: font,
			// 						theme: {
			// 							selection: '#FCFD08',
			// 						},
			// 					}),
			// 				},
			// 			});
			// 		else console.log('V ServerNavBar onmessage: ', message);
			// 	};
			// };
		},
		() => {
			if (clicked_server === data.key)
				dispatch({type: SET_CLICKED_SERVER, data: null});
			else dispatch({type: SET_CLICKED_SERVER, data: data.key});
		},
	);

	const {show} = useContextMenu({
		id: data.key + 'server',
	});

	const contextMenuOpen = useCallback(
		(e) => {
			e.preventDefault();

			dispatch({type: SET_CLICKED_SERVER, data: data.key});
			show(e);
		},
		[data],
	);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();

			dispatch({
				type: CHANGE_SERVER_FOLDER_NAME,
				data: renameValue,
			});
			setOpenRename(false);
		},
		[renameValue],
	);

	const EscapeKey = useCallback((e) => {
		if (e.keyCode === 27) setOpenRename(false);
	}, []);

	const prevPutItem = useCallback(() => {
		dispatch({type: SET_CLICKED_SERVER, data: data.key});
	}, [data]);

	const nextPutItem = useCallback(
		(e) => {
			e.stopPropagation();

			data.type === 'folder' &&
				dispatch({type: SORT_SERVER_AND_FOLDER, data: {next: data}});
		},
		[data],
	);

	const onBlurOpenRename = useCallback(() => {
		setOpenRename(false);
	}, []);

	useEffect(() => {
		setRenameValue(data.name);
		if (renameRef.current) {
			renameRef.current.focus();
		}
	}, [data, renameRef]);

	return (
		<>
			<ServerNavItem
				onClick={onHybridClick}
				draggable='true'
				onDragStart={prevPutItem}
				onDrop={nextPutItem}
				onContextMenu={contextMenuOpen}
				back={clicked_server === data.key ? HIGHLIGHT_COLOR : 'white'}
				left={(indent * 15).toString() + 'px'}
			>
				<FaServerIcon />
				{openRename ? (
					<RenameForm
						onSubmit={handleSubmit}
						onBlur={onBlurOpenRename}
					>
						<RenameInput
							ref={renameRef}
							type='text'
							value={renameValue}
							onChange={onChangeRenameValue}
							onKeyDown={EscapeKey}
						/>
					</RenameForm>
				) : (
					data.name
				)}
			</ServerNavItem>
			<ServerContextMenu data={data} setOpenRename={setOpenRename} />
		</>
	);
};

Server.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Server;
