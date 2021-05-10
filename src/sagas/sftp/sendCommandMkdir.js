import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import {
	commandPwdAction,
	MKDIR_FAILURE,
	MKDIR_REQUEST,
	MKDIR_SUCCESS,
	SAVE_TEMP_PATH,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {subscribe} from './channel';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;

	const channel = yield call(subscribe, payload.socket);

	console.log(payload);
	yield call(messageSender, {
		keyword: 'CommandByMkdir',
		ws: payload.socket,
		path: payload.newPath,
	});

	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, {data, payload});

			switch (res.type) {
				case MKDIR_SUCCESS:
					yield put({
						type: MKDIR_SUCCESS,
						payload: {
							uuid: payload.uuid,
						},
					});
					yield put({
						type: SAVE_TEMP_PATH,
						payload: {
							uuid: payload.uuid,
							path: '',
						},
					});
					yield put(commandPwdAction(payload));
					break;
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: MKDIR_FAILURE});
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(MKDIR_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		yield call(sendCommand, action);
	}
}

export default function* commandMkdirSaga() {
	yield all([fork(watchSendCommand)]);
}
