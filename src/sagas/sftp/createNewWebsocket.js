import {
	all,
	call,
	fork,
	take,
	put,
	race,
	delay,
	takeEvery,
} from 'redux-saga/effects';
import {
	CREATE_NEW_WEBSOCKET_FAILURE,
	CREATE_NEW_WEBSOCKET_REQUEST,
	CREATE_NEW_WEBSOCKET_SUCCESS,
	ERROR,
} from '../../reducers/sftp';
import {closeChannel, subscribe} from '../channel';
import messageSender from './messageSender';
import {createWebsocket} from './socket';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {createNewSocketResponse} from '../../ws/sftp/create_new_socket';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);

	try {
		const socket = yield call(createWebsocket);
		const channel = yield call(subscribe, socket);

		yield call(messageSender, {
			keyword: 'Connection',
			ws: socket,
			data: payload,
		});

		while (true) {
			// const {timeout, data} = yield race({
			// 	timeout: delay(3000),
			// 	data: take(channel),
			// });
			// if (timeout) {
			// 	console.log(
			// 		'CREATE_NEW_WEBSOCKE 채널 사용이 없습니다. 종료합니다.',
			// 	);
			// 	closeChannel(channel);
			// } else {
			const data = yield take(channel);
			const res = yield call(createNewSocketResponse, {data});
			const uuid = res.uuid;

			switch (res.type) {
				case CREATE_NEW_WEBSOCKET_SUCCESS:
					yield put({
						type: CREATE_NEW_WEBSOCKET_SUCCESS,
						payload: {
							uuid: uuid,
							socket: socket,
						},
					});

					break;

				case ERROR:
					yield put({
						type: OPEN_ALERT_POPUP,
						data: 'invalid_server',
					});
					yield put({
						type: CREATE_NEW_WEBSOCKET_FAILURE,
						data: res.err,
					});

					break;

				default:
					break;
				// }
			}
		}
	} catch (err) {
		console.log(err);
		yield put({
			type: OPEN_ALERT_POPUP,
			data: 'invalid_server',
		});
		yield put({type: CREATE_NEW_WEBSOCKET_FAILURE, data: err});
	}
}

function* watchSendCommand() {
	yield takeEvery(CREATE_NEW_WEBSOCKET_REQUEST, sendCommand);
}

export default function* createWebsocketSaga() {
	yield all([fork(watchSendCommand)]);
}
