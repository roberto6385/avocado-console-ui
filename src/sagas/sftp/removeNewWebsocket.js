import {
	all,
	call,
	fork,
	take,
	put,
	race,
	delay,
	actionChannel,
} from 'redux-saga/effects';
import {
	REMOVE_NEW_WEBSOCKET_FAILURE,
	REMOVE_NEW_WEBSOCKET_SUCCESS,
	ERROR,
	REMOVE_NEW_WEBSOCKET_REQUEST,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from '../channel';
import {removeNewSocketResponse} from '../../ws/sftp/remove_new_socket';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);

	try {
		messageSender({
			keyword: 'Disconnection',
			ws: payload.socket,
		});

		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(5000),
				data: take(channel),
			});
			if (timeout) {
				console.log(
					'REMOVE_NEW_WEBSOCKET 채널 사용이 없습니다. 종료합니다.',
				);
				closeChannel(channel);
			} else {
				const res = yield call(removeNewSocketResponse, {data});
				console.log(res);
				switch (res.type) {
					case REMOVE_NEW_WEBSOCKET_SUCCESS:
						console.log('remove websocket success!');
						break;

					case ERROR:
						console.log(res.err);
						break;
				}
			}
		}
	} catch (err) {
		yield put({type: REMOVE_NEW_WEBSOCKET_FAILURE});
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
