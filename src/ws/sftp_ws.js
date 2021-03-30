import SFTP from '../dist/sftp_pb';
import * as PropTypes from 'prop-types';

let fileBuffer = new ArrayBuffer(0);

let getReceiveSum = 0;

const sftp_ws = ({
	keyword,
	ws,
	uuid,
	data,
	path,
	newPath,
	fileName,
	uploadFile,
}) => {
	const msgObj = new SFTP.Message();
	msgObj.setType(SFTP.Message.Types.REQUEST);
	const reqObj = new SFTP.Request();
	let postObj = null;
	let cmdObj = null;

	let progress = 0;
	let total = 0;

	const appendBuffer = (buffer1, buffer2) => {
		var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
		tmp.set(new Uint8Array(buffer1), 0);
		tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
		return tmp.buffer;
	};

	return new Promise((resolve) => {
		const upload = () => {
			// return new Promise((resolve) => {
			console.log('file size : ', uploadFile.size);

			const uploadFileSize = uploadFile.size;

			const chunkSize = 8 * 1024;
			const fileSlices = [];

			for (var i = 0; i < uploadFileSize; i += chunkSize) {
				(function (start) {
					fileSlices.push({
						offset: start,
						length: chunkSize + start,
					});
				})(i);
			}

			const sendBuffer = (data) => {
				console.log('recv data : ', data);
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(uuid);

				if (keyword === 'CommandByPut') {
					cmdObj = new SFTP.CommandByPut();
					postObj.setPut(cmdObj);
				} else if (keyword === 'CommandByPutDirect') {
					cmdObj = new SFTP.CommandByPutDirect();
					postObj.setPutdirect(cmdObj);
				}

				cmdObj.setPath(path);
				cmdObj.setFilename(fileName);
				cmdObj.setFilesize(uploadFileSize);
				cmdObj.setContents(Buffer.from(data.buffer));
				cmdObj.setOffset(1);
				cmdObj.setLast(data.last);

				reqObj.setBody(postObj.serializeBinary());
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
					var blob = file.slice(slice.offset, slice.length);
					reader.readAsArrayBuffer(blob);
				});
			};

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
					}
				});
			};
			readFile(uploadFile, fileSlices.shift());
			// });
		};

		switch (keyword) {
			case 'Connection':
				reqObj.setType(SFTP.Request.Types.CONNECT);
				postObj = new SFTP.ConnectRequest();
				postObj.setHost(data.host);
				postObj.setUser(data.user);
				postObj.setPassword(data.password);
				postObj.setPort(data.port);
				break;

			case 'Disconnection':
				reqObj.setType(SFTP.Request.Types.DISCONNECT);
				postObj = new SFTP.DisconnectRequest();
				postObj.setUuid(uuid);
				break;

			case 'CommandByCd':
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(uuid);
				cmdObj = new SFTP.CommandByCd();
				cmdObj.setPath(path);
				postObj.setCd(cmdObj);
				break;

			case 'CommandByPwd':
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(uuid);
				cmdObj = new SFTP.CommandByPwd();
				postObj.setPwd(cmdObj);
				break;

			case 'CommandByLs':
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(uuid);
				cmdObj = new SFTP.CommandByLs();
				cmdObj.setPath(path);
				postObj.setLs(cmdObj);
				break;

			case 'CommandByMkdir':
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(uuid);
				cmdObj = new SFTP.CommandByMkdir();
				cmdObj.setPath(path);
				postObj.setMkdir(cmdObj);
				break;

			case 'CommandByRmdir':
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(uuid);
				cmdObj = new SFTP.CommandByRmdir();
				cmdObj.setPath(path);
				postObj.setRmdir(cmdObj);
				break;

			case 'CommandByRm':
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(uuid);
				cmdObj = new SFTP.CommandByRm();
				cmdObj.setPath(path);
				postObj.setRm(cmdObj);
				break;

			case 'CommandByStat':
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(this.state.uuid);
				cmdObj = new SFTP.CommandByStat();
				cmdObj.setPath(this.state.path);
				postObj.setStat(cmdObj);
				break;

			case 'CommandByRename':
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(uuid);
				cmdObj = new SFTP.CommandByRename();
				cmdObj.setOldpath(path);
				cmdObj.setNewpath(newPath);

				postObj.setRename(cmdObj);
				break;

			case 'EDIT':
			case 'CommandByGet':
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(uuid);
				cmdObj = new SFTP.CommandByGet();
				cmdObj.setPath(path);
				cmdObj.setFilename(fileName);
				postObj.setGet(cmdObj);
				break;

			case 'CommandByGetDirect':
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(uuid);
				cmdObj = new SFTP.CommandByGetDirect();
				cmdObj.setPath(path);
				cmdObj.setFilename(fileName);
				postObj.setGetdirect(cmdObj);
				break;

			case 'CommandByPut':
			case 'CommandByPutDirect':
				upload();
				break;
			default:
				break;
		}
		if (keyword !== 'CommandByPut' && keyword !== 'CommandByPutDirect') {
			reqObj.setBody(postObj?.serializeBinary());
			msgObj.setBody(reqObj.serializeBinary());
			ws.send(msgObj.serializeBinary());
		}

		ws.binaryType = 'arraybuffer';
		ws.onmessage = (evt) => {
			if (evt.data instanceof ArrayBuffer) {
				const message = SFTP.Message.deserializeBinary(evt.data);

				if (message.getType() === SFTP.Message.Types.RESPONSE) {
					const response = SFTP.Response.deserializeBinary(
						message.getBody(),
					);
					console.log('[receive]response type', response.getType());
					if (response.getType() === SFTP.Response.Types.CONNECT) {
						const msgObj = SFTP.ConnectResponse.deserializeBinary(
							response.getBody(),
						);

						if (msgObj.getStatus() === 'connected') {
							resolve(msgObj.toObject());
						}
					} else if (
						response.getType() === SFTP.Response.Types.DISCONNECT
					) {
						const msgObj = SFTP.DisconnectResponse.deserializeBinary(
							response.getBody(),
						);

						if (msgObj.getStatus() === 'disconnected') {
							resolve(msgObj.toObject());
						}
					} else if (
						response.getType() === SFTP.Response.Types.MESSAGE
					) {
						const msgObj = SFTP.MessageResponse.deserializeBinary(
							response.getBody(),
						);

						var percent = progress;

						if (
							msgObj.getStatus() !== undefined &&
							msgObj.getStatus() === 'progress'
						) {
							percent = msgObj
								.getResult()
								.replace('percent : ', '');
							console.log('[progress]..........', percent);
						} else {
							if (
								keyword !== 'CommandByGet' &&
								// keyword !== 'CommandByPut' &&
								keyword !== 'EDIT'
							) {
								console.log(msgObj.toObject());
								console.log(msgObj.getStatus());
								resolve(msgObj.toObject());
							}
						}
					} else if (
						response.getType() === SFTP.Response.Types.FILE
					) {
						const msgObj = SFTP.FileResponse.deserializeBinary(
							response.getBody(),
						);

						var arr = msgObj.getContents_asU8();

						console.log('file as u8', arr);

						fileBuffer = appendBuffer(fileBuffer, arr);
						console.log('fileBuffer---> ', fileBuffer);

						// 프로그래스바
						var sum = getReceiveSum + arr.length;
						const percent = (sum * 100) / msgObj.getFilesize();

						console.log({
							getReceiveSum: sum,
							progress: percent,
						});

						if (msgObj.getLast() === true) {
							const blob = new Blob([fileBuffer]);

							// eslint-disable-next-line no-undef
							fileBuffer = new ArrayBuffer(0);

							if (keyword === 'EDIT') {
								// let text = '';
								blob.stream()
									.getReader()
									.read()
									.then(({value, done}) => {
										resolve(
											new TextDecoder('utf-8').decode(
												value,
											),
										);
									});
							} else {
								var url = URL.createObjectURL(blob);
								var a = document.createElement('a');
								document.body.appendChild(a);
								a.style = 'display: none';
								a.href = url;
								a.download = fileName;
								a.click();
								window.URL.revokeObjectURL(url);
								resolve(msgObj.toObject());
							}
						}
					}
				}
			}
		};
	});
};

sftp_ws.propTypes = {
	keyword: PropTypes.string.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string,
	data: PropTypes.object,
	path: PropTypes.string,
	newPath: PropTypes.string,
	fileName: PropTypes.string,
	uploadFile: PropTypes.object,
};

export default sftp_ws;
