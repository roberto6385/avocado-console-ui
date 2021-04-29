import {
	all,
	call,
	fork,
	take,
	put,
	actionChannel,
	race,
	delay,
} from 'redux-saga/effects';
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
	try {
		const {payload} = action;
		console.log(payload);
		const channel = yield call(subscribe, payload.socket);
		yield call(messageSender, {
			keyword: 'CommandByCd',
			ws: payload.socket,
			path: payload.newPath,
		});

		const {timeout, data} = yield race({
			timeout: delay(1000),
			data: take(channel),
		});
		if (timeout) {
			alert('해당 경로는 존재하지 않습니다.');
		} else {
			const res = yield call(messageReader, {data, payload});
			console.log(res);
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
		console.log(err);
		yield put({type: CD_FAILURE});
		return {type: 'error'};
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
