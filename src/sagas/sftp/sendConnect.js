import {
	all,
	call,
	fork,
	take,
	put,
	race,
	delay,
	throttle,
} from 'redux-saga/effects';
import {
	CONNECTION_FAILURE,
	CONNECTION_REQUEST,
	CONNECTION_SUCCESS,
	DISCONNECTION_REQUEST,
	ERROR,
	PWD_REQUEST,
	READY_STATE,
} from '../../reducers/sftp';
import {closeChannel, subscribe} from '../channel';

import messageSender from './messageSender';
import {createWebsocket} from './socket';
import {connectResponse} from '../../ws/sftp/connect_response';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {tabBarAction} from '../../reducers/tabBar';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);
	let uuid = null;

	try {
		const socket = yield call(createWebsocket);
		const channel = yield call(subscribe, socket);

		yield call(messageSender, {
			keyword: 'Connection',
			ws: socket,
			data: payload,
		});

		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(4000),
				data: take(channel),
			});
			if (timeout) {
				closeChannel(channel);
				if (socket.readyState !== 1) {
					yield put({
						type: READY_STATE,
						payload: {uuid},
					});
				}
			} else {
				const res = yield call(connectResponse, {data});
				uuid = res.uuid;

				switch (res.type) {
					case CONNECTION_SUCCESS:
						yield put({
							type: CONNECTION_SUCCESS,
							payload: {
								uuid: uuid,
								socket: socket,
							},
						});

						yield put(
							tabBarAction.addTab({
								type: 'SFTP',
								uuid: uuid,
								server: {
									id: payload.id,
									name: payload.name,
									key: payload.key,
								},
							}),
						);

						yield put({
							type: PWD_REQUEST,
							payload: {
								socket: socket,
								uuid: uuid,
								pwd_path: null,
							},
						});

						break;

					case ERROR:
						if (socket.readyState === 1) {
							yield put(
								dialogBoxAction.openAlert({
									key: 'invalid_server',
								}),
							);
						}
						yield put({type: CONNECTION_FAILURE, payload: res.err});

						yield put({
							type: DISCONNECTION_REQUEST,
							payload: {
								socket: socket,
							},
						});
						break;

					default:
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put(dialogBoxAction.openAlert({key: 'invalid_server'}));
		yield put({type: CONNECTION_FAILURE, payload: err});
	}
}

function* watchSendCommand() {
	yield throttle(1000, CONNECTION_REQUEST, sendCommand);
}

export default function* connectSaga() {
	yield all([fork(watchSendCommand)]);
}
