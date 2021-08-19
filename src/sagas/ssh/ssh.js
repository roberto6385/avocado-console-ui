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

import {sshAction} from '../../reducers/ssh';
import {initWebsocket} from './socket';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {closeChannel, subscribe} from '../channel';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {tabBarAction} from '../../reducers/tabBar';

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
								yield put(
									sshAction.connectSuccess({
										uuid: uuid,
										ws: ws,
									}),
								);
								yield put(
									tabBarAction.addTab({
										uuid: uuid,
										type: 'SSH',
										server: {
											id: action.payload.id,
											name: action.payload.name,
											key: action.payload.key,
										},
									}),
								);
							}
							yield put(
								sshAction.sendCommandSuccess({
									uuid: uuid,
									result: res.result,
								}),
							);
							break;

						case 'ERROR':
							yield put(tabBarAction.deleteTab(uuid));
							yield put(sshAction.disconnectSuccess(uuid));

							//invalid server
							if (res.result.includes('connection')) {
								yield put(
									dialogBoxAction.openAlert({
										key: 'invalid-server',
									}),
								);
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
		yield put(tabBarAction.deleteTab(uuid));
		yield put(sshAction.disconnectSuccess(uuid));
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
							yield put(
								tabBarAction.deleteTab(action.payload.prevUuid),
							);

							yield put(
								sshAction.reconnectSuccess({
									uuid: uuid,
									prevUuid: action.payload.prevUuid,
									ws: ws,
								}),
							);
							yield put(
								tabBarAction.addTab({
									uuid: uuid,
									type: 'SSH',
									server: {
										id: action.payload.id,
										name: action.payload.name,
										key: action.payload.key,
									},
									prevUuid: action.payload.prevUuid,
									prevIndex: action.payload.prevIndex,
								}),
							);
						}
						yield put(
							sshAction.sendCommandSuccess({
								uuid: uuid,
								result: res.result,
							}),
						);

						break;

					case 'ERROR':
						yield put(tabBarAction.deleteTab(uuid));
						yield put(sshAction.disconnectSuccess(uuid));

						//invalid server
						if (res.result.includes('connection')) {
							yield put(
								dialogBoxAction.openAlert({
									key: 'invalid-server',
								}),
							);
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
		yield put(tabBarAction.deleteTab(uuid));
		yield put(sshAction.disconnectSuccess(uuid));
	}
}

function* sendDisconnection(action) {
	const channel = yield call(subscribe, action.payload.ws);

	try {
		if (action.payload.ws.readyState !== 1) {
			yield put(tabBarAction.deleteTab(action.payload.uuid));
			yield put(sshAction.disconnectSuccess(action.payload.uuid));

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
					yield put(tabBarAction.deleteTab(action.payload.uuid));
					yield put(sshAction.disconnectSuccess(action.payload.uuid));

					break;

				case 'ERROR':
					yield put(tabBarAction.deleteTab(action.payload.uuid));
					yield put(sshAction.disconnectSuccess(action.payload.uuid));

					break;

				default:
					break;
			}
		}
	} catch (err) {
		console.log(err);
		closeChannel(channel);
		yield put(tabBarAction.deleteTab(action.payload.uuid));
		yield put(sshAction.disconnectSuccess(action.payload.uuid));
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
						yield put(
							sshAction.setReadyState({
								uuid: action.payload.uuid,
							}),
						);
					}
				} else {
					const res = yield call(GetMessage, result);

					switch (res.type) {
						case 'COMMAND':
							if (action.payload.focus) {
								yield put(
									sshAction.sendCommandSuccess({
										uuid: action.payload.uuid,
										result: res.result,
										focus: action.payload.focus,
									}),
								);
							} else {
								yield put(
									sshAction.sendCommandSuccess({
										uuid: action.payload.uuid,
										result: res.result,
									}),
								);
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
						yield put(
							sshAction.setReadyState({
								uuid: action.payload.uuid,
							}),
						);
					}
				} else {
					const res = yield call(GetMessage, result);

					switch (res.type) {
						case 'COMMAND':
							yield put(
								sshAction.sendCommandSuccess({
									uuid: action.payload.uuid,
									result: res.result,
								}),
							);
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
	yield throttle(1000, sshAction.connectRequest, sendConnection);
}

function* watchSendReConnection() {
	yield throttle(1000, sshAction.reconnectRequest, sendReConnection);
}

function* watchSendDisconnection() {
	yield takeLatest(sshAction.disconnectRequest, sendDisconnection);
}

function* watchSendCommand() {
	yield takeLatest(sshAction.sendCommandRequest, sendCommand);
}

function* watchSendWindowChange() {
	yield takeEvery(sshAction.windowChangeRequest, sendWindowChange);
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
