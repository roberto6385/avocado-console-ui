import * as PropTypes from 'prop-types';

const SSH = require('../dist2/ssh_pb');

const SendConnect = (token, host, user, password, port) => {
	console.log('SEND CONNECT');

	const message = new SSH.Message();
	const request = new SSH.Request();
	const connect = new SSH.ConnectRequest();
	connect.setToken(token);
	connect.setHost(host);
	connect.setUser(user);
	connect.setPassword(password);
	connect.setPort(port);

	request.setConnect(connect);
	message.setRequest(request);

	return message.serializeBinary();
};

const SendDisconnect = () => {
	console.log('SEND DISCONNECT');

	const message = new SSH.Message();
	const request = new SSH.Request();
	const disconnect = new SSH.DisconnectRequest();

	request.setDisconnect(disconnect);
	message.setRequest(request);

	return message.serializeBinary();
};

const SendMessage = (data) => {
	console.log('SEND MESSAGE');

	const message = new SSH.Message();
	const request = new SSH.Request();
	const command = new SSH.CommandRequest();
	command.setMessage(data);

	request.setCommand(command);
	message.setRequest(request);

	return message.serializeBinary();
};

const SendWindowSize = (cols, rows, width, height) => {
	console.log('RESIZE');

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

const ssht_ws = ({keyword, ws, data}) => {
	return new Promise((resolve) => {
		switch (keyword) {
			case 'SendConnect':
				console.log('SendConnect');
				console.log(data);
				ws.send(
					SendConnect(
						data.token,
						data.host,
						data.user,
						data.password,
						data.port,
					),
				);
				break;

			case 'SendDisconnect':
				console.log('SendDisconnect');
				ws.send(SendDisconnect());
				break;

			case 'SendMessage':
				console.log('SendMessage');
				ws.send(SendMessage(data));
				break;

			case 'SendWindowSize':
				console.log('SendWindowSize');
				ws.send(
					SendWindowSize(
						data.cols,
						data.rows,
						data.width,
						data.height,
					),
				);
				break;

			default:
				break;
		}

		ws.binaryType = 'arraybuffer';

		ws.onmessage = (evt) => {
			if (evt.data instanceof ArrayBuffer) {
				const message = SSH.Message.deserializeBinary(evt.data);

				if (message.getTypeCase() === SSH.Message.TypeCase.RESPONSE) {
					const response = message.getResponse();

					if (
						response.getResponseCase() ===
						SSH.Response.ResponseCase.CONNECT
					) {
						const connect = response.getConnect();
						console.log('CONNECT');
						console.log(connect);
						resolve({type: 'CONNECT', result: connect.getUuid()});
					} else if (
						response.getResponseCase() ===
						SSH.Response.ResponseCase.DISCONNECT
					) {
						const disconnect = response.getDisconnect();

						console.log('DISCONNECT');
						resolve({type: 'DISCONNECT'});
					} else if (
						response.getResponseCase() ===
						SSH.Response.ResponseCase.COMMAND
					) {
						const command = response.getCommand();

						console.log('COMMAND');
						console.log(command);
						resolve({
							type: 'COMMAND',
							result: command.getMessage(),
						});
					} else if (
						response.getResponseCase() ===
						SSH.Response.ResponseCase.WINDOWCHANGE
					) {
						const window = response.getWindowchange();
						console.log('WINDOWCHANGE');
						console.log(window);
					} else if (
						response.getResponseCase() ===
						SSH.Response.ResponseCase.ERROR
					) {
						const error = response.getError();
						console.log('ERROR');
						console.log(error);
					}
				}
			} else {
				const message = JSON.parse(evt.data);

				if (message['status'] === 'connected') {
					console.log('CONNECT');
					resolve({type: 'CONNECT', result: message.uuid});
				}
				console.log('COMMAND');
				resolve({type: 'COMMAND', result: message.result});
			}
		};
	});
};

ssht_ws.propTypes = {
	keyword: PropTypes.string.isRequired,
	ws: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
};

export default ssht_ws;
