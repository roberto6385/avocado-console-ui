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
	commandPwdAction,
	commandCdAction,
} from '../../reducers/sftp';
import {closeChannel} from '../channel';

import messageSender from './messageSender';
import {createWebsocket} from './socket';
import {CLOSE_TAB, OPEN_TAB} from '../../reducers/common';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import useSubscribe from '../../hooks/useSubscribe';
import {reconnectResponse} from '../../ws/sftp/reconnect_response';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);

	try {
		const socket = yield call(createWebsocket);
		const channel = yield call(useSubscribe, {
			socket,
			dispatch: () =>
				console.log('최초 연결시 끊김 체크는 다른 방법을 사용해야 함'),
		});

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
				socket.close();
			} else {
				console.log(data);
				const res = yield call(reconnectResponse, {data});
				const uuid = res.uuid;

				switch (res.type) {
					case RECONNECTION_SUCCESS:
						yield put({type: CLOSE_TAB, data: payload.prevUuid});

						yield put({
							type: RECONNECTION_SUCCESS,
							payload: {
								uuid: payload.prevUuid,
								socket: socket,
								newUuid: uuid,
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
							commandCdAction({
								socket: socket,
								uuid: uuid,
								path: payload.prevPath,
								cd_path: payload.prevPath,
								dispatch: payload.dispatch,
							}),
						);

						break;

					case ERROR:
						yield put({
							type: OPEN_ALERT_POPUP,
							data: 'invalid_server',
						});
						yield put({type: RECONNECTION_FAILURE, data: res.err});

						break;

					default:
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({
			type: OPEN_ALERT_POPUP,
			data: 'invalid_server',
		});
		yield put({type: RECONNECTION_FAILURE, data: err});
	}
}

function* watchSendCommand() {
	yield throttle(1000, RECONNECTION_REQUEST, sendCommand);
}

export default function* reconnectSaga() {
	yield all([fork(watchSendCommand)]);
}
