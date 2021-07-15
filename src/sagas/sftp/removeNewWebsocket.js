import {
	all,
	call,
	fork,
	take,
	put,
	takeLatest,
	race,
	delay,
	takeEvery,
} from 'redux-saga/effects';
import messageSender from './messageSender';
import {closeChannel, fileSubscribe} from '../channel';
import {removeNewSocketResponse} from '../../ws/sftp/remove_new_socket';
import {
	ADD_PAUSED_LIST,
	EDIT_PAUSED_LIST,
	READ_SUCCESS,
	REMOVE_NEW_WEBSOCKET_FAILURE,
	REMOVE_NEW_WEBSOCKET_REQUEST,
	REMOVE_NEW_WEBSOCKET_SUCCESS,
	SHIFT_SOCKETS,
	WRITE_SUCCESS,
} from '../../reducers/sftp';
import {write_chunkSize} from '../../reducers/sftp';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(fileSubscribe, payload.socket);

	if (payload.socket.readyState === 3) {
		console.log('already socket is closing');
		return;
	}

	try {
		console.log(payload.socket);
		yield call(messageSender, {
			keyword: 'Disconnection',
			ws: payload.socket,
		});

		while (true) {
			// const {timeout, data} = yield race({
			// 	timeout: delay(5000),
			// 	data: take(channel),
			// });
			// if (timeout) {
			// 	closeChannel(channel);
			// 	console.log('remove new websocket end');
			// } else {
			const data = yield take(channel);
			const res = yield call(removeNewSocketResponse, {data});
			console.log(res);
			switch (res.type) {
				case REMOVE_NEW_WEBSOCKET_SUCCESS:
					yield put({type: REMOVE_NEW_WEBSOCKET_SUCCESS});

					break;

				case WRITE_SUCCESS:
					console.log('WRITE_SUCCESS!!!');

					yield take(ADD_PAUSED_LIST);
					yield put({
						type: EDIT_PAUSED_LIST,
						payload: {
							uuid: payload.uuid,
							data: {
								todo: payload.todo,
								path: payload.path,
								file: payload.file,
							},
							newOffset: write_chunkSize,
						},
					});
					break;

				case READ_SUCCESS:
					console.log('READ_SUCCESS!!!');
					yield take(ADD_PAUSED_LIST);

					// yield put({
					// 	type: EDIT_PAUSED_LIST,
					// 	payload: {
					// 		uuid: payload.uuid,
					// 		data: {
					// 			todo: payload.todo,
					// 			path: payload.path,
					// 			file: payload.file,
					// 		},
					// 		newOffset: read_chunkSize,
					// 	},
					// });
					break;
				default:
					break;
				// }
			}
		}
	} catch (err) {
		console.log(err);
		closeChannel(channel);
		yield put({type: REMOVE_NEW_WEBSOCKET_FAILURE});
	} finally {
		console.log(payload);
		payload.socket.close();
		yield put({
			type: SHIFT_SOCKETS,
			payload: {uuid: payload.uuid, todo: payload.todo},
		});
	}
}

function* watchSendCommand() {
	yield takeEvery(REMOVE_NEW_WEBSOCKET_REQUEST, sendCommand);
}

export default function* removeWebsocketSaga() {
	yield all([fork(watchSendCommand)]);
}
