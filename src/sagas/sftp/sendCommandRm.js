import {
	all,
	call,
	fork,
	take,
	put,
	actionChannel,
	race,
	delay,
	takeLatest,
} from 'redux-saga/effects';
import {
	commandPwdAction,
	INITIALIZING_HIGHLIGHT,
	removeNewWebsocket,
	RM_FAILURE,
	RM_REQUEST,
	RM_SUCCESS,
	SHIFT_SOCKETS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, fileSubscribe} from '../channel';
import {rmResponse} from '../../ws/sftp/rm_response';

function* sendCommand(action) {
	const {payload} = action;
	console.log(`${payload.rm_path}/${payload.file.name}`);
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
			if (payload.socket.readyState === 3) {
				console.log('already socket is closing');
				return;
			}
			const {timeout, data} = yield race({
				timeout: delay(5000),
				data: take(channel),
			});
			if (timeout) {
				closeChannel(channel);
				// yield put(
				// 	removeNewWebsocket({
				// 		socket: payload.remove_socket,
				// 	}),
				// );
				// yield put({
				// 	type: INITIALIZING_HIGHLIGHT,
				// 	payload: {uuid: payload.uuid},
				// });
				//
				// yield put({
				// 	type: SHIFT_SOCKETS,
				// 	payload: {uuid: payload.uuid, todo: 'remove'},
				// });
				// yield put(
				// 	commandPwdAction({
				// 		socket: payload.socket,
				// 		uuid: payload.uuid,
				// 		pwd_path: payload.path,
				// 		dispatch: payload.dispatch,
				// 	}),
				// );
			} else {
				// const data = yield take(channel);
				const res = yield call(rmResponse, {data});
				console.log(res);
				switch (res.type) {
					case RM_SUCCESS:
						if (payload.path === payload.rm_path) {
							console.log(payload.path);
							console.log(payload.rm_path);
							yield put(
								commandPwdAction({
									socket: payload.socket,
									uuid: payload.uuid,
									pwd_path: payload.path,
									dispatch: payload.dispatch,
								}),
							);
						}
						break;
					default:
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: RM_FAILURE});
	}
}

function* watchSendCommand() {
	// yield takeLatest(RM_REQUEST, sendCommand);
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
