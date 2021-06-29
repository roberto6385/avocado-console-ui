import {
	all,
	call,
	fork,
	take,
	put,
	race,
	delay,
	takeLatest,
} from 'redux-saga/effects';
import {
	CD_FAILURE,
	CD_REQUEST,
	CD_SUCCESS,
	commandPwdAction,
	ERROR,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from '../channel';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {cdResponse} from '../../ws/sftp/cd_response';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);
	const channel = yield call(subscribe, payload.socket);
	try {
		yield call(messageSender, {
			keyword: 'CommandByCd',
			ws: payload.socket,
			path: payload.cd_path,
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
				const res = yield call(cdResponse, {data});

				switch (res.type) {
					case CD_SUCCESS:
						yield put({
							type: CD_SUCCESS,
							payload: {uuid: payload.uuid},
						});

						yield put(
							commandPwdAction({
								socket: payload.socket,
								uuid: payload.uuid,
								pwd_path: payload.path,
							}),
						);

						break;
					case ERROR:
						console.log(res.err);
						yield put({type: CD_FAILURE});
						yield put({
							type: OPEN_ALERT_POPUP,
							data: 'wrong_path',
						});
						break;
					default:
						console.log(res);
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: CD_FAILURE});
		yield put({
			type: OPEN_ALERT_POPUP,
			data: 'wrong_path',
		});
		closeChannel(channel);
	}
}

function* watchSendCommand() {
	yield takeLatest(CD_REQUEST, sendCommand);
}

export default function* commandCdSaga() {
	yield all([fork(watchSendCommand)]);
}
