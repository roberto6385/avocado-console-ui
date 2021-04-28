import {
	all,
	fork,
	takeLatest,
	takeEvery,
	put,
	actionChannel,
	take,
	call,
} from 'redux-saga/effects';

import {
	SSHT_SEND_CONNECTION_REQUEST,
	SSHT_SEND_CONNECTION_SUCCESS,
	SSHT_SEND_CONNECTION_FAILURE,
	// SSHT_SEND_DISCONNECTION_REQUEST,
	// SSHT_SEND_DISCONNECTION_SUCCESS,
	// SSHT_SEND_DISCONNECTION_FAILURE,
	// SSHT_SEND_COMMAND_REQUEST,
	// SSHT_SEND_COMMAND_SUCCESS,
	// SSHT_SEND_COMMAND_FAILURE,
	// SSHT_SEND_WINDOW_CHANGE_REQUEST,
	// SSHT_SEND_WINDOW_CHANGE_SUCCESS,
	// SSHT_SEND_WINDOW_CHANGE_FAILURE,
	OPEN_TAB,
} from '../../reducers/common';
import {initChannel, initWebsocket} from './sshSocket';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {GetMessage} from '../../ws/ssht_ws_logic';

const deleteVideoAPI = () => {
	console.log('delete Video API...');
};

function* SendConnection(data) {
	const ws = yield call(initWebsocket, data.host);
	const channel = yield call(initChannel, ws);

	yield call(ssht_ws_request, {
		keyword: 'SendConnect',
		ws: ws,
		data: data,
	});

	try {
		while (true) {
			const result = yield take(channel);
			console.log(result);
			const res = yield call(GetMessage, result);
			console.log(res);
			switch (res.type) {
				case 'CONNECT':
					yield put({
						type: OPEN_TAB,
						data: {
							id: data.id,
							type: 'SSHT',
							ws: ws,
							uuid: res.result,
						},
					});

					break;
				case 'COMMAND':
					console.log(res.result);
					return {type: 'end'};
				default:
					break;
			}
		}
	} catch (err) {
		// yield put({type: SSHT_SEND_CONNECTION_FAILURE});
		console.log(err);
		return {type: 'error'};
	}
}

function* sendDisconnection(action) {}

function* SendCommand(action) {}

function* sendWindowChange(action) {}

function* watchSendConnection() {
	const requestChan = yield actionChannel(SSHT_SEND_CONNECTION_REQUEST);
	while (true) {
		const action = yield take(requestChan);
		const res = yield call(SendConnection, action.data);
		yield console.log(res);
	}
}

function* watchSendDisconnection() {
	// yield takeLatest(SSHT_SEND_DISCONNECTION_REQUEST, sendDisconnection);
}

function* watchSendCommand() {
	// yield takeEvery(SSHT_SEND_COMMAND_REQUEST, SendCommand);
}

function* watchSendWindowChange() {
	// yield takeLatest(SSHT_SEND_WINDOW_CHANGE_REQUEST, sendWindowChange);
}

export default function* sshtSage() {
	yield all([
		fork(watchSendConnection),
		fork(watchSendDisconnection),
		fork(watchSendCommand),
		fork(watchSendWindowChange),
	]);
}
