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
	INITIALIZING_HIGHLIGHT,
	RM_FAILURE,
	RM_REQUEST,
} from '../../reducers/sftp/sftp';
import messageSender from './messageSender';
import {closeChannel, fileSubscribe} from '../channel';
import {rmResponse} from '../../ws/sftp/rm_response';
import {removeNewWebsocket, SHIFT_SOCKETS} from '../../reducers/sftp/crud';
import {commandPwdAction} from '../../reducers/sftp/list';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(fileSubscribe, payload.remove_socket);
	try {
		if (payload.socket.readyState === 3) {
			console.log('already socket is closing');
			return;
		}

		if (payload.file.name !== '..' && payload.file.name !== '.') {
			yield call(messageSender, {
				keyword: payload.keyword,
				ws: payload.remove_socket,
				path:
					payload.rm_path === '/'
						? `${payload.rm_path}${payload.file.name}`
						: `${payload.rm_path}/${payload.file.name}`,
			});
		}

		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(200),
				data: take(channel),
			});
			if (timeout) {
				console.log('RM 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				// const data = yield take(channel);
				const res = yield call(rmResponse, {data});
				console.log(res);
				// switch (res.type) {
				// 	case RM_SUCCESS:
				if (payload.path === payload.rm_path) {
					yield put(
						commandPwdAction({
							socket: payload.socket,
							uuid: payload.uuid,
							pwd_path: payload.path,
						}),
					);
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: RM_FAILURE});
	}
}

function* watchSendCommand() {
	// yield takeEvery(RM_REQUEST, sendCommand);
	const reqChannel = yield actionChannel(RM_REQUEST);
	let uuid = null;
	let socket = null;

	while (true) {
		const {timeout, action} = yield race({
			timeout: delay(1000),
			action: take(reqChannel),
		});
		if (timeout) {
			console.log('send command rm - end');
			if (uuid !== null && socket !== null) {
				yield put(
					removeNewWebsocket({
						socket: socket,
					}),
				);
				yield put({
					type: INITIALIZING_HIGHLIGHT,
					payload: {uuid},
				});

				yield put({
					type: SHIFT_SOCKETS,
					payload: {uuid, todo: 'remove'},
				});

				uuid = null;
				socket = null;
			}
			yield take(RM_REQUEST);
		} else {
			console.log(action);
			uuid = action.payload.uuid;
			socket = action.payload.remove_socket;
			yield call(sendCommand, action);
		}
	}
}

export default function* commandRmSaga() {
	yield all([fork(watchSendCommand)]);
}
