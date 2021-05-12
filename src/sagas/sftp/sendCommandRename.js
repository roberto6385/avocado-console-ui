import {
	all,
	call,
	fork,
	take,
	put,
	actionChannel,
	takeLatest,
	race,
	delay,
} from 'redux-saga/effects';
import {
	commandPwdAction,
	RENAME_FAILURE,
	RENAME_REQUEST,
	RENAME_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from './channel';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;

	const channel = yield call(subscribe, payload.socket);
	yield call(messageSender, {
		keyword: 'CommandByRename',
		ws: payload.socket,
		path: `${payload.newPath}/${payload.prevName}`,
		newPath: `${payload.newPath}/${payload.nextName}`,
	});
	try {
		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(5000),
				data: take(channel),
			});
			if (timeout) {
				console.log('RENAME 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				// const data = yield take(channel);
				const res = yield call(messageReader, {data, payload});

				switch (res.type) {
					case RENAME_SUCCESS:
						yield put({
							type: RENAME_SUCCESS,
							payload: {uuid: payload.uuid},
						});
						yield put(commandPwdAction(payload));
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: RENAME_FAILURE});
	}
}

function* watchSendCommand() {
	yield takeLatest(RENAME_REQUEST, sendCommand);

	// const reqChannel = yield actionChannel(RENAME_REQUEST);
	// while (true) {
	// 	const action = yield take(reqChannel);
	// 	yield call(sendCommand, action);
	// }
}

export default function* commandRenameSaga() {
	yield all([fork(watchSendCommand)]);
}
