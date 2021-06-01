import {
	all,
	fork,
	put,
	take,
	call,
	takeLatest,
	takeEvery,
} from 'redux-saga/effects';

import {
	SSH_SEND_CONNECTION_REQUEST,
	SSH_SEND_CONNECTION_SUCCESS,
	SSH_SEND_CONNECTION_FAILURE,
	SSH_SEND_DISCONNECTION_REQUEST,
	SSH_SEND_DISCONNECTION_SUCCESS,
	SSH_SEND_COMMAND_REQUEST,
	SSH_SEND_COMMAND_SUCCESS,
	SSH_SEND_COMMAND_FAILURE,
	SSH_SEND_WINDOW_CHANGE_REQUEST,
	SSH_SEND_WINDOW_CHANGE_FAILURE,
} from '../../reducers/ssh';
import {CLOSE_TAB, OPEN_TAB} from '../../reducers/common';
import {initWebsocket} from './socket';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {closeChannel, subscribe} from '../channel';

function* sendConnection(action) {
	const ws = yield call(initWebsocket, action.data.host);
	const channel = yield call(subscribe, ws);
	let uuid;

	try {
		yield call(ssht_ws_request, {
			keyword: 'SendConnect',
			ws: ws,
			data: action.data,
		});

		while (true) {
			const result = yield take(channel);
			const res = yield call(GetMessage, result);

			switch (res.type) {
				case 'CONNECT':
					uuid = res.result;
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
							},
						},
					});

					break;
				case 'COMMAND':
					yield put({
						type: SSH_SEND_COMMAND_SUCCESS,
						data: {
							uuid: uuid,
							result: res.result,
						},
					});
					break;
				default:
					break;
			}
		}
	} catch (err) {
		console.log(err);
		closeChannel(channel);
		yield put({type: SSH_SEND_CONNECTION_FAILURE, data: err});
	}
}

function* sendDisconnection(action) {
	const channel = yield call(subscribe, action.data.ws);

	try {
		yield call(ssht_ws_request, {
			keyword: 'SendDisconnect',
			ws: action.data.ws,
		});

		while (true) {
			const result = yield take(channel);
			const res = yield call(GetMessage, result);

			switch (res.type) {
				case 'DISCONNECT':
					//TODO: 우선은 finally에 구현
					break;
				default:
					break;
			}
		}
	} catch (err) {
		console.log(err);
		closeChannel(channel);
	} finally {
		yield put({type: CLOSE_TAB, data: action.data.uuid});
		yield put({
			type: SSH_SEND_DISCONNECTION_SUCCESS,
			data: action.data.uuid,
		});
	}
}

function* sendCommand(action) {
	const channel = yield call(subscribe, action.data.ws);

	try {
		yield call(ssht_ws_request, {
			keyword: 'SendCommand',
			ws: action.data.ws,
			data: action.data.input,
		});

		while (true) {
			const result = yield take(channel);
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
					break;
				default:
					break;
			}
		}
	} catch (err) {
		console.log(err);
		closeChannel(channel);
		yield put({type: SSH_SEND_COMMAND_FAILURE});
	}
}

function* sendWindowChange(action) {
	const channel = yield call(subscribe, action.data.ws);

	try {
		yield call(ssht_ws_request, {
			keyword: 'SendWindowChange',
			ws: action.data.ws,
			data: action.data.data,
		});

		while (true) {
			const result = yield take(channel);
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
					break;
				default:
					break;
			}
		}
	} catch (err) {
		console.log(err);
		closeChannel(channel);
		yield put({type: SSH_SEND_WINDOW_CHANGE_FAILURE});
	}
}

function* watchSendConnection() {
	yield takeLatest(SSH_SEND_CONNECTION_REQUEST, sendConnection);
}

function* watchSendDisconnection() {
	yield takeLatest(SSH_SEND_DISCONNECTION_REQUEST, sendDisconnection);
}

function* watchSendCommand() {
	yield takeEvery(SSH_SEND_COMMAND_REQUEST, sendCommand);
}

function* watchSendWindowChange() {
	yield takeLatest(SSH_SEND_WINDOW_CHANGE_REQUEST, sendWindowChange);
}

export default function* sshtSage() {
	yield all([
		fork(watchSendConnection),
		fork(watchSendDisconnection),
		fork(watchSendCommand),
		fork(watchSendWindowChange),
	]);
}