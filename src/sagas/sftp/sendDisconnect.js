import {all, call, fork, take, put, takeLatest} from 'redux-saga/effects';
import {
	DISCONNECTION_FAILURE,
	DISCONNECTION_REQUEST,
	DISCONNECTION_SUCCESS,
	ERROR,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {CLOSE_TAB} from '../../reducers/common';
import {closeChannel, subscribe} from '../channel';
import {disconnectResponse} from '../../ws/sftp/disconnect_response';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);

	try {
		if (payload.socket.readyState === 3 && payload.uuid !== undefined) {
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
					if (payload.uuid !== undefined) {
						yield put({type: CLOSE_TAB, data: payload.uuid});

						yield put({
							type: DISCONNECTION_SUCCESS,
							payload: {
								uuid: payload.uuid,
							},
						});
					}
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
