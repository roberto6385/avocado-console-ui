import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
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
import useSubscribe from '../../hooks/useSubscribe';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);

	try {
		const socket = yield call(createWebsocket);
		const channel = yield call(useSubscribe, {
			socket,
			dispatch: () =>
				console.log('최초 연결시 끊김 체크는 다른 방법을 사용해야 함'),
		});

		yield call(messageSender, {
			keyword: 'Connection',
			ws: socket,
			data: payload,
		});

		while (true) {
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
