import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import messageSender from './messageSender';
import {closeChannel, subscribe} from '../channel';
import {removeNewSocketResponse} from '../../ws/sftp/remove_new_socket';
import {
	REMOVE_NEW_WEBSOCKET_FAILURE,
	REMOVE_NEW_WEBSOCKET_REQUEST,
	REMOVE_NEW_WEBSOCKET_SUCCESS,
} from '../../reducers/sftp/crud';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);

	try {
		yield call(messageSender, {
			keyword: 'Disconnection',
			ws: payload.socket,
		});

		while (true) {
			const data = yield take(channel);
			const res = yield call(removeNewSocketResponse, {data});
			console.log(res);
			yield put({type: REMOVE_NEW_WEBSOCKET_SUCCESS});
		}
	} catch (err) {
		yield put({type: REMOVE_NEW_WEBSOCKET_FAILURE});
		closeChannel(channel);
		console.log(err);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(REMOVE_NEW_WEBSOCKET_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		yield call(sendCommand, action);
	}
}

export default function* removeWebsocketSaga() {
	yield all([fork(watchSendCommand)]);
}
