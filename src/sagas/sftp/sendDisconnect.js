import {all, call, fork, take, put, takeLatest} from 'redux-saga/effects';
import {
	DISCONNECTION_FAILURE,
	DISCONNECTION_REQUEST,
	DISCONNECTION_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {CLOSE_TAB} from '../../reducers/common';
import {messageReader} from './messageReader';
import {subscribe} from './channel';

function* sendCommand(action) {
	try {
		const {payload} = action;
		const channel = yield call(subscribe, payload.socket);

		messageSender({
			keyword: 'Disconnection',
			ws: payload.socket,
		});

		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, {data, payload});
			switch (res.type) {
				case DISCONNECTION_SUCCESS:
					yield put({
						type: DISCONNECTION_SUCCESS,
						payload: {
							uuid: payload.uuid,
						},
					});
					yield put({type: CLOSE_TAB, data: payload.uuid});
			}
		}
	} catch (err) {
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
