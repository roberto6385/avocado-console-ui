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
	SSH_SEND_COMMAND_FAILURE,
	SSH_SEND_WINDOW_CHANGE_REQUEST,
	SSH_SEND_WINDOW_CHANGE_FAILURE,
	SSH_SEND_RECONNECTION_REQUEST,
	SSH_SEND_RECONNECTION_SUCCESS,
} from '../../reducers/ssh';
import {CLOSE_TAB, OPEN_TAB} from '../../reducers/common';
import {initWebsocket} from './socket';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {closeChannel, subscribe} from '../channel';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {READY_STATE} from '../../reducers/ssh';
import base64 from 'base-64';
import {REFRESH_USER_TICKET_REQUEST} from '../../reducers/auth/userTicket';

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
				data: action.data,
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
									data: {
										uuid: uuid,
										ws: ws,
									},
								});
								yield put({
									type: OPEN_TAB,
									data: {
										uuid: uuid,
										type: 'SSH',
										server: {
											id: action.data.id,
											name: action.data.name,
											key: action.data.key,
										},
									},
								});
							}
							yield put({
								type: SSH_SEND_COMMAND_SUCCESS,
								data: {
									uuid: uuid,
									result: res.result,
								},
							});
							break;

						case 'ERROR':
							yield put({type: CLOSE_TAB, data: uuid});
							yield put({
								type: SSH_SEND_DISCONNECTION_SUCCESS,
								data: uuid,
							});

							//invalid server
							if (res.result.includes('connection')) {
								yield put({
									type: OPEN_ALERT_POPUP,
									data: 'invalid_server',
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
		}
	} catch (err) {
		console.log(err);
		yield put({type: CLOSE_TAB, data: uuid});
		yield put({
			type: SSH_SEND_DISCONNECTION_SUCCESS,
			data: uuid,
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
			data: action.data,
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
								data: action.data.prevUuid,
							});
							yield put({
								type: SSH_SEND_RECONNECTION_SUCCESS,
								data: {
									uuid: uuid,
									prevUuid: action.data.prevUuid,
									ws: ws,
								},
							});
							yield put({
								type: OPEN_TAB,
								data: {
									uuid: uuid,
									type: 'SSH',
									server: {
										id: action.data.id,
										name: action.data.name,
										key: action.data.key,
									},
									prevUuid: action.data.prevUuid,
									prevIndex: action.data.prevIndex,
								},
							});
						}
						yield put({
							type: SSH_SEND_COMMAND_SUCCESS,
							data: {
								uuid: uuid,
								result: res.result,
							},
						});

						break;

					case 'ERROR':
						yield put({type: CLOSE_TAB, data: uuid});
						yield put({
							type: SSH_SEND_DISCONNECTION_SUCCESS,
							data: uuid,
						});
						//invalid server
						if (res.result.includes('connection')) {
							yield put({
								type: OPEN_ALERT_POPUP,
								data: 'invalid_server',
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
		yield put({type: CLOSE_TAB, data: uuid});
		yield put({
			type: SSH_SEND_DISCONNECTION_SUCCESS,
			data: uuid,
		});
	}
}

function* sendDisconnection(action) {
	const channel = yield call(subscribe, action.data.ws);

	try {
		if (action.data.ws.readyState !== 1) {
			yield put({type: CLOSE_TAB, data: action.data.uuid});
			yield put({
				type: SSH_SEND_DISCONNECTION_SUCCESS,
				data: action.data.uuid,
			});
			return;
		}

		yield call(ssht_ws_request, {
			keyword: 'SendDisconnect',
			ws: action.data.ws,
		});

		while (true) {
			const data = yield take(channel);
			const res = yield call(GetMessage, data);
			switch (res.type) {
				case 'DISCONNECT':
					yield put({type: CLOSE_TAB, data: action.data.uuid});
					yield put({
						type: SSH_SEND_DISCONNECTION_SUCCESS,
						data: action.data.uuid,
					});
					break;

				case 'ERROR':
					yield put({type: CLOSE_TAB, data: action.data.uuid});
					yield put({
						type: SSH_SEND_DISCONNECTION_SUCCESS,
						data: action.data.uuid,
					});
					break;

				default:
					break;
			}
		}
	} catch (err) {
		console.log(err);
		closeChannel(channel);
		yield put({type: CLOSE_TAB, data: action.data.uuid});
		yield put({
			type: SSH_SEND_DISCONNECTION_SUCCESS,
			data: action.data.uuid,
		});
	}
}

function* sendCommand(action) {
	if (action.data.ws.readyState === 1) {
		const channel = yield call(subscribe, action.data.ws);

		try {
			yield call(ssht_ws_request, {
				keyword: 'SendCommand',
				ws: action.data.ws,
				data: action.data.input,
			});

			while (true) {
				const {timeout, result} = yield race({
					timeout: delay(5000),
					result: take(channel),
				});

				if (timeout) {
					closeChannel(channel);
					console.log(action.data.ws.readyState);
					if (action.data.ws.readyState !== 1) {
						yield put({
							type: READY_STATE,
							data: {uuid: action.data.uuid},
						});
					}
				} else {
					const res = yield call(GetMessage, result);

					switch (res.type) {
						case 'COMMAND':
							if (action.data.focus) {
								yield put({
									type: SSH_SEND_COMMAND_SUCCESS,
									data: {
										uuid: action.data.uuid,
										result: res.result,
										focus: action.data.focus,
									},
								});
							} else {
								yield put({
									type: SSH_SEND_COMMAND_SUCCESS,
									data: {
										uuid: action.data.uuid,
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
	if (action.data.ws.readyState === 1) {
		const channel = yield call(subscribe, action.data.ws);

		try {
			yield call(ssht_ws_request, {
				keyword: 'SendWindowChange',
				ws: action.data.ws,
				data: action.data.data,
			});

			while (true) {
				const {timeout, result} = yield race({
					timeout: delay(1000),
					result: take(channel),
				});

				if (timeout) {
					closeChannel(channel);
					if (action.data.ws.readyState !== 1) {
						yield put({
							type: READY_STATE,
							data: {uuid: action.data.uuid},
						});
					}
				} else {
					const res = yield call(GetMessage, result);

					switch (res.type) {
						case 'COMMAND':
							yield put({
								type: SSH_SEND_COMMAND_SUCCESS,
								data: {
									uuid: action.data.uuid,
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

export default function* sshtSage() {
	yield all([
		fork(watchSendConnection),
		fork(watchSendDisconnection),
		fork(watchSendCommand),
		fork(watchSendWindowChange),
		fork(watchSendReConnection),
	]);
}
