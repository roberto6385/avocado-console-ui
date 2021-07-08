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

import {closeChannel} from '../channel';
import {mkdirResponse} from '../../ws/sftp/mkdir_response';
import useSubscribe from '../../hooks/useSubscribe';

function* sendCommand(action) {
	const {payload} = action;

	const channel = yield call(useSubscribe, {
		socket: payload.socket,
		dispatch: () =>
			payload.dispatch({
				type: READY_STATE,
				payload: {uuid: payload.uuid},
			}),
	});

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
				console.log('PWD 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
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
								dispatch: payload.dispatch,
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
