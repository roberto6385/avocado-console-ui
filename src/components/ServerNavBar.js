import React from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {OPEN_TAB, SET_CLICKED_SERVER} from '../reducers/common';
import {useDoubleClickParam} from '../hooks/useDoubleClickParam';
import {HIGHLIGHT_COLOR} from '../styles/global';
import {GetMessage} from '../ws/ssht_ws_logic';
import {
	FaServerIcon,
	ServerNavBarContainer,
	ServerNavItem,
} from '../styles/common';
import {ssht_ws_request} from '../ws/ssht_ws_request';

const ServerNavBar = ({search}) => {
	const dispatch = useDispatch();
	const {server, clicked_server} = useSelector((state) => state.common);
	const {me} = useSelector((state) => state.user);

	// first argument is double-click event, second one is on-click event
	const onHybridClick = useDoubleClickParam(
		(id) => {
			const correspondedServer = server.find((i) => i.id === id);

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
								id: id,
								type: 'SSHT',
								ws: ws,
								uuid: message.result,
							},
						});
					else console.log('V ServerNavBar onmessage: ', message);
				};
			};
		},
		(id) => {
			if (clicked_server === id)
				dispatch({type: SET_CLICKED_SERVER, data: null});
			else dispatch({type: SET_CLICKED_SERVER, data: id});
		},
	);

	return (
		<ServerNavBarContainer className={'flex-column'}>
			{server
				.filter((v) => v.name.includes(search))
				.map((data) => (
					<ServerNavItem
						key={data.id}
						id={`server_${data.id}`}
						onClick={onHybridClick(data.id)}
						back={
							clicked_server === data.id
								? HIGHLIGHT_COLOR
								: 'white'
						}
					>
						<FaServerIcon />
						{data.name}
					</ServerNavItem>
				))}
		</ServerNavBarContainer>
	);
};

ServerNavBar.propTypes = {
	search: PropTypes.string.isRequired,
};

export default ServerNavBar;
