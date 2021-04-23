import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import {
	CD_FAILURE,
	CD_REQUEST,
	CD_SUCCESS,
	commandPwdAction,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {subscribe} from './channel';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);
	yield call(messageSender, {
		keyword: 'CommandByCd',
		ws: payload.socket,
		path: payload.newPath,
	});

	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, {data, payload});

			switch (res.type) {
				case CD_SUCCESS:
					yield put({
						type: CD_SUCCESS,
						payload: {uuid: payload.uuid},
					});
					yield put(commandPwdAction(payload));
					return {type: 'end'};
			}
		}
	} catch (err) {
		yield put({type: CD_FAILURE});
		console.log(err);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(CD_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		const res = yield call(sendCommand, action);
		yield console.log(res);
	}
}

export default function* commandCdSaga() {
	yield all([fork(watchSendCommand)]);
}
