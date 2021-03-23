import React from 'react';
import {PropTypes} from 'prop-types';
import {Nav} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {FaServer} from 'react-icons/all';
import styled from 'styled-components';

import {OPEN_TAB, SET_CLICKED_SERVER} from '../reducers/common';
import {useDoubleClick} from '../hooks/useDoubleClick';
import SSH from '../dist/ssh_pb';
import {HIGHLIGHT_COLOR} from '../styles/global';
import {Connect, GetMessage} from '../dist/SSHTWs';

const FaServerIcon = styled(FaServer)`
	vertical-align: middle;
	margin-right: 15px;
	font-size: 25px;
`;

const Server_NavItem = styled(Nav.Item)`
	padding: 15px;
	background-color: ${(props) => props.back};
`;

const ServerNavBar = ({search}) => {
	const dispatch = useDispatch();
	const {server, clicked_server} = useSelector((state) => state.common);

	// first argument is double-click event, second one is on-click event
	const onHybridClick = useDoubleClick(
		(id) => {
			const correspondedServer = server.find((i) => i.id === id);

			const ws = new WebSocket(
				'ws://' + correspondedServer.host + ':8080/ws/ssh/protobuf',
			);

			ws.binaryType = 'arraybuffer';

			ws.onopen = () => {
				ws.send(
					Connect(
						correspondedServer.host,
						correspondedServer.user,
						correspondedServer.password,
						correspondedServer.port,
					),
				);
			};

			ws.onmessage = (e) => {
				const result = GetMessage(e);
				switch (result.type) {
					case 'connected':
						dispatch({
							type: OPEN_TAB,
							data: {
								id: id,
								type: 'SSHT',
								ws: ws,
								uuid: result.uuid,
							},
						});
						break;
					default:
						console.log('도달하면 안되는 공간1');
						break;
				}
			};
		},
		(id) => {
			if (clicked_server === id)
				dispatch({type: SET_CLICKED_SERVER, data: null});
			else dispatch({type: SET_CLICKED_SERVER, data: id});
		},
	);

	return (
		<Nav className='flex-column'>
			{server
				.filter((v) => v.name.includes(search))
				.map((data) => (
					<Server_NavItem
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
					</Server_NavItem>
				))}
		</Nav>
	);
};

ServerNavBar.propTypes = {
	search: PropTypes.string.isRequired,
};

export default ServerNavBar;
