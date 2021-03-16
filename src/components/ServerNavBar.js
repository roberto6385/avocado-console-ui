import React from 'react';
import {PropTypes} from 'prop-types';
import {Nav} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';

import {OPEN_TAB, SET_CLICKED_SERVER} from '../reducers/common';
import {useDoubleClick} from '../hooks/useDoubleClick';
import SSH from '../dist/ssh_pb';
import {FaServer} from 'react-icons/all';

const ServerNavBar = ({search}) => {
	const dispatch = useDispatch();
	const {server, clicked_server} = useSelector((state) => state.common);

	// first argument is double-click event, second one is on-click event
	const onHybridClick = useDoubleClick(
		(id) => {
			// const correspondedServer = server.find((i) => i.id === id);
			//
			// const ws = new WebSocket(
			// 	'ws://' + correspondedServer.host + ':8080/ws/ssh/protobuf',
			// );
			//
			// ws.binaryType = 'arraybuffer';
			//
			// ws.onopen = () => {
			// 	// on connecting, do nothing but log it to the console
			// 	console.log('connected');
			//
			// 	const msgObj = new SSH.Message();
			// 	msgObj.setType(SSH.Message.Types.REQUEST);
			//
			// 	const reqObj = new SSH.Request();
			// 	reqObj.setType(SSH.Request.Types.CONNECT);
			//
			// 	const conObj = new SSH.ConnectRequest();
			// 	conObj.setHost(correspondedServer.host);
			// 	conObj.setUser(correspondedServer.user);
			// 	conObj.setPassword(correspondedServer.password);
			// 	conObj.setPort(correspondedServer.port);
			//
			// 	reqObj.setBody(conObj.serializeBinary());
			// 	msgObj.setBody(reqObj.serializeBinary());
			//
			// 	console.log('proto buffer', msgObj);
			// 	console.log('proto buffer binary', msgObj.serializeBinary());
			//
			// 	ws.send(msgObj.serializeBinary());
			// };
			//
			// ws.onmessage = (evt) => {
			// 	console.log('on data, ', evt.data);
			// 	const message = SSH.Message.deserializeBinary(evt.data);
			//
			// 	const response = SSH.Response.deserializeBinary(
			// 		message.getBody(),
			// 	);
			//
			// 	if (response.getType() === SSH.Response.Types.CONNECT) {
			// 		const conObj = SSH.ConnectResponse.deserializeBinary(
			// 			response.getBody(),
			// 		);
			//
			// 		if (conObj.getStatus() === 'connected') {
			// 			dispatch({
			// 				type: OPEN_TAB,
			// 				data: {
			// 					id: id,
			// 					type: 'SSHT',
			// 					ws: ws,
			// 					uuid: conObj.getUuid(),
			// 				},
			// 			});
			dispatch({
				type: OPEN_TAB,
				data: {
					id: id,
					type: 'SSHT',
					ws: new Object(null),
					uuid: '12345456',
				},
			});
			// 		}
			// 	}
			// };
			//
			// ws.onclose = () => {
			// 	console.log('disconnected');
			// };
		},
		(id) => {
			if (clicked_server === id)
				dispatch({type: SET_CLICKED_SERVER, data: null});
			else dispatch({type: SET_CLICKED_SERVER, data: id});
		},
	);

	return (
		<Nav className='sidebar, flex-column'>
			{server
				.filter((v) => v.name.includes(search))
				.map((data) => (
					<Nav.Item
						key={data.id}
						id={`server_${data.id}`}
						onClick={onHybridClick(data.id)}
						style={
							clicked_server === data.id
								? {backgroundColor: '#edeae5'}
								: null
						}
					>
						<span>
							<FaServer
								style={{
									verticalAlign: 'middle',
									marginRight: '15px',
									fontSize: '25px',
								}}
							/>
						</span>
						<span style={{verticalAlign: 'middle'}}>
							{data.name}
						</span>
					</Nav.Item>
				))}
		</Nav>
	);
};

ServerNavBar.propTypes = {
	search: PropTypes.string.isRequired,
};

export default ServerNavBar;
