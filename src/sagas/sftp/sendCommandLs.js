import {
	all,
	call,
	fork,
	take,
	put,
	takeEvery,
	race,
	delay,
} from 'redux-saga/effects';
import {LS_FAILURE, LS_REQUEST, LS_SUCCESS} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from './channel';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);
	// 현재 드롭 리스트에 필요한 모든 경로를 개별 탐색하므로 경로당 채널 생성 발생.
	// 채널을 하나만 사용하는 방향으로 수정 필요.

	try {
		yield call(messageSender, {
			keyword: 'CommandByLs',
			ws: payload.socket,
			path: payload.path,
		});
		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(30000),
				data: take(channel),
			});
			if (timeout) {
				console.log('LS 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				const res = yield call(messageReader, {data, payload});
				switch (res.type) {
					case LS_SUCCESS:
						yield put({
							type: LS_SUCCESS,
							payload: {
								uuid: payload.uuid,
								fileList: res.fileList,
							},
						});
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: LS_FAILURE});
		alert('LS 에러발생 채널종료!');
		closeChannel(channel);
	}
}

function* watchSendCommand() {
	yield takeEvery(LS_REQUEST, sendCommand);
}

export default function* commandLsSaga() {
	yield all([fork(watchSendCommand)]);
}
