import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import {
	commandPwdAction,
	RENAME_FAILURE,
	RENAME_REQUEST,
	RENAME_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {subscribe} from './channel';
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
			const data = yield take(channel);
			const res = yield call(messageReader, {data, payload});

			switch (res.type) {
				case RENAME_SUCCESS:
					yield put({
						type: RENAME_SUCCESS,
						payload: {uuid: payload.uuid},
					});
					yield put(commandPwdAction(payload));
					return {type: 'end'};
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: RENAME_FAILURE});
		return {type: 'error'};
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(RENAME_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		const res = yield call(sendCommand, action);
		yield console.log(res);
	}
}

export default function* commandRenameSaga() {
	yield all([fork(watchSendCommand)]);
}
