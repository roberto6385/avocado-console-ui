import {
	all,
	fork,
	put,
	take,
	call,
	takeLatest,
	race,
	delay,
	throttle,
	takeEvery,
} from 'redux-saga/effects';

import {
	SSH_SEND_CONNECTION_REQUEST,
	SSH_SEND_CONNECTION_SUCCESS,
	SSH_SEND_DISCONNECTION_REQUEST,
	SSH_SEND_DISCONNECTION_SUCCESS,
	SSH_SEND_COMMAND_REQUEST,
	SSH_SEND_COMMAND_SUCCESS,
	SSH_SEND_WINDOW_CHANGE_REQUEST,
	SSH_SEND_RECONNECTION_REQUEST,
	SSH_SEND_RECONNECTION_SUCCESS,
} from '../../reducers/ssh';
import {CLOSE_TAB, OPEN_TAB} from '../../reducers/common';
import {initWebsocket} from './socket';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {closeChannel, subscribe} from '../channel';
import {OPEN_WARNING_DIALOG_BOX} from '../../reducers/dialogBoxs';
import {READY_STATE} from '../../reducers/ssh';

function* sendConnection(action) {
	let uuid = null;

	try {
		const ws = yield call(initWebsocket);

		if (ws.readyState === 1) {
			const channel = yield call(subscribe, ws);
			let pass = false;

			yield call(ssht_ws_request, {
				keyword: 'SendConnect',
				ws: ws,
				data: action.payload,
			});

			while (true) {
				const {timeout, result} = yield race({
					timeout: delay(4000),
					result: take(channel),
				});

				if (timeout) {
					closeChannel(channel);
				} else {
					const res = yield call(GetMessage, result);
					console.log(res);
					switch (res.type) {
						case 'CONNECT':
							uuid = res.result;
							pass = true;
							break;

						case 'COMMAND':
							if (pass === true) {
								pass = false;
								yield put({
									type: SSH_SEND_CONNECTION_SUCCESS,
									payload: {
										uuid: uuid,
										ws: ws,
									},
								});
								yield put({
									type: OPEN_TAB,
									payload: {
										uuid: uuid,
										type: 'SSH',
										server: {
											id: action.payload.id,
											name: action.payload.name,
											key: action.payload.key,
										},
									},
								});
							}
							yield put({
								type: SSH_SEND_COMMAND_SUCCESS,
								payload: {
									uuid: uuid,
									result: res.result,
								},
							});
							break;

						case 'ERROR':
							yield put({type: CLOSE_TAB, payload: uuid});
							yield put({
								type: SSH_SEND_DISCONNECTION_SUCCESS,
								payload: uuid,
							});

							//invalid server
							if (res.result.includes('connection')) {
								yield put({
									type: OPEN_WARNING_DIALOG_BOX,
									payload: 'invalid_server',
								});
							}
							//token expire
							if (res.result.includes('token')) {
								//TODO: refresh token
							}
							break;

						default:
							break;
					}
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: CLOSE_TAB, payload: uuid});
		yield put({
			type: SSH_SEND_DISCONNECTION_SUCCESS,
			payload: uuid,
		});
	}
}
function* sendReConnection(action) {
	let uuid = null;

	try {
		const ws = yield call(initWebsocket);
		const channel = yield call(subscribe, ws);
		let pass = false;

		yield call(ssht_ws_request, {
			keyword: 'SendConnect',
			ws: ws,
			data: action.payload,
		});

		while (true) {
			const {timeout, result} = yield race({
				timeout: delay(4000),
				result: take(channel),
			});

			if (timeout) {
				closeChannel(channel);
			} else {
				const res = yield call(GetMessage, result);

				switch (res.type) {
					case 'CONNECT':
						uuid = res.result;
						pass = true;
						break;

					case 'COMMAND':
						if (pass === true) {
							console.log(uuid);
							pass = false;

							yield put({
								type: CLOSE_TAB,
								payload: action.payload.prevUuid,
							});
							yield put({
								type: SSH_SEND_RECONNECTION_SUCCESS,
								payload: {
									uuid: uuid,
									prevUuid: action.payload.prevUuid,
									ws: ws,
								},
							});
							yield put({
								type: OPEN_TAB,
								payload: {
									uuid: uuid,
									type: 'SSH',
									server: {
										id: action.payload.id,
										name: action.payload.name,
										key: action.payload.key,
									},
									prevUuid: action.payload.prevUuid,
									prevIndex: action.payload.prevIndex,
								},
							});
						}
						yield put({
							type: SSH_SEND_COMMAND_SUCCESS,
							payload: {
								uuid: uuid,
								result: res.result,
							},
						});

						break;

					case 'ERROR':
						yield put({type: CLOSE_TAB, payload: uuid});
						yield put({
							type: SSH_SEND_DISCONNECTION_SUCCESS,
							payload: uuid,
						});
						//invalid server
						if (res.result.includes('connection')) {
							yield put({
								type: OPEN_WARNING_DIALOG_BOX,
								payload: 'invalid_server',
							});
						}
						//token expire
						if (res.result.includes('token')) {
							//TODO: do something?
						}
						break;

					default:
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: CLOSE_TAB, payload: uuid});
		yield put({
			type: SSH_SEND_DISCONNECTION_SUCCESS,
			payload: uuid,
		});
	}
}

function* sendDisconnection(action) {
	const channel = yield call(subscribe, action.payload.ws);

	try {
		if (action.payload.ws.readyState !== 1) {
			yield put({type: CLOSE_TAB, payload: action.payload.uuid});
			yield put({
				type: SSH_SEND_DISCONNECTION_SUCCESS,
				payload: action.payload.uuid,
			});
			return;
		}

		yield call(ssht_ws_request, {
			keyword: 'SendDisconnect',
			ws: action.payload.ws,
		});

		while (true) {
			const data = yield take(channel);
			const res = yield call(GetMessage, data);
			switch (res.type) {
				case 'DISCONNECT':
					yield put({type: CLOSE_TAB, payload: action.payload.uuid});
					yield put({
						type: SSH_SEND_DISCONNECTION_SUCCESS,
						payload: action.payload.uuid,
					});
					break;

				case 'ERROR':
					yield put({type: CLOSE_TAB, payload: action.payload.uuid});
					yield put({
						type: SSH_SEND_DISCONNECTION_SUCCESS,
						payload: action.payload.uuid,
					});
					break;

				default:
					break;
			}
		}
	} catch (err) {
		console.log(err);
		closeChannel(channel);
		yield put({type: CLOSE_TAB, payload: action.payload.uuid});
		yield put({
			type: SSH_SEND_DISCONNECTION_SUCCESS,
			payload: action.payload.uuid,
		});
	}
}

function* sendCommand(action) {
	if (action.payload.ws.readyState === 1) {
		const channel = yield call(subscribe, action.payload.ws);

		try {
			yield call(ssht_ws_request, {
				keyword: 'SendCommand',
				ws: action.payload.ws,
				data: action.payload.input,
			});

			while (true) {
				const {timeout, result} = yield race({
					timeout: delay(5000),
					result: take(channel),
				});

				if (timeout) {
					closeChannel(channel);
					console.log(action.payload.ws.readyState);
					if (action.payload.ws.readyState !== 1) {
						yield put({
							type: READY_STATE,
							payload: {uuid: action.payload.uuid},
						});
					}
				} else {
					const res = yield call(GetMessage, result);

					switch (res.type) {
						case 'COMMAND':
							if (action.payload.focus) {
								yield put({
									type: SSH_SEND_COMMAND_SUCCESS,
									payload: {
										uuid: action.payload.uuid,
										result: res.result,
										focus: action.payload.focus,
									},
								});
							} else {
								yield put({
									type: SSH_SEND_COMMAND_SUCCESS,
									payload: {
										uuid: action.payload.uuid,
										result: res.result,
									},
								});
							}
							break;

						case 'ERROR':
							break;

						default:
							break;
					}
				}
			}
		} catch (err) {
			console.log(err);
			closeChannel(channel);
		}
	}
}

function* sendWindowChange(action) {
	if (action.payload.ws.readyState === 1) {
		const channel = yield call(subscribe, action.payload.ws);

		try {
			yield call(ssht_ws_request, {
				keyword: 'SendWindowChange',
				ws: action.payload.ws,
				data: action.payload.data,
			});

			while (true) {
				const {timeout, result} = yield race({
					timeout: delay(1000),
					result: take(channel),
				});

				if (timeout) {
					closeChannel(channel);
					if (action.payload.ws.readyState !== 1) {
						yield put({
							type: READY_STATE,
							payload: {uuid: action.payload.uuid},
						});
					}
				} else {
					const res = yield call(GetMessage, result);

					switch (res.type) {
						case 'COMMAND':
							yield put({
								type: SSH_SEND_COMMAND_SUCCESS,
								payload: {
									uuid: action.payload.uuid,
									result: res.result,
								},
							});
							console.log(res.result);
							break;

						case 'ERROR':
							break;

						default:
							break;
					}
				}
			}
		} catch (err) {
			console.log(err);
			closeChannel(channel);
		}
	}
}

function* watchSendConnection() {
	yield throttle(1000, SSH_SEND_CONNECTION_REQUEST, sendConnection);
}

function* watchSendReConnection() {
	yield throttle(1000, SSH_SEND_RECONNECTION_REQUEST, sendReConnection);
}

function* watchSendDisconnection() {
	yield takeLatest(SSH_SEND_DISCONNECTION_REQUEST, sendDisconnection);
}

function* watchSendCommand() {
	yield takeLatest(SSH_SEND_COMMAND_REQUEST, sendCommand);
}

function* watchSendWindowChange() {
	yield takeEvery(SSH_SEND_WINDOW_CHANGE_REQUEST, sendWindowChange);
}

export default function* sshSage() {
	yield all([
		fork(watchSendConnection),
		fork(watchSendDisconnection),
		fork(watchSendCommand),
		fork(watchSendWindowChange),
		fork(watchSendReConnection),
	]);
}
