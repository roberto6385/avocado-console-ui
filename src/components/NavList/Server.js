import React from 'react';
import * as PropTypes from 'prop-types';

import {FaServerIcon, ServerNavItem} from '../../styles/common';
import {useDoubleClick} from '../../hooks/useDoubleClick';
import {OPEN_TAB, SET_CLICKED_SERVER} from '../../reducers/common';
import {useDispatch, useSelector} from 'react-redux';
import {HIGHLIGHT_COLOR} from '../../styles/global';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {contextMenu, useContextMenu} from 'react-contexify';
import {CustomTable} from '../../styles/sftp';
import FileListContextMenu from '../SFTP/FileListContextMenu';
import ServerContextMenu from '../ServerContextMenu';

const Server = ({data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server, server, me} = useSelector((state) => state.common);

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

	return (
		<>
			<ServerNavItem
				onClick={onHybridClick}
				onContextMenu={(e) => contextMenuOpen(e, data, indent)}
				back={clicked_server === data.key ? HIGHLIGHT_COLOR : 'white'}
				left={(indent * 15).toString() + 'px'}
			>
				<FaServerIcon />
				{data.name}
			</ServerNavItem>
			<ServerContextMenu data={data} indent={indent} />
		</>
	);
};

Server.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Server;
