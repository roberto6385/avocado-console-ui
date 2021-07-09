import {
	all,
	call,
	fork,
	take,
	put,
	takeEvery,
	race,
	delay,
	takeLatest,
} from 'redux-saga/effects';
import {
	DISCONNECTION_FAILURE,
	DISCONNECTION_REQUEST,
	DISCONNECTION_SUCCESS,
	ERROR,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {CLOSE_TAB} from '../../reducers/common';
import {closeChannel, fileSubscribe} from '../channel';
import {disconnectResponse} from '../../ws/sftp/disconnect_response';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(fileSubscribe, payload.socket);

	try {
		if (payload.socket.readyState === 3) {
			yield put({type: CLOSE_TAB, data: payload.uuid});
			return;
		}
		yield call(messageSender, {
			keyword: 'Disconnection',
			ws: payload.socket,
		});

		while (true) {
			const data = yield take(channel);
			const res = yield call(disconnectResponse, {data});
			switch (res.type) {
				case DISCONNECTION_SUCCESS:
					yield put({type: CLOSE_TAB, data: payload.uuid});

					yield put({
						type: DISCONNECTION_SUCCESS,
						payload: {
							uuid: payload.uuid,
						},
					});
					break;

				case ERROR:
					console.log(res.err);
					break;
			}
		}
	} catch (err) {
		closeChannel(channel);
		yield put({type: CLOSE_TAB, data: payload.uuid});
		yield put({type: DISCONNECTION_FAILURE});
		console.log(err);
	}
}

function* watchSendCommand() {
	yield takeLatest(DISCONNECTION_REQUEST, sendCommand);
}

export default function* disconnectSaga() {
	yield all([fork(watchSendCommand)]);
}
