import SFTP from '../../../dist/sftp_pb';
import {OPEN_TAB} from '../../../reducers/common';

export const sendConnect = (data, dispatch) => {
	const ws = new WebSocket(`ws://${data.host}:8080/ws/sftp/protobuf`);
	console.log('run sendConnect');

	var msgObj = new SFTP.Message();
	msgObj.setType(SFTP.Message.Types.REQUEST);

	var reqObj = new SFTP.Request();
	reqObj.setType(SFTP.Request.Types.CONNECT);

	var conObj = new SFTP.ConnectRequest();
	conObj.setHost(data.host);
	conObj.setUser(data.user);
	conObj.setPassword(data.password);
	conObj.setPort(data.port);

	reqObj.setBody(conObj.serializeBinary());

	msgObj.setBody(reqObj.serializeBinary());

	// console.log('send proto buffer', msgObj);
	// console.log('send proto buffer binary', msgObj.serializeBinary());
	ws.onopen = () => {
		ws.send(msgObj.serializeBinary());
	};

	ws.binaryType = 'arraybuffer';
	ws.onmessage = (evt) => {
		// console.log('run server connection');
		// listen to data sent from the websocket server

		// eslint-disable-next-line no-undef
		if (evt.data instanceof ArrayBuffer) {
			const message = SFTP.Message.deserializeBinary(evt.data);

			if (message.getType() === SFTP.Message.Types.RESPONSE) {
				const response = SFTP.Response.deserializeBinary(
					message.getBody(),
				);
				// console.log('[receive]response type', response.getType());
				if (response.getType() === SFTP.Response.Types.CONNECT) {
					const conObj = SFTP.ConnectResponse.deserializeBinary(
						response.getBody(),
					);
					// console.log('[receive]connect', conObj);
					// console.log('[receive]connect to json', conObj.toObject());
					if (conObj.getStatus() === 'connected') {
						dispatch({
							type: OPEN_TAB,
							data: {
								id: data.id,
								type: 'SFTP',
								ws: ws,
								uuid: conObj.getUuid(),
							},
						});
					}
				}
			}
		}
	};
};
