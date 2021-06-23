import {
	all,
	call,
	fork,
	take,
	put,
	takeEvery,
	race,
	delay,
} from 'redux-saga/effects';
import {
	DISCONNECTION_FAILURE,
	DISCONNECTION_REQUEST,
	DISCONNECTION_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {CLOSE_TAB} from '../../reducers/common';
import {closeChannel, subscribe} from '../channel';
import {disconnectResponse} from '../../ws/sftp/disconnect_response';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);
	yield put({type: CLOSE_TAB, data: payload.uuid});

	try {
		messageSender({
			keyword: 'Disconnection',
			ws: payload.socket,
		});

		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(5000),
				data: take(channel),
			});
			if (timeout) {
				// disconnection 은 의미가 없는듯...?
				console.log('Disconnection 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				const res = yield call(disconnectResponse, {data});
				switch (res.type) {
					case DISCONNECTION_SUCCESS:
						console.log('disconnection success!!');
						yield put({
							type: DISCONNECTION_SUCCESS,
							payload: {
								uuid: payload.uuid,
							},
						});
				}
			}
		}
	} catch (err) {
		yield put({type: DISCONNECTION_FAILURE});
		console.log(err);
	}
}

function* watchSendCommand() {
	yield takeEvery(DISCONNECTION_REQUEST, sendCommand);
}

export default function* disconnectSaga() {
	yield all([fork(watchSendCommand)]);
}
