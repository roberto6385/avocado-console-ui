import SFTP from '../../dist/sftp_pb';
import {CLOSE_TAB, OPEN_TAB} from '../../reducers/common';
import {
	SFTP_DELETE_CURRENT_PATH,
	SFTP_SAVE_CURRENT_PATH,
} from '../../reducers/sftp';

export const sendConnect = (ws, data, dispatch) => {
	const msgObj = new SFTP.Message();
	msgObj.setType(SFTP.Message.Types.REQUEST);

	const reqObj = new SFTP.Request();
	reqObj.setType(SFTP.Request.Types.CONNECT);

	const conObj = new SFTP.ConnectRequest();
	conObj.setHost(data.host);
	conObj.setUser(data.user);
	conObj.setPassword(data.password);
	conObj.setPort(data.port);

	reqObj.setBody(conObj.serializeBinary());
	msgObj.setBody(reqObj.serializeBinary());

	ws.binaryType = 'arraybuffer';
	ws.onopen = () => ws.send(msgObj.serializeBinary());
	ws.onmessage = (evt) => {
		// eslint-disable-next-line no-undef
		if (evt.data instanceof ArrayBuffer) {
			const message = SFTP.Message.deserializeBinary(evt.data);
			if (message.getType() === SFTP.Message.Types.RESPONSE) {
				const response = SFTP.Response.deserializeBinary(
					message.getBody(),
				);
				if (response.getType() === SFTP.Response.Types.CONNECT) {
					const conObj = SFTP.ConnectResponse.deserializeBinary(
						response.getBody(),
					);

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

export const sendDisconnect = (ws, uuid, index, dispatch) => {
	const msgObj = new SFTP.Message();
	msgObj.setType(SFTP.Message.Types.REQUEST);

	const reqObj = new SFTP.Request();
	reqObj.setType(SFTP.Request.Types.DISCONNECT);

	const disObj = new SFTP.DisconnectRequest();
	disObj.setUuid(uuid);

	reqObj.setBody(disObj.serializeBinary());
	msgObj.setBody(reqObj.serializeBinary());

	ws.send(msgObj.serializeBinary());
	ws.onmessage = (evt) => {
		// eslint-disable-next-line no-undef
		if (evt.data instanceof ArrayBuffer) {
			const message = SFTP.Message.deserializeBinary(evt.data);
			if (message.getType() === SFTP.Message.Types.RESPONSE) {
				const response = SFTP.Response.deserializeBinary(
					message.getBody(),
				);
				if (response.getType() === SFTP.Response.Types.DISCONNECT) {
					const conObj = SFTP.DisconnectResponse.deserializeBinary(
						response.getBody(),
					);
					console.log('[receive]disconnect', conObj);
					console.log(
						'[receive]disconnect to json',
						conObj.toObject(),
					);

					if (conObj.getStatus() === 'disconnected') {
						console.log('SFTP Container Server Disconnection!');
						dispatch({
							type: SFTP_DELETE_CURRENT_PATH,
							data: uuid,
						});
						dispatch({type: CLOSE_TAB, data: index});
					}
				}
			}
		}
	};
};

export const sendCommandByCd = (ws, uuid, path) => {
	// eslint-disable-next-line no-undef
	return new Promise((resolve) => {
		const msgObj = new SFTP.Message();
		msgObj.setType(SFTP.Message.Types.REQUEST);

		const reqObj = new SFTP.Request();
		reqObj.setType(SFTP.Request.Types.MESSAGE);

		const msgReqObj = new SFTP.MessageRequest();
		msgReqObj.setUuid(uuid);

		const cmdObj = new SFTP.CommandByCd();
		cmdObj.setPath(path);

		msgReqObj.setCd(cmdObj);
		reqObj.setBody(msgReqObj.serializeBinary());
		msgObj.setBody(reqObj.serializeBinary());

		ws.send(msgObj.serializeBinary());
		ws.onmessage = (evt) => {
			// eslint-disable-next-line no-undef
			if (evt.data instanceof ArrayBuffer) {
				const message = SFTP.Message.deserializeBinary(evt.data);
				if (message.getType() === SFTP.Message.Types.RESPONSE) {
					const response = SFTP.Response.deserializeBinary(
						message.getBody(),
					);
					if (response.getType() === SFTP.Response.Types.MESSAGE) {
						const msgObj = SFTP.MessageResponse.deserializeBinary(
							response.getBody(),
						);

						console.log('run sendCommandByCd');
						// console.log(msgObj.getResult());
						// console.log(msgObj.getStatus());
						// console.log(msgObj.getUuid());
						// console.log(percent);

						resolve();
					}
				}
			}
		};
	});
};

export const sendCommandByPwd = (ws, uuid, dispatch) => {
	// eslint-disable-next-line no-undef
	return new Promise((resolve) => {
		const msgObj = new SFTP.Message();
		msgObj.setType(SFTP.Message.Types.REQUEST);

		const reqObj = new SFTP.Request();
		reqObj.setType(SFTP.Request.Types.MESSAGE);

		const msgReqObj = new SFTP.MessageRequest();
		msgReqObj.setUuid(uuid);

		const cmdObj = new SFTP.CommandByPwd();

		msgReqObj.setPwd(cmdObj);
		reqObj.setBody(msgReqObj.serializeBinary());
		msgObj.setBody(reqObj.serializeBinary());

		ws.send(msgObj.serializeBinary());
		ws.onmessage = (evt) => {
			// eslint-disable-next-line no-undef
			if (evt.data instanceof ArrayBuffer) {
				const message = SFTP.Message.deserializeBinary(evt.data);
				if (message.getType() === SFTP.Message.Types.RESPONSE) {
					const response = SFTP.Response.deserializeBinary(
						message.getBody(),
					);
					if (response.getType() === SFTP.Response.Types.MESSAGE) {
						const msgObj = SFTP.MessageResponse.deserializeBinary(
							response.getBody(),
						);

						console.log('run sendCommandByPwd');
						// console.log(msgObj.getResult());
						// console.log(msgObj.getStatus());
						// console.log(msgObj.getUuid());
						// console.log(percent);

						dispatch({
							type: SFTP_SAVE_CURRENT_PATH,
							data: {
								uuid: msgObj.getUuid(),
								path: msgObj.getResult(),
							},
						});
						resolve(msgObj.getResult());
					}
				}
			}
		};
	});
};

export const sendCommandByLs = (ws, uuid, path) => {
	// eslint-disable-next-line no-undef
	return new Promise((resolve) => {
		const msgObj = new SFTP.Message();
		msgObj.setType(SFTP.Message.Types.REQUEST);

		const reqObj = new SFTP.Request();
		reqObj.setType(SFTP.Request.Types.MESSAGE);

		const msgReqObj = new SFTP.MessageRequest();
		msgReqObj.setUuid(uuid);

		const cmdObj = new SFTP.CommandByLs();
		cmdObj.setPath(path);

		msgReqObj.setLs(cmdObj);
		reqObj.setBody(msgReqObj.serializeBinary());
		msgObj.setBody(reqObj.serializeBinary());

		ws.send(msgObj.serializeBinary());
		ws.onmessage = (evt) => {
			// eslint-disable-next-line no-undef
			if (evt.data instanceof ArrayBuffer) {
				const message = SFTP.Message.deserializeBinary(evt.data);
				if (message.getType() === SFTP.Message.Types.RESPONSE) {
					const response = SFTP.Response.deserializeBinary(
						message.getBody(),
					);
					if (response.getType() === SFTP.Response.Types.MESSAGE) {
						const msgObj = SFTP.MessageResponse.deserializeBinary(
							response.getBody(),
						);
						console.log('run sendCommandByLs');
						// console.log(msgObj.getResult());
						// console.log(msgObj.getStatus());
						// console.log(msgObj.getUuid());
						resolve(msgObj.getResult());
					}
				}
			}
		};
	});
};
