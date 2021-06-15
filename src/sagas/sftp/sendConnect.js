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
	commandLsAction,
	CONNECTION_FAILURE,
	CONNECTION_REQUEST,
	CONNECTION_SUCCESS,
	ERROR,
	PWD_SUCCESS,
} from '../../reducers/sftp';
import {closeChannel, subscribe} from '../channel';
import messageSender from './messageSender';
import {createWebsocket} from './socket';
import {messageReader} from './messageReader';
import {OPEN_TAB} from '../../reducers/common';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';

function* sendCommand(action) {
	console.log(action);
	const {payload} = action;
	console.log(payload);
	const socket = yield call(createWebsocket, payload.host);
	console.log(socket);
	const channel = yield call(subscribe, socket);
	let uuid = '';
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
				const res = yield call(messageReader, {data, payload});

				let prev = [];
				let next = [];
				let add = [];

				switch (res.type) {
					case CONNECTION_SUCCESS:
						console.log(res);
						uuid = res.uuid;

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

						yield call(messageSender, {
							keyword: 'CommandByPwd',
							ws: socket,
						});

						break;

					case PWD_SUCCESS:
						console.log(res);
						console.log(uuid);
						prev = [];
						next = res.pathList;
						add = next.filter((v) => !prev.includes(v));

						yield put({
							type: PWD_SUCCESS,
							payload: {
								uuid: uuid,
								path: res.path,
								pathList: res.pathList,
								removeIndex: 0,
							},
						});

						for (let value of add) {
							console.log(value);
							yield put(
								commandLsAction({
									uuid: uuid,
									path: '',
									mode: 'list',
									pathList: [],
									fileList: [],
									deleteWorks: [],
									sortKeyword: 'name',
									toggle: true,
									socket: socket,
									newPath: value,
								}),
							);
						}
						break;

					case ERROR:
						yield put({
							type: OPEN_ALERT_POPUP,
							data: 'invalid_server',
						});
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

	// const reqChannel = yield actionChannel(CONNECTION_REQUEST);
	// console.log('watch send command connection');
	// while (true) {
	// 	const action = yield take(reqChannel);
	// 	console.log('connect request start!!');
	// 	yield call(sendCommand, action);
	// 	yield delay(300);
	// }
}

export default function* connectSaga() {
	yield all([fork(watchSendCommand)]);
}
