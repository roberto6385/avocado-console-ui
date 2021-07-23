import {
	all,
	call,
	fork,
	take,
	put,
	race,
	delay,
	takeLatest,
} from 'redux-saga/effects';
import {
	ADD_PAUSED_LIST,
	commandPwdAction,
	FIND_HISTORY,
	REMOVE_PAUSED_LIST,
	SHIFT_SOCKETS,
	SHIFT_WRITE_LIST,
	write_chunkSize,
	WRITE_FAILURE,
	WRITE_REQUEST,
	WRITE_SUCCESS,
} from '../../reducers/sftp';
import {closeChannel, subscribe} from '../channel';
import messageSender from './messageSender';
import {writeResponse} from '../../ws/sftp/write_response';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.write_socket);
	let lastSum = 0;
	let pass = true;
	try {
		if (
			payload.socket.readyState === 3 ||
			payload.write_socket.readyState === 3
		) {
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
			offset: payload.offset ? payload.offset : 0,
			length: payload.offset ? 0 : write_chunkSize,
			uploadFile: payload.file,
			completed: false,
			mode: payload.offset && payload.offset !== 0 ? 2 : 1,
		});

		while (true) {
			if (payload.socket.readyState === 3) {
				console.log('already socket is closing');
				return;
			}
			// timeout delay의 time 간격으로 messageReader가 실행된다.
			const {timeout, data} = yield race({
				timeout: delay(1000),
				data: take(channel),
			});
			if (timeout) {
				closeChannel(channel);
				yield put(
					commandPwdAction({
						socket: payload.socket,
						uuid: payload.uuid,
						pwd_path: null,
					}),
				);
				if (lastSum !== 0) {
					yield put({
						type: SHIFT_SOCKETS,
						payload: {
							uuid: payload.uuid,
							todo: payload.todo,
							key: 'write',
						},
					});
					yield put({
						type: ADD_PAUSED_LIST,
						payload: {
							uuid: payload.uuid,
							data: {
								offset: lastSum,
								todo: payload.todo,
								path: payload.write_path,
								file: payload.file,
							},
						},
					});
					yield put({
						type: SHIFT_WRITE_LIST,
						payload: {uuid: payload.uuid},
					});
				}
			} else {
				const res = yield call(writeResponse, {data, payload, pass});
				pass = false;
				console.log(res);
				switch (res.type) {
					case WRITE_SUCCESS:
						if (res.last === false) {
							lastSum = res.byteSum;
							if (res.end === false) {
								yield call(messageSender, {
									keyword: 'CommandByWrite',
									ws: payload.write_socket,
									path: filepath,
									offset: res.byteSum,
									length: write_chunkSize,
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
									length: write_chunkSize,
									uploadFile: payload.file,
									completed: true,
									mode: 2,
								});
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
						} else if (res.percent === 100) {
							lastSum = 0;
							yield put({
								type: SHIFT_WRITE_LIST,
								payload: {uuid: payload.uuid},
							});

							yield put({
								type: REMOVE_PAUSED_LIST,
								payload: {
									uuid: payload.uuid,
									data: {
										todo: payload.todo,
										path: payload.write_path,
										file: payload.file,
									},
								},
							});
						}

						break;

					default:
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
	yield takeLatest(WRITE_REQUEST, sendCommand);
}

export default function* commandWriteSaga() {
	yield all([fork(watchSendCommand)]);
}
