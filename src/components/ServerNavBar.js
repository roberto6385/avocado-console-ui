import React from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {LOGIN, OPEN_TAB, SET_CLICKED_SERVER} from '../reducers/common';
import {useDoubleClick} from '../hooks/useDoubleClick';
import {HIGHLIGHT_COLOR} from '../styles/global';
import {Connect, GetMessage} from '../ws/ssh_ws';
import {
	FaServerIcon,
	ServerNavBarContainer,
	ServerNavItem,
} from '../styles/common';
import ssht_ws, {sendConnect} from '../ws/ssht_ws';
import auth_ws from '../ws/auth_ws';

const ServerNavBar = ({search}) => {
	const dispatch = useDispatch();
	const {server, clicked_server, me} = useSelector((state) => state.common);

	// first argument is double-click event, second one is on-click event
	const onHybridClick = useDoubleClick(
		(id) => {
			const correspondedServer = server.find((i) => i.id === id);

			const ws = new WebSocket(
				'ws://' + correspondedServer.host + ':8081/ws/ssh',
			);

			ws.binaryType = 'arraybuffer';

			ws.onopen = () => {
				ssht_ws({
					keyword: 'SendConnect',
					ws: ws,
					data: {
						token: me.token,
						host: correspondedServer.host,
						user: correspondedServer.user,
						password: correspondedServer.password,
						port: correspondedServer.port,
					},
				}).then((r) => {
					if (r.type === 'CONNECT')
						dispatch({
							type: OPEN_TAB,
							data: {
								id: id,
								type: 'SSHT',
								ws: ws,
								uuid: r.result,
							},
						});
				});
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
