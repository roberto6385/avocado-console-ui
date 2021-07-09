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
	READY_STATE,
} from '../../reducers/sftp';
import messageSender from './messageSender';

import {closeChannel} from '../channel';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {cdResponse} from '../../ws/sftp/cd_response';
import useSubscribe from '../../hooks/useSubscribe';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(useSubscribe, {
		socket: payload.socket,
		dispatch: () =>
			payload.dispatch({
				type: READY_STATE,
				payload: {uuid: payload.uuid},
			}),
	});

	try {
		if (payload.socket.readyState === 3) {
			console.log('closed');
			return;
		}
		yield call(messageSender, {
			keyword: 'CommandByCd',
			ws: payload.socket,
			path: payload.cd_path,
		});
		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(5000),
				data: take(channel),
			});
			if (timeout) {
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
								dispatch: payload.dispatch,
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
		closeChannel(channel);
		yield put({type: CD_FAILURE});
		yield put({
			type: OPEN_ALERT_POPUP,
			data: 'wrong_path',
		});
	}
}

function* watchSendCommand() {
	yield takeLatest(CD_REQUEST, sendCommand);
}

export default function* commandCdSaga() {
	yield all([fork(watchSendCommand)]);
}
