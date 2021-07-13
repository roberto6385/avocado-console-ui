import {
	all,
	call,
	fork,
	take,
	put,
	actionChannel,
	race,
	delay,
} from 'redux-saga/effects';
import {
	ADD_PAUSED_LIST,
	CHANGE_MODE,
	FIND_HISTORY,
	READ_FAILURE,
	READ_REQUEST,
	READ_SUCCESS,
	REMOVE_PAUSED_LIST,
	removeNewWebsocket,
	SAVE_EDITTEXT,
	SAVE_FILE_FOR_EDIT,
	SAVE_TEXT,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, fileSubscribe} from '../channel';
import {readResponse} from '../../ws/sftp/read_response';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);
	const channel = yield call(fileSubscribe, payload.read_socket);
	// const senderLength = 1024 * 56;
	const senderLength = 1024 * 4;
	let lastSum = 0;
	let pass = true;

	try {
		if (
			payload.socket.readyState === 3 ||
			payload.read_socket.readyState === 3
		) {
			console.log('already socket is closing');
			return;
		}

		const filepath =
			payload.read_path === '/'
				? `${payload.read_path}${payload.file.name}`
				: `${payload.read_path}/${payload.file.name}`;

		yield call(messageSender, {
			keyword: 'CommandByRead',
			ws: payload.read_socket,
			path: filepath,
			offset: payload.offset ? payload.offset : 0,
			length: payload.offset ? 0 : senderLength,
			completed: false,
		});

		while (true) {
			if (payload.socket.readyState === 3) {
				console.log('already socket is closing');
				return;
			}
			const {timeout, data} = yield race({
				timeout: delay(500),
				data: take(channel),
			});
			if (timeout) {
				closeChannel(channel);
				console.log('download end');
				if (lastSum !== 0) {
					yield put({
						type: ADD_PAUSED_LIST,
						payload: {
							uuid: payload.uuid,
							data: {
								offset: lastSum,
								todo: payload.todo,
								path: payload.read_path,
								file: payload.file,
							},
						},
					});
				}
			} else {
				// const data = yield take(channel);
				const res = yield call(readResponse, {data, payload, pass});
				pass = false;
				console.log(res);
				switch (res.type) {
					case READ_SUCCESS:
						if (res.last === false) {
							if (res.end === false) {
								console.log(res.byteSum);
								lastSum = res.byteSum;

								yield call(messageSender, {
									keyword: 'CommandByRead',
									ws: payload.read_socket,
									path: filepath,
									offset: res.byteSum + 1,
									length: senderLength,
									completed: false,
								});
							} else {
								yield call(messageSender, {
									keyword: 'CommandByRead',
									ws: payload.read_socket,
									path: filepath,
									offset: res.byteSum,
									length: senderLength,
									completed: true,
								});
							}
						}
						yield put({
							type: FIND_HISTORY,
							payload: {
								uuid: payload.uuid,
								name: payload.file.name,
								size: payload.file.size,
								todo: payload.todo,
								progress: res.percent,
								ready: payload.read_socket.readyState,
								socket: payload.read_socket,
							},
						});
						if (res.last && res.percent === 100) {
							yield put(
								removeNewWebsocket({
									socket: payload.read_socket,
								}),
							);
							yield put({
								type: READ_SUCCESS,
								payload: {
									uuid: payload.uuid,
									percent: res.percent,
								},
							});
							yield put({
								type: REMOVE_PAUSED_LIST,
								payload: {
									uuid: payload.uuid,
									data: {
										todo: payload.todo,
										path: payload.path,
										file: payload.file,
									},
								},
							});
							if (payload.todo === 'edit') {
								yield put({
									type: SAVE_TEXT,
									payload: {
										uuid: payload.uuid,
										text: res.text,
									},
								});
								yield put({
									type: SAVE_EDITTEXT,
									payload: {
										uuid: payload.uuid,
										editText: res.text,
									},
								});
								yield put({
									type: SAVE_FILE_FOR_EDIT,
									payload: {
										uuid: payload.uuid,
										editFile: payload.file,
									},
								});
								yield put({
									type: CHANGE_MODE,
									payload: {
										uuid: payload.uuid,
										mode: 'edit',
										currentMode: payload.mode,
									},
								});
							}
						}
						break;
					//
					// case ERROR:
					// 	console.log(res.err);
					// 	break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: READ_FAILURE});
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(READ_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		yield call(sendCommand, action);
	}
}

export default function* commandReadSaga() {
	yield all([fork(watchSendCommand)]);
}
