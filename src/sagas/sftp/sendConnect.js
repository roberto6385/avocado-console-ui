import {
	all,
	call,
	fork,
	take,
	put,
	race,
	delay,
	takeEvery,
} from 'redux-saga/effects';
import {
	commandPwdAction,
	CONNECTION_FAILURE,
	CONNECTION_REQUEST,
	CONNECTION_SUCCESS,
	ERROR,
} from '../../reducers/sftp';
import {closeChannel, subscribe} from '../channel';
import messageSender from './messageSender';
import {createWebsocket} from './socket';
import {OPEN_TAB} from '../../reducers/common';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {connectResponse} from '../../ws/sftp/connect_response';

function* sendCommand(action) {
	console.log(action);
	const {payload} = action;
	console.log(payload);
	const socket = yield call(createWebsocket, payload.host, payload.wsPort);
	console.log(socket);
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
				console.log(data);
				const res = yield call(connectResponse, {data});
				const uuid = res.uuid;

				switch (res.type) {
					case CONNECTION_SUCCESS:
						yield put({
							type: CONNECTION_SUCCESS,
							payload: {
								uuid: uuid,
								socket: socket,
							},
						});
						yield put({
							type: OPEN_TAB,
							data: {
								type: 'SFTP',
								uuid: uuid,
								server: {
									id: payload.id,
									name: payload.name,
									key: payload.key,
								},
							},
						});

						yield put(
							commandPwdAction({
								socket: socket,
								uuid: uuid,
								pwd_path: null,
							}),
						);

						break;

					case ERROR:
						yield put({
							type: OPEN_ALERT_POPUP,
							data: 'invalid_server',
						});

						break;
					default:
						break;
				}
			}
		}
	} catch (err) {
		yield put({type: CONNECTION_FAILURE});
		console.log(err);
	}
}

function* watchSendCommand() {
	yield takeEvery(CONNECTION_REQUEST, sendCommand);
}

export default function* connectSaga() {
	yield all([fork(watchSendCommand)]);
}
