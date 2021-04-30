import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import {LS_FAILURE, LS_REQUEST, LS_SUCCESS} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel} from './channel';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;
	try {
		yield call(messageSender, {
			keyword: 'CommandByLs',
			ws: payload.socket,
			path: payload.path,
		});
		while (true) {
			const data = yield take(payload.channel);
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
	} catch (err) {
		console.log(err);
		yield put({type: LS_FAILURE});
		alert('에러발생 채널종료!');
		closeChannel(payload.channel);
	}
}

function* watchSendCommand() {
	yield takeEvery(LS_REQUEST, sendCommand);
}

export default function* commandLsSaga() {
	yield all([fork(watchSendCommand)]);
}
