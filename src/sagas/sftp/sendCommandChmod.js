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
	CHMOD_FAILURE,
	CHMOD_REQUEST,
	CHMOD_SUCCESS,
	ERROR,
	PWD_REQUEST,
	READY_STATE,
} from '../../reducers/sftp';
import messageSender from './messageSender';

import {closeChannel, subscribe} from '../channel';
import {chmodResponse} from '../../ws/sftp/chmod_response';

function* sendCommand(action) {
	const {payload} = action;

	const channel = yield call(subscribe, payload.socket);

	try {
		if (payload.socket.readyState === 3) {
			console.log('closed');
			return;
		}
		yield call(messageSender, {
			keyword: 'CommandByChmod',
			ws: payload.socket,
			path: payload.path,
			permissions: payload.permissions,
		});
		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(1000),
				data: take(channel),
			});
			if (timeout) {
				closeChannel(channel);
				console.log('chmod end');

				if (payload.socket.readyState !== 1) {
					yield put({
						type: READY_STATE,
						payload: {uuid: payload.uuid},
					});
				}
			} else {
				const res = yield call(chmodResponse, {data});

				console.log(res);

				switch (res.type) {
					case CHMOD_SUCCESS:
						yield put({
							type: CHMOD_SUCCESS,
							payload: {
								uuid: payload.uuid,
								data: res,
							},
						});
						yield put({
							type: PWD_REQUEST,
							payload: {
								socket: payload.socket,
								uuid: payload.uuid,
								pwd_path: null,
							},
						});

						break;
					case ERROR:
						console.log(res.err);
						yield put({type: CHMOD_FAILURE});
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
		yield put({type: CHMOD_FAILURE});
	}
}

function* watchSendCommand() {
	yield takeLatest(CHMOD_REQUEST, sendCommand);
}

export default function* commandStatSaga() {
	yield all([fork(watchSendCommand)]);
}
