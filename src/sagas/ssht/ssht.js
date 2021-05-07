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
	SSHT_SEND_CONNECTION_REQUEST,
	SSHT_SEND_CONNECTION_SUCCESS,
	SSHT_SEND_CONNECTION_FAILURE,
	SSHT_WRITE_ON_TERMINAL,
	SSHT_SEND_DISCONNECTION_REQUEST,
	SSHT_SEND_DISCONNECTION_SUCCESS,
	SSHT_SEND_DISCONNECTION_FAILURE,
	SSHT_SEND_COMMAND_REQUEST,
	SSHT_SEND_COMMAND_SUCCESS,
	SSHT_SEND_COMMAND_FAILURE,
	SSHT_SEND_WINDOW_CHANGE_REQUEST,
	SSHT_SEND_WINDOW_CHANGE_SUCCESS,
	SSHT_SEND_WINDOW_CHANGE_FAILURE,
} from '../../reducers/ssht';
import {CLOSE_TAB, OPEN_TAB} from '../../reducers/common';
import {initChannel, initWebsocket} from './sshSocket';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {closeChannel} from '../sftp/channel';

function* sendConnection(action) {
	const ws = yield call(initWebsocket, action.data.host);
	const channel = yield call(initChannel, ws);
	let uuid;
	console.log(action.data);
	try {
		yield call(ssht_ws_request, {
			keyword: 'SendConnect',
			ws: ws,
			data: action.data,
		});

		while (true) {
			const result = yield take(channel);
			const res = yield call(GetMessage, result);
			console.log(res);
			switch (res.type) {
				case 'CONNECT':
					uuid = res.result;
					yield put({
						type: SSHT_SEND_CONNECTION_SUCCESS,
						data: {
							uuid: uuid,
							ws: ws,
						},
					});
					yield put({
						type: OPEN_TAB,
						data: {
							uuid: uuid,
							type: 'SSHT',
							server: {
								id: action.data.id,
								name: action.data.name,
							},
						},
					});

					break;
				case 'COMMAND':
					yield put({
						type: SSHT_WRITE_ON_TERMINAL,
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
		yield put({type: SSHT_SEND_CONNECTION_FAILURE});
	}
}

function* sendDisconnection(action) {
	const channel = yield call(initChannel, action.data.ws);

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
					yield put({type: CLOSE_TAB, data: action.data.uuid});
					yield put({
						type: SSHT_SEND_DISCONNECTION_SUCCESS,
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
		yield put({type: SSHT_SEND_CONNECTION_FAILURE});
	}
}

function* sendCommand(action) {
	const channel = yield call(initChannel, action.data.ws);

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
						type: SSHT_WRITE_ON_TERMINAL,
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
		yield put({type: SSHT_SEND_COMMAND_FAILURE});
	}
}

function* sendWindowChange(action) {
	const channel = yield call(initChannel, action.data.ws);

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
						type: SSHT_WRITE_ON_TERMINAL,
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
		yield put({type: SSHT_SEND_WINDOW_CHANGE_FAILURE});
	}
}

function* watchSendConnection() {
	yield takeLatest(SSHT_SEND_CONNECTION_REQUEST, sendConnection);
}

function* watchSendDisconnection() {
	yield takeLatest(SSHT_SEND_DISCONNECTION_REQUEST, sendDisconnection);
}

function* watchSendCommand() {
	yield takeEvery(SSHT_SEND_COMMAND_REQUEST, sendCommand);

	// const reqChannel = yield actionChannel(SSHT_SEND_COMMAND_REQUEST);
	// while (true) {
	// 	const action = yield take(reqChannel);
	// 	yield call(sendCommand, action);
	// }
}

function* watchSendWindowChange() {
	yield takeEvery(SSHT_SEND_WINDOW_CHANGE_REQUEST, sendWindowChange);
}

export default function* sshtSage() {
	yield all([
		fork(watchSendConnection),
		fork(watchSendDisconnection),
		fork(watchSendCommand),
		fork(watchSendWindowChange),
	]);
}
