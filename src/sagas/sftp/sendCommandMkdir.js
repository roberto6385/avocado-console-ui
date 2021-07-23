import {
	all,
	call,
	fork,
	take,
	put,
	takeLatest,
	race,
	delay,
} from 'redux-saga/effects';
import {
	commandPwdAction,
	ERROR,
	MKDIR_FAILURE,
	MKDIR_REQUEST,
	MKDIR_SUCCESS,
	READY_STATE,
} from '../../reducers/sftp';
import messageSender from './messageSender';

import {closeChannel, subscribe} from '../channel';
import {mkdirResponse} from '../../ws/sftp/mkdir_response';

function* sendCommand(action) {
	const {payload} = action;

	if (payload.socket.readyState === 3) {
		console.log('already socket is closing');
		return;
	}

	const channel = yield call(subscribe, payload.socket);

	try {
		yield call(messageSender, {
			keyword: 'CommandByMkdir',
			ws: payload.socket,
			path: payload.mkdir_path,
		});

		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(5000),
				data: take(channel),
			});
			if (timeout) {
				closeChannel(channel);
				if (payload.socket.readyState !== 1) {
					yield put({
						type: READY_STATE,
						payload: {uuid: payload.uuid},
					});
				}
			} else {
				const res = yield call(mkdirResponse, {data});

				switch (res.type) {
					case MKDIR_SUCCESS:
						yield put({
							type: MKDIR_SUCCESS,
							payload: {
								uuid: payload.uuid,
							},
						});

						yield put(
							commandPwdAction({
								socket: payload.socket,
								uuid: payload.uuid,
								pwd_path: payload.path,
							}),
						);
						break;

					case ERROR:
						console.log(res.err);
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: MKDIR_FAILURE});
	}
}

function* watchSendCommand() {
	yield takeLatest(MKDIR_REQUEST, sendCommand);
}

export default function* commandMkdirSaga() {
	yield all([fork(watchSendCommand)]);
}
