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
	RECONNECTION_FAILURE,
	RECONNECTION_REQUEST,
	RECONNECTION_SUCCESS,
	ERROR,
	READY_STATE,
	CD_REQUEST,
} from '../../reducers/sftp';
import {closeChannel, subscribe} from '../channel';

import messageSender from './messageSender';
import {createWebsocket} from './socket';
import {reconnectResponse} from '../../ws/sftp/reconnect_response';
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
				console.log(data);
				const res = yield call(reconnectResponse, {data});
				uuid = res.uuid;

				switch (res.type) {
					case RECONNECTION_SUCCESS:
						yield put(tabBarAction.deleteTab(payload.prevUuid));

						yield put({
							type: RECONNECTION_SUCCESS,
							payload: {
								uuid: payload.prevUuid,
								socket: socket,
								newUuid: uuid,
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
								prevUuid: payload.prevUuid,
								prevIndex: payload.prevIndex,
							}),
						);

						yield put({
							type: CD_REQUEST,
							paylaod: {
								socket: socket,
								uuid: uuid,
								path: payload.prevPath,
								cd_path: payload.prevPath,
							},
						});

						break;

					case ERROR:
						yield put(
							dialogBoxAction.openAlert({key: 'invalid-server'}),
						);
						yield put({
							type: RECONNECTION_FAILURE,
							payload: res.err,
						});

						break;

					default:
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put(dialogBoxAction.openAlert({key: 'invalid-server'}));
		yield put({type: RECONNECTION_FAILURE, payload: err});
	}
}

function* watchSendCommand() {
	yield throttle(1000, RECONNECTION_REQUEST, sendCommand);
}

export default function* reconnectSaga() {
	yield all([fork(watchSendCommand)]);
}
