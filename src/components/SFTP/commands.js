import SFTP from '../../dist/sftp_pb';
import {CLOSE_TAB, OPEN_TAB} from '../../reducers/common';
import {
	SFTP_DELETE_CURRENT_LIST,
	SFTP_DELETE_CURRENT_PATH,
	SFTP_SAVE_CURRENT_LIST,
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
						console.log('run sendConnect');
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

					if (conObj.getStatus() === 'disconnected') {
						console.log('run sendDisconnect');
						dispatch({
							type: SFTP_DELETE_CURRENT_PATH,
							data: uuid,
						});
						dispatch({
							type: SFTP_DELETE_CURRENT_LIST,
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

export const sendCommandByLs = (ws, uuid, path, dispatch) => {
	// eslint-disable-next-line no-undef
	// return new Promise((resolve) => {
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
					// resolve(msgObj.getResult());
					listConversion(msgObj.getResult(), uuid, dispatch);
				}
			}
		}
	};
	// });
};

export const listConversion = (result, uuid, dispatch) => {
	console.log('run listConversion');

	// eslint-disable-next-line no-undef
	// return new Promise((resolve) => {
	const tempA = result;
	const tempB = tempA?.substring(1, tempA.length - 1);
	const tempC = tempB
		?.split(',')
		.map((line) => line.trim().replace(/\s{2,}/gi, ' '));
	const fileList = [];
	let i = 0;
	tempC?.forEach((list) => {
		const value = list.split(' ');
		if (value[8] !== '.') {
			const name = value.slice(8).join(' ');
			fileList.push({
				fileName: name,
				fileSize:
					typeof value[4] === 'string' &&
					value[4]
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						.trim(),
				fileType: value[0][0] === 'd' ? 'directory' : 'file',
				lastModified: `${value[5]} ${value[6]} ${value[7]}`,
				permission: value[0],
				owner: value[2],
				group: value[3],
				links: value[1],
				key: i++,
			});
		}
	});
	fileList.sort((a, b) => {
		let typeA = a.fileType;
		let typeB = b.fileType;
		if (typeA < typeB) {
			return -1;
		}
		if (typeA > typeB) {
			return 1;
		}
		return 0;
	});
	// resolve(fileList);
	dispatch({
		type: SFTP_SAVE_CURRENT_LIST,
		data: {uuid, list: fileList},
	});
	// });
};

// export const sendCommandByPut = (e, ws, uuid, path) => {
// 	e.preventDefault();
// 	upload('put', ws, uuid, path);
// };
//
// export const sendCommandByPutDirect = (e, ws, uuid, path) => {
// 	e.preventDefault();
// 	upload('put-direct', ws, uuid, path);
// };

export const sendCommandByPut = (command, ws, uuid, path, FileKey) => {
	console.log('sendCommandByPut()');
	// eslint-disable-next-line no-undef
	return new Promise((resolve) => {
		let uploadFile = FileKey;
		console.log('file size : ', uploadFile.size);

		const uploadFileSize = uploadFile.size;

		const chunkSize = 8 * 1024;
		const fileSlices = [];

		for (var i = 0; i < uploadFileSize; i += chunkSize) {
			(function (start) {
				fileSlices.push({offset: start, length: chunkSize + start});
			})(i);
		}

		const sendBuffer = (data) => {
			console.log('recv data : ', data);
			let msgObj = new SFTP.Message();
			msgObj.setType(SFTP.Message.Types.REQUEST);

			let reqObj = new SFTP.Request();
			reqObj.setType(SFTP.Request.Types.MESSAGE);

			let msgReqObj = new SFTP.MessageRequest();
			msgReqObj.setUuid(uuid);

			let cmdObj;

			if (command === 'put') {
				cmdObj = new SFTP.CommandByPut();
				msgReqObj.setPut(cmdObj);
			} else if (command === 'put-direct') {
				cmdObj = new SFTP.CommandByPutDirect();
				msgReqObj.setPutdirect(cmdObj);
			}

			cmdObj.setPath(path);
			cmdObj.setFilename(FileKey.name);
			cmdObj.setFilesize(uploadFileSize);
			cmdObj.setContents(Buffer.from(data.buffer));
			cmdObj.setOffset(1);
			cmdObj.setLast(data.last);

			reqObj.setBody(msgReqObj.serializeBinary());

			msgObj.setBody(reqObj.serializeBinary());

			ws.send(msgObj.serializeBinary());
		};
		const readBytes = (file, slice) => {
			const reader = new FileReader();

			// eslint-disable-next-line no-undef
			return new Promise((resolve) => {
				reader.onload = (e) => {
					resolve(e.target.result);
				};

				let blob = file.slice(slice.offset, slice.length);
				reader.readAsArrayBuffer(blob);
			});
		};
		let total = 0;
		const readFile = (file, slice) => {
			readBytes(file, slice).then((data) => {
				// send protocol buffer
				console.log('read arraybuffer : ', data);
				total += data.byteLength;

				if (0 < fileSlices.length) {
					sendBuffer({buffer: data, last: false});

					readFile(file, fileSlices.shift());
				} else {
					sendBuffer({buffer: data, last: true});
					console.log('file read end. total size : ', total);
					resolve();
				}
			});
		};
		readFile(uploadFile, fileSlices.shift());
	});
};
