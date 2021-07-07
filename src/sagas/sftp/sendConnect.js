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
	CONNECTION_FAILURE,
	CONNECTION_REQUEST,
	CONNECTION_SUCCESS,
	ERROR,
} from '../../reducers/sftp/sftp';
import {closeChannel, sftpSubscribe} from '../channel';
import messageSender from './messageSender';
import {createWebsocket} from './socket';
import {OPEN_TAB} from '../../reducers/common';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {connectResponse} from '../../ws/sftp/connect_response';
import {HISTORY_CONNECTION_SUCCESS} from '../../reducers/sftp/history';
import {CRUD_CONNECTION_SUCCESS} from '../../reducers/sftp/crud';
import {
	commandPwdAction,
	FILELIST_CONNECTION_SUCCESS,
} from '../../reducers/sftp/list';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);

	try {
		const socket = yield call(createWebsocket);
		const channel = yield call(sftpSubscribe, {socket});

		yield call(messageSender, {
			keyword: 'Connection',
			ws: socket,
			data: payload,
		});

		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(3000),
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
							type: HISTORY_CONNECTION_SUCCESS,
							payload: {
								uuid: uuid,
							},
						});
						yield put({
							type: FILELIST_CONNECTION_SUCCESS,
							payload: {
								uuid: uuid,
							},
						});
						yield put({
							type: CRUD_CONNECTION_SUCCESS,
							payload: {
								uuid: uuid,
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
						yield put({type: CONNECTION_FAILURE, data: res.err});

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
		yield put({type: CONNECTION_FAILURE, data: err});
	}
}

function* watchSendCommand() {
	yield takeEvery(CONNECTION_REQUEST, sendCommand);
}

export default function* connectSaga() {
	yield all([fork(watchSendCommand)]);
}
