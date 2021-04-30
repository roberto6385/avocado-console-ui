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
	ADD_HIGHLIGHT,
	CD_FAILURE,
	CD_REQUEST,
	CD_SUCCESS,
	commandPwdAction,
	REMOVE_HIGHLIGHT,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from './channel';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);
	const channel = yield call(subscribe, payload.socket);

	yield call(messageSender, {
		keyword: 'CommandByCd',
		ws: payload.socket,
		path: payload.newPath,
	});

	try {
		const data = yield take(channel);
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
		// const {timeout, data} = yield race({
		// 	timeout: delay(10000),
		// 	data: take(channel),
		// });
		// if (timeout) {
		// 	alert('경로 탐색에 실패하였습니다.');
		// 	return {type: 'timeover'};
		// } else {
		// 	const res = yield call(messageReader, {data, payload});
		// 	console.log(res);
		// 	switch (res.type) {
		// 		case CD_SUCCESS:
		// 			yield put({
		// 				type: CD_SUCCESS,
		// 				payload: {uuid: payload.uuid},
		// 			});
		//
		// 			yield put(commandPwdAction(payload));
		// 			return {type: 'end'};
		// 	}
		// }
	} catch (err) {
		console.log(err);
		yield put({type: CD_FAILURE});
		closeChannel(channel);
		return {type: 'error'};
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(CD_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		yield call(sendCommand, action);
	}
}

export default function* commandCdSaga() {
	yield all([fork(watchSendCommand)]);
}
