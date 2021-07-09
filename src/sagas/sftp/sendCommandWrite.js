import {
	all,
	call,
	fork,
	take,
	put,
	actionChannel,
	race,
	delay,
	takeEvery,
	takeLatest,
} from 'redux-saga/effects';
import {
	commandPwdAction,
	FIND_HISTORY,
	removeNewWebsocket,
	WRITE_FAILURE,
	WRITE_REQUEST,
	WRITE_SUCCESS,
} from '../../reducers/sftp';
import {closeChannel, fileSubscribe} from '../channel';
import messageSender from './messageSender';
import {writeResponse} from '../../ws/sftp/write_response';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(fileSubscribe, payload.write_socket);
	const senderLength = 1024 * 4;

	try {
		if (payload.socket.readyState === 3) {
			console.log('already socket is closing');
			return;
		}

		const filepath =
			payload.write_path === '/'
				? `${payload.write_path}${payload.file.name}`
				: `${payload.write_path}/${payload.file.name}`;

		yield call(messageSender, {
			keyword: 'CommandByWrite',
			ws: payload.write_socket,
			path: filepath,
			offset: 0,
			length: senderLength,
			uploadFile: payload.file,
			completed: false,
			mode: 1,
		});

		while (true) {
			if (payload.socket.readyState === 3) {
				console.log('already socket is closing');
				return;
			}
			// timeout delay의 time 간격으로 messageReader가 실행된다.
			const {timeout, data} = yield race({
				timeout: delay(5000),
				data: take(channel),
			});
			if (timeout) {
				closeChannel(channel);
				console.log('upload end');
			} else {
				// const data = yield take(channel);
				const res = yield call(writeResponse, {data, payload});

				console.log(res);
				switch (res.type) {
					case WRITE_SUCCESS:
						if (res.last === false) {
							if (res.end === false) {
								yield call(messageSender, {
									keyword: 'CommandByWrite',
									ws: payload.write_socket,
									path: filepath,
									offset: res.byteSum,
									length: senderLength,
									uploadFile: payload.file,
									completed: false,
									mode: 2,
								});
							} else {
								yield call(messageSender, {
									keyword: 'CommandByWrite',
									ws: payload.write_socket,
									path: filepath,
									offset: res.byteSum,
									length: senderLength,
									uploadFile: payload.file,
									completed: true,
									mode: 2,
								});
							}
						} else if (res.percent === 100) {
							yield put(
								removeNewWebsocket({
									socket: payload.write_socket,
								}),
							);

							yield put({
								type: WRITE_SUCCESS,
								payload: {
									uuid: payload.uuid,
									percent: res.percent,
								},
							});
							yield put(
								commandPwdAction({
									socket: payload.socket,
									uuid: payload.uuid,
									pwd_path: payload.path,
									dispatch: payload.dispatch,
								}),
							);
						}
						yield put({
							type: FIND_HISTORY,
							payload: {
								uuid: payload.uuid,
								name: payload.file.name,
								size: payload.file.size,
								todo: payload.todo,
								progress: res.percent,
							},
						});

						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: WRITE_FAILURE});
	}
}

function* watchSendCommand() {
	// yield takeLatest(WRITE_REQUEST, sendCommand);
	const reqChannel = yield actionChannel(WRITE_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		yield call(sendCommand, action);
	}
}

export default function* commandWriteSaga() {
	yield all([fork(watchSendCommand)]);
}
