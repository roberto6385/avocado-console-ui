import SFTP from '../../dist/sftp_pb';
import {
	CD_SUCCESS,
	CONNECTION_SUCCESS,
	DISCONNECTION_SUCCESS,
	EDIT_READ_SUCCESS,
	EDIT_WRITE_SUCCESS,
	ERROR,
	GET_SUCCESS,
	LS_SUCCESS,
	MKDIR_SUCCESS,
	PUT_SUCCESS,
	PWD_SUCCESS,
	READ_SUCCESS,
	RENAME_SUCCESS,
	RM_SUCCESS,
	WRITE_SUCCESS,
} from '../../reducers/sftp';

let fileBuffer = new ArrayBuffer(0);

const appendBuffer = (buffer1, buffer2) => {
	const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
	tmp.set(new Uint8Array(buffer1), 0);
	tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
	return tmp.buffer;
};

let getReceiveSum = 0;
let readPercent = 0;
let readByteSum = 0;
let writePercent = 0;
let writeByteSum = 0;

export async function messageReader({data, payload}) {
	try {
		if (data instanceof ArrayBuffer) {
			const message = SFTP.Message.deserializeBinary(data);
			if (message.getTypeCase() === SFTP.Message.TypeCase.RESPONSE) {
				const response = message.getResponse();
				console.log(response);
				console.log('response status: ', response.getStatus());

				if (
					response.getResponseCase() ===
					SFTP.Response.ResponseCase.CONNECT
				) {
					const connect = response.getConnect();
					return {type: CONNECTION_SUCCESS, uuid: connect.getUuid()};
				} else if (
					response.getResponseCase() ===
					SFTP.Response.ResponseCase.DISCONNECT
				) {
					const disconnect = response.getDisconnect();
					console.log(disconnect);

					return {type: DISCONNECTION_SUCCESS};
				} else if (
					response.getResponseCase() ===
					SFTP.Response.ResponseCase.COMMAND
				) {
					const command = response.getCommand();

					switch (command.getCommandCase()) {
						case SFTP.CommandResponse.CommandCase.CD: {
							const cd = command.getCd();
							console.log('command : cd', cd);

							return {type: CD_SUCCESS};
						}
						case SFTP.CommandResponse.CommandCase.PWD: {
							const pwd = command.getPwd();
							console.log('command : pwd', pwd);

							let pathList = ['/'];
							let tempPathList = pwd.getPath().split('/');
							tempPathList.reduce(function (
								accumulator,
								currentValue,
							) {
								pwd.getPath() !== '/' &&
									pathList.push(
										accumulator + '/' + currentValue,
									);
								return accumulator + '/' + currentValue;
							});

							return {
								type: PWD_SUCCESS,
								path: pwd.getPath(),
								pathList,
							};
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

							return {type: MKDIR_SUCCESS};
						}
						case SFTP.CommandResponse.CommandCase.RMDIR: {
							const rmdir = command.getRmdir();
							console.log('command : rmdir', rmdir);

							return {type: RM_SUCCESS};
						}
						case SFTP.CommandResponse.CommandCase.RM: {
							const rm = command.getRm();
							console.log('command : rm', rm);

							return {type: RM_SUCCESS};
						}
						case SFTP.CommandResponse.CommandCase.RENAME: {
							const rename = command.getRename();
							console.log('command : rename', rename);

							return {type: RENAME_SUCCESS};
						}
						case SFTP.CommandResponse.CommandCase.LN: {
							const ln = command.getLn();
							console.log('command : ln', ln);
							break;
						}
						case SFTP.CommandResponse.CommandCase.LS: {
							const ls = command.getLs();
							// console.log('command : ls', ls);

							const entryList = ls.getEntryList();
							// console.log('entry ', entryList.length);

							// const list = [];
							const list = [];
							for (let i = 0; i < entryList.length; i++) {
								const entry = entryList[i];
								// list.push(entry.getLongname());

								// new pure list
								const splitedValue = entry
									.getLongname()
									.replace(/\s{2,}/gi, ' ')
									.split(' ');
								// 나중에 longname에서 가져와야 할 정보나 값이 생기면
								// splitedValue 에서 사용하기 바람.
								// console.log(splitedValue);

								list.push({
									name: entry.getFilename(),
									size: entry.getAttributes().getSize(),
									type:
										entry
											.getAttributes()
											.getPermissionsstring()
											.charAt(0) === 'd'
											? 'directory'
											: 'file',
									lastModified: entry
										.getAttributes()
										.getMtimestring(),
									permission: entry
										.getAttributes()
										.getPermissionsstring(),
									link: splitedValue[1],
									owner: splitedValue[2],
									group: splitedValue[3],
								});
							}
							return {type: LS_SUCCESS, list: list};
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
							const commandPut = command.getPut();
							console.log('command : put', commandPut);
							console.log(commandPut.getProgress());

							return {
								type:
									payload.keyword === 'put'
										? PUT_SUCCESS
										: EDIT_WRITE_SUCCESS,
								last: commandPut.getLast(),
								percent: commandPut.getProgress(),
							};
						}
						case SFTP.CommandResponse.CommandCase.GET: {
							const get = command.getGet();
							console.log('command : get', get);

							const data = get.getData_asU8();
							fileBuffer = appendBuffer(fileBuffer, data);

							// 프로그래스바
							// let sum = getReceiveSum + data.length;
							// const percent = (sum * 100) / get.getFilesize();
							// console.log(percent);
							getReceiveSum +=
								(data.length * 100) / get.getFilesize();
							console.log(
								(data.length * 100) / get.getFilesize(),
							);
							console.log(Math.round(getReceiveSum));
							let text = '';

							if (get.getLast() === true) {
								const blob = new Blob([fileBuffer]);

								if (payload.keyword === 'get') {
									const url = URL.createObjectURL(blob);

									const a = document.createElement('a');
									document.body.appendChild(a);
									a.setAttribute('hidden', true);
									a.href = url;
									a.download = payload.file.name;
									a.click();
									window.URL.revokeObjectURL(url);
									fileBuffer = new ArrayBuffer(0);
								} else if (payload.keyword === 'edit') {
									text = await new Response(blob).text();
									fileBuffer = new ArrayBuffer(0);
								}
							}

							return {
								type:
									payload.keyword === 'get'
										? GET_SUCCESS
										: EDIT_READ_SUCCESS,
								last: get.getLast(),
								keyword: payload.keyword,
								percent: Math.round(getReceiveSum),
								text,
							};
						}

						case SFTP.CommandResponse.CommandCase.READFILE: {
							const read = command.getReadfile();
							const data = read.getData_asU8();
							fileBuffer = appendBuffer(fileBuffer, data);

							console.log('command : read file', read);
							console.log(read.getReadbytes());
							console.log(
								'payload.file.size : ' +
									payload.readList[0].file.size,
							);
							if (read.getCompleted() === false)
								readByteSum += read.getReadbytes();
							readPercent =
								(readByteSum * 100) /
								payload.readList[0].file.size;

							console.log('readByteSum : ' + readByteSum);
							console.log('readPercent : ' + readPercent);
							let text = '';

							if (read.getCompleted()) {
								const blob = new Blob([fileBuffer]);
								if (payload.keyword === 'read') {
									const url = URL.createObjectURL(blob);

									const a = document.createElement('a');
									document.body.appendChild(a);
									a.setAttribute('hidden', true);
									a.href = url;
									a.download = payload.readList[0].file.name;
									a.click();
									window.URL.revokeObjectURL(url);
									fileBuffer = new ArrayBuffer(0);
								} else if (payload.keyword === 'edit') {
									text = await new Response(blob).text();
									fileBuffer = new ArrayBuffer(0);
								}
							}
							if (read.getCompleted()) {
								readByteSum = 0;
								readPercent = 0;
							}
							return {
								type: READ_SUCCESS,
								byteSum: readByteSum,
								end:
									read.getReadbytes() === -1
										? true
										: readByteSum ===
										  payload.readList[0].file.size,
								last: read.getCompleted(),
								percent:
									read.getReadbytes() === -1
										? 100
										: readPercent,
								keyword: payload.keyword,
								text,
							};
						}
						case SFTP.CommandResponse.CommandCase.WRITEFILE: {
							const write = command.getWritefile();
							console.log('command : write file', write);

							if (write.getCompleted() === false)
								writeByteSum += write.getWritebytes();
							writePercent =
								(writeByteSum * 100) /
								payload.readList[0].file.size;

							console.log('writeByteSum : ' + writeByteSum);
							console.log('writePercent : ' + writePercent);

							if (write.getCompleted()) {
								writeByteSum = 0;
								writePercent = 0;
							}
							return {
								type: WRITE_SUCCESS,
								byteSum: writeByteSum,
								end:
									write.getWritebytes() === -1
										? true
										: writeByteSum ===
										  payload.readList[0].file.size,
								last: write.getCompleted(),
								keyword: payload.keyword,
								percent:
									write.getWritebytes() === -1
										? 100
										: writePercent,
							};
						}
					}
				} else if (
					response.getResponseCase() ===
					SFTP.Response.ResponseCase.ERROR
				) {
					const error = response.getError();
					console.log(error.getMessage());
					return {
						type: ERROR,
					};
				}
			} else {
				console.log('data is not protocol buffer.');
			}
		} else {
			const message = JSON.parse(data);

			console.log('data is not ArrayBuffer', message);

			if (message['status'] === 'connected') {
				console.log(message['uuid']);
			}
			console.log(message.result);
		}
	} catch (err) {
		console.log(err);
	}
}
