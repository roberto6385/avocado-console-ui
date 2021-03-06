const SSH = require('../dist/ssh_pb');

export const SendConnect = (token, host, user, password, port) => {
	console.log('SEND CONNECT');

	const message = new SSH.Message();
	const request = new SSH.Request();
	const connect = new SSH.ConnectRequest();

	connect.setToken(token);
	connect.setHost(host);
	connect.setUser(user);
	connect.setPassword(password);
	connect.setPort(port);

	connect.setKeepalivecount(0);
	connect.setKeepaliveinterval(60000);

	request.setConnect(connect);
	message.setRequest(request);

	return message.serializeBinary();
};

export const SendDisconnect = () => {
	console.log('SEND DISCONNECT');

	const message = new SSH.Message();
	const request = new SSH.Request();
	const disconnect = new SSH.DisconnectRequest();

	request.setDisconnect(disconnect);
	message.setRequest(request);

	return message.serializeBinary();
};

export const SendCommand = (data) => {
	console.log('SEND COMMAND');

	const message = new SSH.Message();
	const request = new SSH.Request();
	const command = new SSH.CommandRequest();
	command.setMessage(data);

	request.setCommand(command);
	message.setRequest(request);

	return message.serializeBinary();
};

export const SendWindowChange = (cols, rows, width, height) => {
	console.log('SEND WINDOW CHANGE');

	const message = new SSH.Message();
	const request = new SSH.Request();
	const window = new SSH.WindowChangeRequest();
	window.setCols(cols);
	window.setRows(rows);
	window.setWidth(width);
	window.setHeight(height);

	request.setWindowchange(window);
	message.setRequest(request);

	return message.serializeBinary();
};

export const GetMessage = (data) => {
	try {
		if (data instanceof ArrayBuffer) {
			const message = SSH.Message.deserializeBinary(data);
			if (message.getTypeCase() === SSH.Message.TypeCase.RESPONSE) {
				const response = message.getResponse();
				// console.log(response);
				// console.log(response.getStatus());
				if (
					response.getResponseCase() ===
					SSH.Response.ResponseCase.CONNECT
				) {
					const connect = response.getConnect();
					console.log('CONNECT');
					console.log(JSON.stringify(connect));
					return {type: 'CONNECT', result: connect.getUuid()};
				} else if (
					response.getResponseCase() ===
					SSH.Response.ResponseCase.DISCONNECT
				) {
					console.log('DISCONNECT');
					return {type: 'DISCONNECT'};
				} else if (
					response.getResponseCase() ===
					SSH.Response.ResponseCase.COMMAND
				) {
					const command = response.getCommand();
					console.log('COMMAND');
					// console.log(command.getMessage());
					return {
						type: 'COMMAND',
						result: command.getMessage(),
					};
				} else if (
					response.getResponseCase() ===
					SSH.Response.ResponseCase.WINDOWCHANGE
				) {
					// const window = response.getWindowchange();
					console.log('WINDOWCHANGE');
					return {
						type: 'WINDOWCHANGE',
					};
				} else if (
					response.getResponseCase() ===
					SSH.Response.ResponseCase.ERROR
				) {
					const error = response.getError();
					console.log(error.getMessage());
					console.log('ERROR');
					return {
						type: 'ERROR',
						result: error.getMessage(),
					};
				}
			}
		} else {
			const message = JSON.parse(data);

			if (message['status'] === 'connected') {
				console.log('CONNECT');
				return {type: 'CONNECT', result: message.uuid};
			}
			console.log('COMMAND');
			return {type: 'COMMAND', result: message.result};
		}
	} catch (e) {
		console.log(e);
	}
};
