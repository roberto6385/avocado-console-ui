import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import {
	DISCONNECTION_FAILURE,
	DISCONNECTION_REQUEST,
	DISCONNECTION_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';
import {CLOSE_TAB} from '../../reducers/common';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {type, payload} = action;

	const channel = yield call(subscribe, payload.socket);

	yield call(sftp_ws, {
		keyword: 'Disconnection',
		ws: payload.socket,
	});

	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, {
				type,
				data,
				payload,
			});
			switch (res.type) {
				case DISCONNECTION_SUCCESS:
					yield put({
						type: DISCONNECTION_SUCCESS,
						payload: {
							uuid: payload.uuid,
						},
					});
					yield put({type: CLOSE_TAB, data: payload.id});
					return {type: 'end'};
			}
		}
	} catch (err) {
		yield put({type: DISCONNECTION_FAILURE});
		console.log(err);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(DISCONNECTION_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		const res = yield call(sendCommand, action);
		yield console.log(res);
	}
}

export default function* disconnectSaga() {
	yield all([fork(watchSendCommand)]);
}
