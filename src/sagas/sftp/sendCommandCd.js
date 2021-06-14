import {
	all,
	call,
	fork,
	take,
	put,
	race,
	delay,
	takeLatest,
	actionChannel,
} from 'redux-saga/effects';
import {
	CD_FAILURE,
	CD_REQUEST,
	CD_SUCCESS,
	commandLsAction,
	commandPwdAction,
	CONNECTION_REQUEST,
	INITIAL_FILELIST,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from '../channel';
import {messageReader} from './messageReader';
import {OPEN_ALERT_POPUP, OPEN_WARNING_ALERT_POPUP} from '../../reducers/popup';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);
	const channel = yield call(subscribe, payload.socket);
	try {
		yield call(messageSender, {
			keyword: 'CommandByCd',
			ws: payload.socket,
			path: payload.newPath,
		});
		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(200),
				data: take(channel),
			});
			if (timeout) {
				console.log('CD 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				const res = yield call(messageReader, {data, payload});
				switch (res.type) {
					case CD_SUCCESS:
						yield put({
							type: CD_SUCCESS,
							payload: {uuid: payload.uuid},
						});

						yield put(commandPwdAction(payload));
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: CD_FAILURE});
		// yield put({type: INITIAL_FILELIST, payload: {uuid: payload.uuid}});
		// let pathList = ['/'];
		// payload.path !== '/' &&
		// 	payload.path
		// 		.split('/')
		// 		.reduce(function (accumulator, currentValue) {
		// 			payload.path !== '/' &&
		// 				pathList.push(accumulator + '/' + currentValue);
		// 			return accumulator + '/' + currentValue;
		// 		});
		//
		// for (let value of pathList) {
		// 	console.log(value);
		// 	yield put(
		// 		commandLsAction({
		// 			...payload,
		// 			newPath: value,
		// 		}),
		// 	);
		// }
		yield put({
			type: OPEN_ALERT_POPUP,
			data: 'wrong_path',
		});
		closeChannel(channel);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(CD_REQUEST);
	console.log('watch send command connection');
	while (true) {
		const action = yield take(reqChannel);
		console.log('cd request start!!');
		yield call(sendCommand, action);
		yield delay(200);
	}
}

export default function* commandCdSaga() {
	yield all([fork(watchSendCommand)]);
}
