import SSH from '../dist/ssh_pb';

export const Connect = (host, user, password, port) => {
	console.log('CONNECTION');

	const msgObj = new SSH.Message();
	msgObj.setType(SSH.Message.Types.REQUEST);

	const reqObj = new SSH.Request();
	reqObj.setType(SSH.Request.Types.CONNECT);

	const conObj = new SSH.ConnectRequest();
	conObj.setHost(host);
	conObj.setUser(user);
	conObj.setPassword(password);
	conObj.setPort(port);

	reqObj.setBody(conObj.serializeBinary());
	msgObj.setBody(reqObj.serializeBinary());

	return msgObj.serializeBinary();
};

export const SendMessage = (uuid, data) => {
	console.log('SEND MESSAGE');

	const msgObj = new SSH.Message();
	msgObj.setType(SSH.Message.Types.REQUEST);

	const reqObj = new SSH.Request();
	reqObj.setType(SSH.Request.Types.MESSAGE);

	const msgReqObj = new SSH.MessageRequest();
	msgReqObj.setUuid(uuid);
	msgReqObj.setMessage(data);

	reqObj.setBody(msgReqObj.serializeBinary());
	msgObj.setBody(reqObj.serializeBinary());

	return msgObj.serializeBinary();
};

export const Resize = (uuid, cols, rows, width, height) => {
	console.log('RESIZE');

	const msgObj = new SSH.Message();
	msgObj.setType(SSH.Message.Types.REQUEST);

	const reqObj = new SSH.Request();
	reqObj.setType(SSH.Request.Types.WINDOWCHANGE);

	const winObj = new SSH.WindowChangeRequest();
	winObj.setUuid(uuid);
	winObj.setCols(cols);
	winObj.setRows(rows);
	winObj.setWidth(width);
	winObj.setHeight(height);

	reqObj.setBody(winObj.serializeBinary());

	msgObj.setBody(reqObj.serializeBinary());

	return msgObj.serializeBinary();
};

export const GetMessage = (e) => {
	console.log('GET MESSAGE');

	if (e.data instanceof ArrayBuffer) {
		const message = SSH.Message.deserializeBinary(e.data);

		if (message.getType() === SSH.Message.Types.RESPONSE) {
			const response = SSH.Response.deserializeBinary(message.getBody());

			if (response.getType() === SSH.Response.Types.CONNECT) {
				const conObj = SSH.ConnectResponse.deserializeBinary(
					response.getBody(),
				);
				if (conObj.getStatus() === 'connected')
					return {type: 'connected', uuid: conObj.getUuid()};
			} else if (response.getType() === SSH.Response.Types.DISCONNECT) {
				const conObj = SSH.DisconnectResponse.deserializeBinary(
					response.getBody(),
				);
				if (conObj.getStatus() === 'disconnected')
					return {type: 'disconnected'};
			} else if (response.getType() === SSH.Response.Types.MESSAGE) {
				const msgObj = SSH.MessageResponse.deserializeBinary(
					response.getBody(),
				);
				return {type: 'message', result: msgObj.getResult()};
			}
		}
	} else {
		const message = JSON.parse(e.data);
		if (message['status'] === 'connected') {
			return {type: 'connected', uuid: message.uuid};
		}
	}
};

export const Close = (uuid) => {
	console.log('CLOSE');

	const msgObj = new SSH.Message();
	msgObj.setType(SSH.Message.Types.REQUEST);

	const reqObj = new SSH.Request();
	reqObj.setType(SSH.Request.Types.DISCONNECT);

	const disObj = new SSH.DisconnectRequest();
	disObj.setUuid(uuid);

	reqObj.setBody(disObj.serializeBinary());
	msgObj.setBody(reqObj.serializeBinary());

	return msgObj.serializeBinary();
};

export const Error = (e) => {
	console.log('ERROR');
	console.log(e);
};
