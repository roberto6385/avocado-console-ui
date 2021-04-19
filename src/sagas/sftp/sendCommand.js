import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	ADD_HISTORY,
	CD_FAILURE,
	CD_REQUEST,
	CD_SUCCESS,
	commandLsAction,
	commandPwdAction,
	LS_FAILURE,
	LS_REQUEST,
	LS_SUCCESS,
	PUT_FAILURE,
	PUT_REQUEST,
	PUT_SUCCESS,
	PWD_FAILURE,
	PWD_REQUEST,
	PWD_SUCCESS,
	RENAME_FAILURE,
	RENAME_REQUEST,
	RENAME_SUCCESS,
	RM_FAILURE,
	RM_REQUEST,
	RM_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {listConversion} from '../../components/SFTP/commands';

function* messageReader(data, payload, type) {
	const {uuid, item, path} = payload;
	console.log(data);
	// return new Promise(function (resolve) {
	try {
		if (data instanceof ArrayBuffer) {
			const message = SFTP.Message.deserializeBinary(data);

			if (message.getTypeCase() === SFTP.Message.TypeCase.RESPONSE) {
				const response = message.getResponse();
				console.log('response status: ', response.getStatus());
				if (
					response.getResponseCase() ===
					SFTP.Response.ResponseCase.COMMAND
				) {
					const command = response.getCommand();

					switch (command.getCommandCase()) {
						case SFTP.CommandResponse.CommandCase.CD: {
							const cd = command.getCd();
							console.log('command : cd', cd);
							yield put({
								type: CD_SUCCESS,
								payload: {uuid},
							});
							return {
								type: CD_SUCCESS,
							};
						}
						case SFTP.CommandResponse.CommandCase.PWD: {
							const pwd = command.getPwd();
							console.log('command : pwd', pwd);
							let pathList = ['/'];
							let tempPathList = pwd.getMessage().split('/');
							tempPathList.reduce(function (
								accumulator,
								currentValue,
							) {
								pwd.getMessage() !== '/' &&
									pathList.push(
										accumulator + '/' + currentValue,
									);
								return accumulator + '/' + currentValue;
							});

							yield put({
								type: PWD_SUCCESS,
								payload: {
									uuid,
									path: pwd.getMessage(),
									pathList,
								},
							});
							return {
								type: PWD_SUCCESS,
								path: pwd.getMessage(),
								pathList,
							};
						}
						// case SFTP.CommandResponse.CommandCase.CHGRP : {
						//
						//     const chgrp = command.getChgrp();
						//     console.log("command : chgrp", chgrp);
						//     break;
						// }
						// case SFTP.CommandResponse.CommandCase.CHOWN : {
						//
						//     const chown = command.getChown();
						//     console.log("command : chown", chown);
						//     break;
						// }
						// case SFTP.CommandResponse.CommandCase.CHMOD : {
						//
						//     const chmod = command.getChmod();
						//     console.log("command : chmod", chmod);
						//     break;
						// }
						// case SFTP.CommandResponse.CommandCase.MKDIR : {
						//
						//     const mkdir = command.getMkdir();
						//     console.log("command : mkdir", mkdir);
						//     break;
						// }
						case SFTP.CommandResponse.CommandCase.RMDIR: {
							const rmdir = command.getRmdir();
							console.log('command : rmdir', rmdir);
							yield put({
								type: RM_SUCCESS,
								payload: {uuid},
							});
							// yield take(
							// 	RM_SUCCESS,
							// 	yield put({
							// 		type: ADD_HISTORY,
							// 		paylaod: {
							// 			uuid: uuid,
							// 			name: item.fileName,
							// 			path: path,
							// 			size: item.fileSize,
							// 			todo: 'rm',
							// 			progress: 100,
							// 			// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
							// 			// 삭제, dispatch, 삭제 해서 progress 100 만들기
							// 		},
							// 	}),
							// );
							return {
								type: RM_SUCCESS,
							};
						}
						case SFTP.CommandResponse.CommandCase.RM: {
							const rm = command.getRm();
							console.log('command : rm', rm);
							yield put({
								type: RM_SUCCESS,
								payload: {uuid},
							});
							// yield takeEvery(
							// 	RM_SUCCESS,
							// 	yield put({
							// 		type: ADD_HISTORY,
							// 		paylaod: {
							// 			uuid: payload.uuid,
							// 			name: payload.item.fileName,
							// 			path: payload.path,
							// 			size: payload.item.fileSize,
							// 			todo: 'rm',
							// 			progress: 100,
							// 			// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
							// 			// 삭제, dispatch, 삭제 해서 progress 100 만들기
							// 		},
							// 	}),
							// );
							return {
								type: RM_SUCCESS,
							};
						}
						case SFTP.CommandResponse.CommandCase.RENAME: {
							const rename = command.getRename();
							console.log('command : rename', rename);
							yield put({
								type: RENAME_SUCCESS,
								payload: {uuid},
							});
							return {
								type: RENAME_SUCCESS,
							};
						}
						// case SFTP.CommandResponse.CommandCase.LN : {
						//
						//     const ln = command.getLn();
						//     console.log("command : ln", ln);
						//     break;
						// }
						case SFTP.CommandResponse.CommandCase.LS: {
							const ls = command.getLs();
							console.log('command : ls', ls);

							const entryList = ls.getEntryList();
							console.log('entry ', entryList.length);

							let result = '';
							const list = [];

							for (let i = 0; i < entryList.length; i++) {
								const entry = entryList[i];
								list.push(entry.getLongname());

								console.log('entry : ', entry.getLongname());
								result += entry.getLongname() + '\n';
							}
							const fileList = listConversion(list);
							yield put({
								type: LS_SUCCESS,
								payload: {
									uuid,
									result,
									fileList,
								},
							});
							return {type: LS_SUCCESS};
						}
						// case SFTP.CommandResponse.CommandCase.STAT : {
						//
						//     const stat = command.getStat();
						//     console.log("command : stat", stat);
						//
						//     this.setState({
						//         result: stat.getUid() + ", " + stat.getGid() + ", " + stat.getPermissions() + ", " + stat.getMtime() + ", " + stat.getSize()
						//     });
						//     break;
						// }
						// case SFTP.CommandResponse.CommandCase.LSTAT : {
						//
						//     const lstat = command.getLstat();
						//     console.log("command : lstat", lstat);
						//
						//     this.setState({
						//         result: lstat.getUid() + ", " + lstat.getGid() + ", " + lstat.getPermissions() + ", " + lstat.getMtime() + ", " + lstat.getSize()
						//     });
						//     break;
						// }
						case SFTP.CommandResponse.CommandCase.PUT: {
							const resPut = command.getPut();

							console.log(resPut.getProgress());
							console.log(resPut.getLast());

							if (
								resPut.getLast() &&
								resPut.getProgress() === 100
							) {
								yield put({
									type: PUT_SUCCESS,
									payload: {
										uuid,
									},
								});
								// yield take(
								// 	PUT_SUCCESS_COMPLETELY,
								// 	yield put({
								// 		type: ADD_HISTORY,
								// 		paylaod: {
								// 			uuid: payload.uuid,
								// 			name: payload.item.name,
								// 			path: payload.path,
								// 			size: payload.item.size,
								// 			todo: 'put',
								// 			progress: resPut.getProgress(),
								// 		},
								// 	}),
								// );
								return {type: PUT_SUCCESS};
							} else {
								return {type: PUT_REQUEST};
								//
							}
						}
						// case SFTP.CommandResponse.CommandCase.GET : {
						//
						//     const get = command.getGet();
						//     console.log("command : get", get);
						//
						//     const data = get.getData_asU8();
						//     this.fileBuffer = this.appendBuffer(this.fileBuffer, data);
						//
						//     // 프로그래스바
						//     let sum = this.state.getReceiveSum + data.length;
						//     const percent = sum * 100 / get.getFilesize();
						//
						//     this.setState({
						//         getReceiveSum : sum,
						//         progress : percent
						//     });
						//
						//     if ( get.getLast() === true ) {
						//
						//         const blob = new Blob([this.fileBuffer]);
						//
						//         this.fileBuffer = new ArrayBuffer(0);
						//
						//         let url = URL.createObjectURL(blob);
						//
						//         let a = document.createElement("a");
						//         document.body.appendChild(a);
						//         a.style = "display: none";
						//         a.href = url;
						//         a.download = this.state.getFileName;
						//         a.click();
						//         window.URL.revokeObjectURL(url);
						//
						//         this.setState({
						//             getReceiveSum : 0,
						//             getProgress : 0
						//         });
						//     }
						//     break;
						// }
					}
				}
			}
		}
	} catch (err) {
		switch (type) {
			case PWD_REQUEST:
				yield put({
					type: PWD_FAILURE,
					payload: {
						errorMessage: 'Error while command pwd',
					},
				});
				break;
			case LS_REQUEST:
				yield put({
					type: LS_FAILURE,
					payload: {
						errorMessage: 'Error while command ls',
					},
				});
				break;
			case CD_REQUEST:
				yield put({
					type: CD_FAILURE,
					payload: {
						errorMessage: 'Error while command cd',
					},
				});
				break;
			case RENAME_REQUEST:
				yield put({
					type: RENAME_FAILURE,
					payload: {
						errorMessage: 'Error while command rename',
					},
				});
				break;
			case RM_REQUEST:
				yield put({
					type: RM_FAILURE,
					payload: {
						errorMessage: 'Error while command remove',
					},
				});
				break;

			case PUT_REQUEST:
				yield put({
					type: PUT_FAILURE,
					payload: {
						errorMessage: 'Error while command put',
					},
				});
				break;
		}
	}
}

function* sendCommand(action) {
	const {type, payload} = action;
	const channel = payload.channel;
	switch (type) {
		case PWD_REQUEST:
			yield call(sftp_ws, {
				keyword: 'CommandByPwd',
				ws: payload.socket,
			});
			break;
		case LS_REQUEST:
			yield call(sftp_ws, {
				keyword: 'CommandByLs',
				ws: payload.socket,
				path: payload.path,
			});
			break;

		case CD_REQUEST:
			yield call(sftp_ws, {
				keyword: 'CommandByCd',
				ws: payload.socket,
				path: payload.newPath,
			});
			break;
		case RENAME_REQUEST:
			yield call(sftp_ws, {
				keyword: 'CommandByRename',
				ws: payload.socket,
				path: payload.path,
				newPath: payload.newPath,
			});
			break;
		case RM_REQUEST:
			console.log(payload.path, payload.item, payload.type);
			payload.type === 'file'
				? yield call(sftp_ws, {
						keyword: 'CommandByRm',
						ws: payload.socket,
						path: `${payload.path}/${payload.item.fileName}`,
				  })
				: yield call(sftp_ws, {
						keyword: 'CommandByRmdir',
						ws: payload.socket,
						path: `${payload.path}/${payload.item.fileName}`,
				  });
			break;

		case PUT_REQUEST:
			yield call(sftp_ws, {
				keyword: 'CommandByPut',
				ws: payload.socket,
				path: payload.path,
				uploadFile: payload.item,
			});

			break;
		default:
			break;
	}

	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, data, payload, type);
			console.log(res.type);

			switch (res?.type) {
				case PWD_SUCCESS:
					for (const key of res.pathList) {
						yield put(
							commandLsAction({
								...payload,
								path: key,
							}),
						);
					}
					break;
				case LS_SUCCESS:
					break;

				case CD_SUCCESS:
					yield put(commandPwdAction(payload));
					break;

				case RENAME_SUCCESS:
					yield put(commandPwdAction(payload));
					break;

				case RM_SUCCESS:
					yield put(commandPwdAction(payload));
					break;
				case PUT_REQUEST:
					break;
				case PUT_SUCCESS:
					yield put(commandPwdAction(payload));
					break;
				default:
					break;
			}
		}
	} catch (err) {
		console.log(err);
		//
	}
}

function* watchSendCommand() {
	yield takeEvery(PWD_REQUEST, sendCommand);
	yield takeEvery(LS_REQUEST, sendCommand);
	yield takeEvery(CD_REQUEST, sendCommand);
	yield takeEvery(RENAME_REQUEST, sendCommand);
	yield takeEvery(RM_REQUEST, sendCommand);
	yield takeEvery(PUT_REQUEST, sendCommand);
}

export default function* commandSaga() {
	yield all([fork(watchSendCommand)]);
}
