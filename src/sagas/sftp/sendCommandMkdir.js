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
	ERROR,
	MKDIR_FAILURE,
	MKDIR_REQUEST,
	MKDIR_SUCCESS,
} from '../../reducers/sftp/sftp';
import messageSender from './messageSender';
import {closeChannel, sftpSubscribe} from '../channel';
import {mkdirResponse} from '../../ws/sftp/mkdir_response';
import {commandPwdAction} from '../../reducers/sftp/list';

function* sendCommand(action) {
	const {payload} = action;

	const channel = yield call(sftpSubscribe, payload.socket);

	console.log(payload);
	yield call(messageSender, {
		keyword: 'CommandByMkdir',
		ws: payload.socket,
		path: payload.mkdir_path,
	});

	try {
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
