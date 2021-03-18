import React from 'react';
import {PropTypes} from 'prop-types';
import {Nav} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';

import {OPEN_TAB, SET_CLICKED_SERVER} from '../reducers/common';
import {useDoubleClick} from '../hooks/useDoubleClick';
import SSH from '../dist/ssh_pb';
import {FaServer} from 'react-icons/all';
import styled from 'styled-components';
import {HIGHLIGHT_COLOR} from '../styles/global';

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
				// on connecting, do nothing but log it to the console
				console.log('connected');

				const msgObj = new SSH.Message();
				msgObj.setType(SSH.Message.Types.REQUEST);

				const reqObj = new SSH.Request();
				reqObj.setType(SSH.Request.Types.CONNECT);

				const conObj = new SSH.ConnectRequest();
				conObj.setHost(correspondedServer.host);
				conObj.setUser(correspondedServer.user);
				conObj.setPassword(correspondedServer.password);
				conObj.setPort(correspondedServer.port);

				reqObj.setBody(conObj.serializeBinary());
				msgObj.setBody(reqObj.serializeBinary());

				ws.send(msgObj.serializeBinary());
			};

			ws.onmessage = (evt) => {
				const message = SSH.Message.deserializeBinary(evt.data);

				const response = SSH.Response.deserializeBinary(
					message.getBody(),
				);

				if (response.getType() === SSH.Response.Types.CONNECT) {
					const conObj = SSH.ConnectResponse.deserializeBinary(
						response.getBody(),
					);

					if (conObj.getStatus() === 'connected') {
						dispatch({
							type: OPEN_TAB,
							data: {
								id: id,
								type: 'SSHT',
								ws: ws,
								uuid: conObj.getUuid(),
							},
						});
					}
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
						<span>
							<FaServerIcon />
						</span>
						<span style={{verticalAlign: 'middle'}}>
							{data.name}
						</span>
					</Server_NavItem>
				))}
		</Nav>
	);
};

ServerNavBar.propTypes = {
	search: PropTypes.string.isRequired,
};

export default ServerNavBar;
