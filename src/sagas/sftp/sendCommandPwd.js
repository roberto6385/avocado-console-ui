import {
	all,
	call,
	fork,
	take,
	put,
	race,
	delay,
	takeEvery,
	actionChannel,
} from 'redux-saga/effects';
import {
	commandLsAction,
	PUT_REQUEST,
	PWD_FAILURE,
	PWD_REQUEST,
	PWD_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {messageReader} from './messageReader';
import {closeChannel, subscribe} from './channel';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);
	console.log('다시 요청!');
	try {
		yield call(messageSender, {
			keyword: 'CommandByPwd',
			ws: payload.socket,
		});

		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(3000),
				data: take(channel),
			});
			if (timeout) {
				console.log('PWD 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				const res = yield call(messageReader, {data, payload});
				switch (res.type) {
					case PWD_SUCCESS:
						console.log(res.path);
						console.log(res.pathList);
						yield put({
							type: PWD_SUCCESS,
							payload: {
								uuid: payload.uuid,
								path: res.path,
								pathList: res.pathList,
							},
						});
						for (let value of res.pathList) {
							yield put(
								commandLsAction({
									...payload,
									path: value,
								}),
							);
						}
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: PWD_FAILURE});
		alert('PWD 에러발생 채널종료!');
		closeChannel(channel);
	}
}

function* watchSendCommand() {
	yield takeEvery(PWD_REQUEST, sendCommand);
	// const reqChannel = yield actionChannel(PWD_REQUEST);
	// while (true) {
	// 	const action = yield take(reqChannel);
	// 	const res = yield call(sendCommand, action);
	// 	yield console.log(res);
	// }
}

export default function* commandPwdSaga() {
	yield all([fork(watchSendCommand)]);
}
