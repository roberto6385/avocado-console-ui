import React, {useEffect, useRef, useState} from 'react';
import * as PropTypes from 'prop-types';

import {FaServerIcon, ServerNavItem} from '../../styles/common';
import {useDoubleClick} from '../../hooks/useDoubleClick';
import {
	CHANGE_SERVER_FOLDER_NAME,
	OPEN_TAB,
	SET_CLICKED_SERVER,
	SORT_SERVER_AND_FOLDER,
} from '../../reducers/common';
import {useDispatch, useSelector} from 'react-redux';
import {HIGHLIGHT_COLOR} from '../../styles/global';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {useContextMenu} from 'react-contexify';
import ServerContextMenu from '../ServerContextMenu';
import styled from 'styled-components';

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
	const {me} = useSelector((state) => state.user);
	const [openRename, setOpenRename] = useState(false);
	const renameRef = useRef(null);
	const [renameValue, setRenameValue] = useState('');

	const onHybridClick = useDoubleClick(
		() => {
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

	function displayMenu(e) {
		show(e);
	}

	const contextMenuOpen = (e, data, indent) => {
		e.preventDefault();
		dispatch({type: SET_CLICKED_SERVER, data: data.key});
		displayMenu(e);
		console.log(data, indent);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch({
			type: CHANGE_SERVER_FOLDER_NAME,
			data: renameValue,
		});
		setOpenRename(false);
	};

	const EscapeKey = (e) => {
		if (e.keyCode === 27) {
			setOpenRename(false);
		}
	};

	const prevPutItem = (data) => {
		dispatch({type: SET_CLICKED_SERVER, data: data.key});
	};

	const nextPutItem = (e, item) => {
		e.stopPropagation();
		console.log(item);
		item.type === 'folder' &&
			dispatch({type: SORT_SERVER_AND_FOLDER, data: {next: item}});
	};

	useEffect(() => {
		setRenameValue(data.name);
		if (renameRef.current) {
			renameRef.current.focus();
		}
	}, [openRename]);

	return (
		<>
			<ServerNavItem
				onClick={onHybridClick}
				draggable='true'
				onDragStart={() => prevPutItem(data)}
				onDrop={(e) => nextPutItem(e, data)}
				onContextMenu={(e) => contextMenuOpen(e, data, indent)}
				back={clicked_server === data.key ? HIGHLIGHT_COLOR : 'white'}
				left={(indent * 15).toString() + 'px'}
			>
				<FaServerIcon />
				{openRename ? (
					<RenameForm
						onSubmit={handleSubmit}
						onBlur={() => setOpenRename(false)}
					>
						<RenameInput
							ref={renameRef}
							type='text'
							value={renameValue}
							onChange={(e) => setRenameValue(e.target.value)}
							onKeyDown={EscapeKey}
						/>
					</RenameForm>
				) : (
					data.name
				)}
			</ServerNavItem>
			<ServerContextMenu
				data={data}
				indent={indent}
				setOpenRename={setOpenRename}
			/>
		</>
	);
};

Server.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Server;
