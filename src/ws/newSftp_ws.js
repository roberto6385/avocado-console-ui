import SFTP from '../dist2/sftp_pb';
import * as PropTypes from 'prop-types';

const newSftp_ws = ({
	keyword,
	ws,
	token,
	data,
	path,
	newPath,
	fileName,
	uploadFile,
}) => {
	const message = new SFTP.Message();
	const request = new SFTP.Request();
	const cmd = new SFTP.CommandRequest();

	const appendBuffer = (buffer1, buffer2) => {
		var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
		tmp.set(new Uint8Array(buffer1), 0);
		tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
		return tmp.buffer;
	};
	let fileBuffer = new ArrayBuffer(0);
	let progress = 0;
	let getReceiveSum = 0;

	const upload = ({keyword}) => {
		console.log(keyword);

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
			const put = new SFTP.PutRequest();
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
				// eslint-disable-next-line no-case-declarations
				const connect = new SFTP.ConnectRequest();
				connect.setToken(token);
				connect.setHost(data.host);
				connect.setUser(data.user);
				connect.setPassword(data.password);
				connect.setPort(data.port);

				request.setConnect(connect);
				message.setRequest(request);
				break;

			case 'Disconnection':
				// eslint-disable-next-line no-case-declarations
				const disconnect = new SFTP.DisconnectRequest();

				request.setDisconnect(disconnect);
				message.setRequest(request);
				break;

			case 'CommandByCd':
				// eslint-disable-next-line no-case-declarations
				const cd = new SFTP.ChangeDirectoryRequest();
				cd.setPath(path);

				cmd.setCd(cd);
				request.setCommand(cmd);
				message.setRequest(request);
				break;

			case 'CommandByPwd':
				// eslint-disable-next-line no-case-declarations
				const pwd = new SFTP.PrintWorkingDirectoryRequest();
				cmd.setPwd(pwd);
				request.setCommand(cmd);
				message.setRequest(request);
				break;

			case 'CommandByLs':
				// eslint-disable-next-line no-case-declarations
				const ls = new SFTP.ListDirectoryRequest();
				ls.setPath(path);

				cmd.setLs(ls);
				request.setCommand(cmd);
				message.setRequest(request);
				break;

			case 'CommandByMkdir':
				// eslint-disable-next-line no-case-declarations
				const mkdir = new SFTP.MakeDirectoryRequest();
				mkdir.setPath(path);

				cmd.setMkdir(mkdir);
				request.setCommand(cmd);
				message.setRequest(request);
				break;

			case 'CommandByRmdir':
				// eslint-disable-next-line no-case-declarations
				const rmdir = new SFTP.RemoveDirectoryRequest();
				rmdir.setPath(path);

				cmd.setRmdir(rmdir);
				request.setCommand(cmd);
				message.setRequest(request);
				break;

			case 'CommandByRm':
				// eslint-disable-next-line no-case-declarations
				const rm = new SFTP.RemoveFileRequest();
				rm.setPath(path);

				cmd.setRm(rm);
				request.setCommand(cmd);
				message.setRequest(request);
				break;

			case 'CommandByStat':
				// eslint-disable-next-line no-case-declarations
				const stat = new SFTP.StatusRequest();
				stat.setPath(path);

				cmd.setStat(stat);
				request.setCommand(cmd);
				message.setRequest(request);

				break;

			case 'CommandByRename':
				// eslint-disable-next-line no-case-declarations
				const rename = new SFTP.RenameRequest();
				rename.setOldpath(path);
				rename.setNewpath(newPath);

				cmd.setRename(rename);
				request.setCommand(cmd);
				message.setRequest(request);
				break;

			case 'EDIT':
			case 'CommandByGet':
				progress = 0;

				// eslint-disable-next-line no-case-declarations
				const get = new SFTP.GetRequest();
				get.setPath(path);
				get.setFilename(fileName);

				cmd.setGet(get);
				request.setCommand(cmd);
				message.setRequest(request);
				break;

			case 'CommandByGetDirect':
				break;

			case 'CommandByPut':
			case 'CommandByPutDirect':
				upload({keyword});
				break;
			default:
				break;
		}

		if (keyword !== 'CommandByPut' && keyword !== 'CommandByPutDirect') {
			ws.send(message.serializeBinary());
		}

		ws.binaryType = 'arraybuffer';
		ws.onmessage = (evt) => {
			// listen to data sent from the websocket server

			console.log('on data, ', evt.data);

			if (evt.data instanceof ArrayBuffer) {
				const message = SFTP.Message.deserializeBinary(evt.data);

				if (message.getTypeCase() === SFTP.Message.TypeCase.RESPONSE) {
					const response = message.getResponse();

					console.log('response status: ', response.getStatus());

					// this.setState({
					// 	responseStatus: response.getStatus(), // 응답 상태 코드 참고.
					// 	errorMessage: '',
					// });

					if (
						response.getResponseCase() ===
						SFTP.Response.ResponseCase.CONNECT
					) {
						const connect = response.getConnect();
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
								break;
							}
							case SFTP.CommandResponse.CommandCase.PWD: {
								const pwd = command.getPwd();
								console.log('command : pwd', pwd);
								console.log(
									'command : pwd.getMessage',
									pwd.getMessage(),
								);
								resolve({path: pwd.getMessage()});

								// this.setState({
								// 	result: pwd.getMessage(),
								// });
								break;
							}
							case SFTP.CommandResponse.CommandCase.CHGRP: {
								const chgrp = command.getChgrp();
								console.log('command : chgrp', chgrp);
								break;
							}
							case SFTP.CommandResponse.CommandCase.CHOWN: {
								const chown = command.getChown();
								console.log('command : chown', chown);
								break;
							}
							case SFTP.CommandResponse.CommandCase.CHMOD: {
								const chmod = command.getChmod();
								console.log('command : chmod', chmod);
								break;
							}
							case SFTP.CommandResponse.CommandCase.MKDIR: {
								const mkdir = command.getMkdir();
								console.log('command : mkdir', mkdir);
								break;
							}
							case SFTP.CommandResponse.CommandCase.RMDIR: {
								const rmdir = command.getRmdir();
								console.log('command : rmdir', rmdir);
								break;
							}
							case SFTP.CommandResponse.CommandCase.RM: {
								const rm = command.getRm();
								console.log('command : rm', rm);
								break;
							}
							case SFTP.CommandResponse.CommandCase.RENAME: {
								const rename = command.getRename();
								console.log('command : rename', rename);
								break;
							}
							case SFTP.CommandResponse.CommandCase.LN: {
								const ln = command.getLn();
								console.log('command : ln', ln);
								break;
							}
							case SFTP.CommandResponse.CommandCase.LS: {
								const ls = command.getLs();
								console.log('command : ls', ls);

								const entryList = ls.getEntryList();
								console.log('entry ', entryList.length);

								var result = '';

								for (var i = 0; i < entryList.length; i++) {
									const entry = entryList[i];
									console.log(
										'entry : ',
										entry.getLongname(),
									);
									result += entry.getLongname() + '\n';
								}

								console.log(result);

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
								break;
							}
							case SFTP.CommandResponse.CommandCase.GET: {
								const get = command.getGet();
								console.log('command : get', get);

								const data = get.getData_asU8();
								fileBuffer = appendBuffer(fileBuffer, data);

								// 프로그래스바
								let sum = getReceiveSum + data.length;
								const percent = (sum * 100) / get.getFilesize();
								console.log(sum);
								console.log(percent);

								// this.setState({
								// 	getReceiveSum: sum,
								// 	progress: percent,
								// });

								if (get.getLast() === true) {
									const blob = new Blob([fileBuffer]);

									fileBuffer = new ArrayBuffer(0);

									const url = URL.createObjectURL(blob);

									const a = document.createElement('a');
									document.body.appendChild(a);
									a.setAttribute('style', 'display:none');
									a.href = url;
									a.download = fileName;
									a.click();
									window.URL.revokeObjectURL(url);

									getReceiveSum = 0;
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

newSftp_ws.propTypes = {
	keyword: PropTypes.string.isRequired,
	ws: PropTypes.object.isRequired,
	data: PropTypes.object,
	uploadFile: PropTypes.object,
	token: PropTypes.string,
	path: PropTypes.string,
	newPath: PropTypes.string,
	fileName: PropTypes.string,
};

export default newSftp_ws;
