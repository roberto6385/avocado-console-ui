import {
	all,
	fork,
	put,
	takeLatest,
	call,
	throttle,
	takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';

import {
	SSHT_SEND_CONNECTION_REQUEST,
	SSHT_SEND_CONNECTION_SUCCESS,
	SSHT_SEND_CONNECTION_FAILURE,
	SSHT_SEND_DISCONNECTION_REQUEST,
	SSHT_SEND_DISCONNECTION_SUCCESS,
	SSHT_SEND_DISCONNECTION_FAILURE,
	SSHT_SEND_COMMAND_REQUEST,
	SSHT_SEND_COMMAND_SUCCESS,
	SSHT_SEND_COMMAND_FAILURE,
	SSHT_SEND_WINDOW_CHANGE_REQUEST,
	SSHT_SEND_WINDOW_CHANGE_SUCCESS,
	SSHT_SEND_WINDOW_CHANGE_FAILURE,
} from '../reducers/ssht';

function* SendConnection(action) {
	try {
		// const result = yield call(deleteVideoAPI, action.data);
		// yield put({
		// 	type: SSHT_SEND_CONNECTION_SUCCESS,
		// 	data: result.data,
		// });
	} catch (err) {
		// console.error(err);
		// yield put({
		// 	type: SSHT_SEND_CONNECTION_FAILURE,
		// 	error: err.response.data,
		// });
	}
}

function* sendDisconnection(action) {
	// try {
	// 	const result = yield call(deleteVideoAPI, action.data);
	// 	yield put({
	// 		type: SSHT_SEND_CONNECTION_SUCCESS,
	// 		data: result.data,
	// 	});
	// } catch (err) {
	// 	console.error(err);
	// 	yield put({
	// 		type: SSHT_SEND_CONNECTION_FAILURE,
	// 		error: err.response.data,
	// 	});
	// }
}

function* SendCommand(action) {
	// try {
	// 	const result = yield call(deleteVideoAPI, action.data);
	// 	yield put({
	// 		type: SSHT_SEND_COMMAND_SUCCESS,
	// 		data: result.data,
	// 	});
	// } catch (err) {
	// 	console.error(err);
	// 	yield put({
	// 		type: SSHT_SEND_COMMAND_FAILURE,
	// 		error: err.response.data,
	// 	});
	// }
}

function* sendWindowChange(action) {
	// try {
	// 	const result = yield call(deleteVideoAPI, action.data);
	// 	yield put({
	// 		type: SSHT_SEND_COMMAND_SUCCESS,
	// 		data: result.data,
	// 	});
	// } catch (err) {
	// 	console.error(err);
	// 	yield put({
	// 		type: SSHT_SEND_COMMAND_FAILURE,
	// 		error: err.response.data,
	// 	});
	// }
}

function* watchSendConnection() {
	yield takeEvery(SSHT_SEND_CONNECTION_REQUEST, SendConnection);
}

function* watchSendDisconnection() {
	yield takeLatest(SSHT_SEND_DISCONNECTION_REQUEST, sendDisconnection);
}

function* watchSendCommand() {
	yield takeEvery(SSHT_SEND_COMMAND_REQUEST, SendCommand);
}

function* watchSendWindowChange() {
	yield takeLatest(SSHT_SEND_WINDOW_CHANGE_REQUEST, sendWindowChange);
}

export default function* sshtSage() {
	yield all([
		fork(watchSendConnection),
		fork(watchSendDisconnection),
		fork(watchSendCommand),
		fork(watchSendWindowChange),
	]);
}
