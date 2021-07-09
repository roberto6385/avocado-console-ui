import {
	all,
	call,
	fork,
	take,
	put,
	actionChannel,
	takeLatest,
	takeEvery,
} from 'redux-saga/effects';
import messageSender from './messageSender';
import {closeChannel, fileSubscribe} from '../channel';
import {removeNewSocketResponse} from '../../ws/sftp/remove_new_socket';
import {
	REMOVE_NEW_WEBSOCKET_FAILURE,
	REMOVE_NEW_WEBSOCKET_REQUEST,
	REMOVE_NEW_WEBSOCKET_SUCCESS,
} from '../../reducers/sftp';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(fileSubscribe, payload.socket);

	try {
		yield call(messageSender, {
			keyword: 'Disconnection',
			ws: payload.socket,
		});

		while (true) {
			const data = yield take(channel);
			const res = yield call(removeNewSocketResponse, {data});
			console.log(res);
			switch (res.type) {
				case REMOVE_NEW_WEBSOCKET_SUCCESS:
					yield put({type: REMOVE_NEW_WEBSOCKET_SUCCESS});
					break;

				default:
					break;
			}
		}
	} catch (err) {
		console.log(err);
		closeChannel(channel);
		yield put({type: REMOVE_NEW_WEBSOCKET_FAILURE});
	}
}

function* watchSendCommand() {
	yield takeEvery(REMOVE_NEW_WEBSOCKET_REQUEST, sendCommand);
	// const reqChannel = yield actionChannel(REMOVE_NEW_WEBSOCKET_REQUEST);
	// while (true) {
	// 	const action = yield take(reqChannel);
	// 	yield call(sendCommand, action);
	// }
}

export default function* removeWebsocketSaga() {
	yield all([fork(watchSendCommand)]);
}
