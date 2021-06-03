import {
	all,
	call,
	fork,
	take,
	put,
	takeLatest,
	race,
	delay,
} from 'redux-saga/effects';
import {
	CONNECTION_FAILURE,
	CONNECTION_REQUEST,
	CONNECTION_SUCCESS,
} from '../../reducers/sftp';
import {closeChannel, subscribe} from '../channel';
import messageSender from './messageSender';
import {createWebsocket} from './socket';
import {messageReader} from './messageReader';
import {OPEN_TAB} from '../../reducers/common';

function* sendCommand(action) {
	console.log(action);
	const {payload} = action;
	console.log(payload);
	const socket = yield call(createWebsocket, payload.host);
	const channel = yield call(subscribe, socket);
	try {
		yield call(messageSender, {
			keyword: 'Connection',
			ws: socket,
			data: payload,
		});

		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(5000),
				data: take(channel),
			});
			if (timeout) {
				console.log('Connection 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				const res = yield call(messageReader, {data, payload});
				switch (res.type) {
					case CONNECTION_SUCCESS:
						yield put({
							type: CONNECTION_SUCCESS,
							payload: {
								uuid: res.uuid,
								socket: socket,
							},
						});
						yield put({
							type: OPEN_TAB,
							data: {
								type: 'SFTP',
								uuid: res.uuid,
								server: {
									id: payload.id,
									name: payload.name,
									key: payload.key,
								},
							},
						});
				}
			}
		}
	} catch (err) {
		yield put({type: CONNECTION_FAILURE});
		console.log(err);
	}
}

function* watchSendCommand() {
	yield takeLatest(CONNECTION_REQUEST, sendCommand);
}

export default function* connectSaga() {
	yield all([fork(watchSendCommand)]);
}
