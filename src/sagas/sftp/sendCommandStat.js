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
	ERROR,
	READY_STATE,
	STAT_FAILURE,
	STAT_REQUEST,
	STAT_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';

import {closeChannel, subscribe} from '../channel';
import {statResponse} from '../../ws/sftp/stat_response';
import {pathFormatter} from '../../utils/sftp';

function* sendCommand(action) {
	const {payload} = action;

	let pass = false;

	const channel = yield call(subscribe, payload.socket);

	try {
		const path = pathFormatter(payload.cd_path, payload.file.name);
		if (payload.socket.readyState === 3) {
			console.log('closed');
			return;
		}
		yield call(messageSender, {
			keyword: 'CommandByStat',
			ws: payload.socket,
			path: path,
		});
		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(1000),
				data: take(channel),
			});
			if (timeout) {
				closeChannel(channel);
				console.log('stat end');

				if (payload.socket.readyState !== 1) {
					yield put({
						type: READY_STATE,
						payload: {uuid: payload.uuid},
					});
				}
			} else {
				const res = yield call(statResponse, {data});

				//TODO: add fileType, permission handler
				console.log(res);

				switch (res.type) {
					case STAT_SUCCESS:
						yield put({
							type: STAT_SUCCESS,
							payload: {
								uuid: payload.uuid,
								data: res,
								path: path,
							},
						});
						pass = true;

						// yield put(
						// 	commandPwdAction({
						// 		socket: payload.socket,
						// 		uuid: payload.uuid,
						// 		pwd_path: payload.path,
						// 	}),
						// );

						break;
					case ERROR:
						console.log(res.err);
						pass = true;
						yield put({type: STAT_FAILURE});
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
		yield put({type: STAT_FAILURE});
	}
}

function* watchSendCommand() {
	yield takeLatest(STAT_REQUEST, sendCommand);
}

export default function* commandStatSaga() {
	yield all([fork(watchSendCommand)]);
}
