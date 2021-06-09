import {
	all,
	call,
	fork,
	take,
	put,
	race,
	delay,
	actionChannel,
} from 'redux-saga/effects';
import {
	DISCONNECTION_FAILURE,
	DISCONNECTION_REQUEST,
	DISCONNECTION_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {CLOSE_TAB} from '../../reducers/common';
import {messageReader} from './messageReader';
import {closeChannel, subscribe} from '../channel';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);

	try {
		messageSender({
			keyword: 'Disconnection',
			ws: payload.socket,
		});

		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(1000),
				data: take(channel),
			});
			if (timeout) {
				console.log('Disconnection 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				// const data = yield take(channel);
				const res = yield call(messageReader, {data, payload});
				switch (res.type) {
					case DISCONNECTION_SUCCESS:
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
	} finally {
		yield put({type: CLOSE_TAB, data: payload.uuid});
	}
}

function* watchSendCommand() {
	// yield takeLatest(DISCONNECTION_REQUEST, sendCommand);
	const reqChannel = yield actionChannel(DISCONNECTION_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		yield call(sendCommand, action);
	}
}

export default function* disconnectSaga() {
	yield all([fork(watchSendCommand)]);
}
