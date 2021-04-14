import SFTP from '../dist/sftp_pb';
import * as PropTypes from 'prop-types';

const sendConnect = (ws, token, data) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var connect = new SFTP.ConnectRequest();
	connect.setToken(token);
	connect.setHost(data.host);
	connect.setUser(data.user);
	connect.setPassword(data.password);
	connect.setPort(data.port);

	// sftp 서버로 alive message 재전송 회수 ( 0 값이면 사용 안 함 )
	connect.setKeepalivecount(2);
	// sftp 서버로 alive message 전송 주기 ( 단위 ms : 1000ms -> 1sec)
	connect.setKeepaliveinterval(60000);

	request.setConnect(connect);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendDisconnect = (ws) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var disconnect = new SFTP.DisconnectRequest();

	request.setDisconnect(disconnect);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByCd = (ws, path) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var cd = new SFTP.ChangeDirectoryRequest();
	cd.setPath(path);

	cmd.setCd(cd);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByPwd = (ws) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var pwd = new SFTP.PrintWorkingDirectoryRequest();

	cmd.setPwd(pwd);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByMkdir = (ws, path) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var mkdir = new SFTP.MakeDirectoryRequest();
	mkdir.setPath(path);

	cmd.setMkdir(mkdir);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByRmdir = (ws, path) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var rmdir = new SFTP.RemoveDirectoryRequest();
	rmdir.setPath(path);

	cmd.setRmdir(rmdir);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByRm = (ws, path) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var rm = new SFTP.RemoveFileRequest();
	rm.setPath(path);

	cmd.setRm(rm);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByStat = (ws, path) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var stat = new SFTP.StatusRequest();
	stat.setPath(path);

	cmd.setStat(stat);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByLs = (ws, path) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var ls = new SFTP.ListDirectoryRequest();
	ls.setPath(path);

	cmd.setLs(ls);
	request.setCommand(cmd);
	message.setRequest(request);
	ws.send(message.serializeBinary());
};

const sendCommandByRename = (ws, path, newPath) => {
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var rename = new SFTP.RenameRequest();
	rename.setOldpath(path);
	rename.setNewpath(newPath);

	cmd.setRename(rename);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sendCommandByGet = (ws, path, fileName) => {
	// this.setState({
	// 	progress: 0,
	// });
	var message = new SFTP.Message();
	var request = new SFTP.Request();
	var cmd = new SFTP.CommandRequest();
	var get = new SFTP.GetRequest();
	get.setPath(path);
	get.setFilename(fileName);

	cmd.setGet(get);
	request.setCommand(cmd);
	message.setRequest(request);

	ws.send(message.serializeBinary());
};

const sftp_ws = ({
	keyword,
	ws,
	token,
	data,
	path,
	newPath,
	fileName,
	uploadFile,
}) => {
	const appendBuffer = (buffer1, buffer2) => {
		var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
		tmp.set(new Uint8Array(buffer1), 0);
		tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
		return tmp.buffer;
	};
	let fileBuffer = new ArrayBuffer(0);
	let progress = 0;
	let getReceiveSum = 0;

	const upload = (ws, path, uploadFile) => {
		console.log('file size : ', uploadFile.size);

		const uploadFileSize = uploadFile.size;
		const uploadFileName = uploadFile.name;

		const chunkSize = 4 * 1024;
		const fileSlices = [];

		for (let i = 0; i < uploadFileSize; i += chunkSize) {
			(function (start) {
				fileSlices.push({offset: start, length: chunkSize + start});
			})(i);
		}

		const sendBuffer = (data) => {
			var message = new SFTP.Message();
			var request = new SFTP.Request();
			var cmd = new SFTP.CommandRequest();
			var put = new SFTP.PutRequest();
			put.setPath(path);
			put.setFilename(uploadFileName);
			put.setFilesize(uploadFileSize);
			put.setData(Buffer.from(data.buffer));
			put.setOffset(1); // 임시로 1로 사용. 실제 offset 값 필요.
			put.setLast(data.last);

			cmd.setPut(put);
			request.setCommand(cmd);
			message.setRequest(request);

			ws.send(message.serializeBinary());
		};

		const readBytes = (file, slice) => {
			const reader = new FileReader();

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
				}
			});
		};

		readFile(uploadFile, fileSlices.shift());
	};

	return new Promise((resolve) => {
		switch (keyword) {
			case 'Connection':
				sendConnect(ws, token, data);
				break;

			case 'Disconnection':
				sendDisconnect(ws);
				break;

			case 'CommandByCd':
				sendCommandByCd(ws, path);
				break;

			case 'CommandByPwd':
				sendCommandByPwd(ws);
				break;

			case 'CommandByMkdir':
				sendCommandByMkdir(ws, path);
				break;

			case 'CommandByRmdir':
				sendCommandByRmdir(ws, path);
				break;

			case 'CommandByRm':
				sendCommandByRm(ws, path);
				break;

			case 'CommandByStat':
				sendCommandByStat(ws, path);
				break;

			case 'CommandByLs':
				sendCommandByLs(ws, path);
				break;

			case 'CommandByRename':
				sendCommandByRename(ws, path, newPath);
				break;

			case 'CommandByEdit':
			case 'CommandByGet':
				sendCommandByGet(ws, path, fileName);
				break;

			case 'CommandByPut':
				upload(ws, path, uploadFile);
				break;
			default:
				break;
		}

		ws.binaryType = 'arraybuffer';
		ws.onmessage = (evt) => {
			// listen to data sent from the websocket server
			console.log(keyword, 'on data, ', evt.data);
			if (evt.data instanceof ArrayBuffer) {
				try {
					const message = SFTP.Message.deserializeBinary(evt.data);
					if (
						message.getTypeCase() === SFTP.Message.TypeCase.RESPONSE
					) {
						const response = message.getResponse();
						console.log(
							keyword,
							'response status: ',
							response.getStatus(),
						);

						// this.setState({
						// 	responseStatus: response.getStatus(), // 응답 상태 코드 참고.
						// 	errorMessage: '',
						// });

						if (
							response.getResponseCase() ===
							SFTP.Response.ResponseCase.CONNECT
						) {
							const connect = response.getConnect();
							console.log(connect);
							console.log(connect.getUuid());
							resolve({uuid: connect.getUuid()});
							// this.setState({
							// 	uuid: connect.getUuid(),
							// });
						} else if (
							response.getResponseCase() ===
							SFTP.Response.ResponseCase.DISCONNECT
						) {
							const disconnect = response.getDisconnect();
							console.log(disconnect);
							resolve();
							// this.setState({
							// 	uuid: '',
							// 	value: '',
							// 	result: '',
							// 	cmdstatus: '',
							// });
						} else if (
							response.getResponseCase() ===
							SFTP.Response.ResponseCase.COMMAND
						) {
							const command = response.getCommand();

							switch (command.getCommandCase()) {
								case SFTP.CommandResponse.CommandCase.CD: {
									const cd = command.getCd();
									console.log('command : cd', cd);
									resolve({path: command.getCd()});
									break;
								}
								case SFTP.CommandResponse.CommandCase.PWD: {
									const pwd = command.getPwd();
									console.log('command : pwd', pwd);
									console.log(
										'command : pwd.getMessage',
										pwd.getMessage(),
									);
									resolve(pwd.getMessage());

									// this.setState({
									// 	result: pwd.getMessage(),
									// });
									break;
								}
								case SFTP.CommandResponse.CommandCase.CHGRP: {
									const chgrp = command.getChgrp();
									console.log('command : chgrp', chgrp);
									resolve();
									break;
								}
								case SFTP.CommandResponse.CommandCase.CHOWN: {
									const chown = command.getChown();
									console.log('command : chown', chown);
									resolve();
									break;
								}
								case SFTP.CommandResponse.CommandCase.CHMOD: {
									const chmod = command.getChmod();
									console.log('command : chmod', chmod);
									resolve();
									break;
								}
								case SFTP.CommandResponse.CommandCase.MKDIR: {
									const mkdir = command.getMkdir();
									console.log('command : mkdir', mkdir);
									resolve();
									break;
								}
								case SFTP.CommandResponse.CommandCase.RMDIR: {
									const rmdir = command.getRmdir();
									console.log('command : rmdir', rmdir);
									resolve();
									break;
								}
								case SFTP.CommandResponse.CommandCase.RM: {
									const rm = command.getRm();
									console.log('command : rm', rm);
									resolve();
									break;
								}
								case SFTP.CommandResponse.CommandCase.RENAME: {
									const rename = command.getRename();
									console.log('command : rename', rename);
									resolve();
									break;
								}
								case SFTP.CommandResponse.CommandCase.LN: {
									const ln = command.getLn();
									console.log('command : ln', ln);
									resolve();
									break;
								}
								case SFTP.CommandResponse.CommandCase.LS: {
									const ls = command.getLs();
									console.log('command : ls', ls);

									const entryList = ls.getEntryList();
									console.log('entry ', entryList.length);

									// var result = '';
									const list = [];

									for (var i = 0; i < entryList.length; i++) {
										const entry = entryList[i];
										// console.log(
										// 	'entry : ',
										// 	entry.getLongname(),
										// );
										list.push(entry.getLongname());
										// result += entry.getLongname() + '\n';
									}
									resolve(list);

									// this.setState({
									// 	result: result,
									// });
									break;
								}
								case SFTP.CommandResponse.CommandCase.STAT: {
									const stat = command.getStat();
									console.log('command : stat', stat);

									// this.setState({
									// 	result:
									// 		stat.getUid() +
									// 		', ' +
									// 		stat.getGid() +
									// 		', ' +
									// 		stat.getPermissions() +
									// 		', ' +
									// 		stat.getMtime() +
									// 		', ' +
									// 		stat.getSize(),
									// });
									resolve();
									break;
								}
								case SFTP.CommandResponse.CommandCase.LSTAT: {
									const lstat = command.getLstat();
									console.log('command : lstat', lstat);

									// this.setState({
									// 	result:
									// 		lstat.getUid() +
									// 		', ' +
									// 		lstat.getGid() +
									// 		', ' +
									// 		lstat.getPermissions() +
									// 		', ' +
									// 		lstat.getMtime() +
									// 		', ' +
									// 		lstat.getSize(),
									// });
									resolve();
									break;
								}
								case SFTP.CommandResponse.CommandCase.PUT: {
									const put = command.getPut();
									console.log('command : put', put);
									console.log(
										'put.getProgress',
										put.getProgress(),
									);

									// this.setState({
									// 	progress: put.getProgress(),
									// });
									put.getProgress() === 100 &&
										response.getStatus() === 200 &&
										resolve(put.getProgress());
									break;
								}
								case SFTP.CommandResponse.CommandCase.GET: {
									const get = command.getGet();
									console.log('command : get', get);

									const data = get.getData_asU8();
									fileBuffer = appendBuffer(fileBuffer, data);

									// 프로그래스바
									let sum = getReceiveSum + data.length;
									const percent =
										(sum * 100) / get.getFilesize();
									console.log('sum: ', sum);
									console.log('percent: ', percent);

									// this.setState({
									// 	getReceiveSum: sum,
									// 	progress: percent,
									// });

									if (get.getLast() === true) {
										const blob = new Blob([fileBuffer]);

										fileBuffer = new ArrayBuffer(0);

										if (keyword === 'CommandByEdit') {
											blob.stream()
												.getReader()
												.read()
												.then(({value, done}) => {
													resolve(
														new TextDecoder(
															'utf-8',
														).decode(value),
													);
												});
										} else {
											const url = URL.createObjectURL(
												blob,
											);

											const a = document.createElement(
												'a',
											);
											document.body.appendChild(a);
											a.setAttribute(
												'style',
												'display:none',
											);
											a.href = url;
											a.download = fileName;
											a.click();
											window.URL.revokeObjectURL(url);

											getReceiveSum = 0;
											console.log(sum, percent);
											resolve({sum, percent});
										}
										// this.setState({
										// 	getReceiveSum: 0,
										// 	getProgress: 0,
										// });
									}
									break;
								}
							}
						} else if (
							response.getResponseCase() ===
							SFTP.Response.ResponseCase.ERROR
						) {
							const error = response.getError();
							console.log('error', error);
							console.log('error.getMessage', error.getMessage());

							// this.setState({
							// 	errorMessage: error.getMessage(),
							// });
						}
					} else {
						console.log('data is not protocol buffer.');
					}
				} catch (error) {
					console.log(error);
				}
			} else {
				const message = JSON.parse(evt.data);

				// this.setState({dataFromServer: message});
				console.log('data is not ArrayBuffer', message);

				if (message['status'] === 'connected') {
					console.log('uuid: ', message['uuid']);
					// this.setState({
					// 	uuid: message['uuid'],
					// });
				}

				console.log(message.result);
				// this.setState({
				// 	result: message.result,
				// });
			}
		};
	});
};

sftp_ws.propTypes = {
	keyword: PropTypes.string.isRequired,
	ws: PropTypes.object.isRequired,
	data: PropTypes.object,
	uploadFile: PropTypes.object,
	token: PropTypes.string,
	path: PropTypes.string,
	newPath: PropTypes.string,
	fileName: PropTypes.string,
};

export default sftp_ws;
