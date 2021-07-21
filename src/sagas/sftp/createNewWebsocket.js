import {all, call, fork, take, put, throttle} from 'redux-saga/effects';
import {
	CREATE_NEW_WEBSOCKET_FAILURE,
	CREATE_NEW_WEBSOCKET_REQUEST,
	CREATE_NEW_WEBSOCKET_SUCCESS,
	ERROR,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {createWebsocket} from './socket';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {createNewSocketResponse} from '../../ws/sftp/create_new_socket';
import {subscribe} from '../channel';

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
			// 	timeout: delay(4000),
			// 	data: take(channel),
			// });
			// if (timeout) {
			// 	closeChannel(channel);
			// } else {
			const data = yield take(channel);
			const res = yield call(createNewSocketResponse, {data});

			switch (res.type) {
				case CREATE_NEW_WEBSOCKET_SUCCESS:
					yield put({
						type: CREATE_NEW_WEBSOCKET_SUCCESS,
						payload: {
							uuid: payload.uuid,
							socket: socket,
							todo: payload.todo,
							key: payload.key,
						},
					});

					break;

				case ERROR:
					if (socket.readyState === 1) {
						yield put({
							type: OPEN_ALERT_POPUP,
							data: 'invalid_server',
						});
					}
					yield put({
						type: CREATE_NEW_WEBSOCKET_FAILURE,
						data: res.err,
					});

					break;

				default:
					break;
			}
		}
		// }
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
	yield throttle(1000, CREATE_NEW_WEBSOCKET_REQUEST, sendCommand);
}

export default function* createWebsocketSaga() {
	yield all([fork(watchSendCommand)]);
}
