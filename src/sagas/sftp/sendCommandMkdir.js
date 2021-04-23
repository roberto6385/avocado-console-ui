import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	commandPwdAction,
	MKDIR_FAILURE,
	MKDIR_REQUEST,
	MKDIR_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;

	const channel = yield call(subscribe, payload.socket);
	yield call(sftp_ws, {
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
					yield put(commandPwdAction(payload));
					return {type: 'end'};
			}
		}
	} catch (err) {
		yield put({type: MKDIR_FAILURE});
		console.log(err);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(MKDIR_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		const res = yield call(sendCommand, action);
		yield console.log(res);
	}
}

export default function* commandMkdirSaga() {
	yield all([fork(watchSendCommand)]);
}
