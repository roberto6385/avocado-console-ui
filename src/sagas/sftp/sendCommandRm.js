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
	FIND_HISTORY,
	INITIALIZING_HIGHLIGHT,
	PWD_REQUEST,
	REMOVE_NEW_WEBSOCKET_REQUEST,
	RM_FAILURE,
	RM_REQUEST,
	RM_SUCCESS,
	SHIFT_INCINERATOR_LIST,
	SHIFT_SOCKETS,
	SHIFT_TOTAL,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from '../channel';
import {rmResponse} from '../../ws/sftp/rm_response';

function* sendCommand(action) {
	const {payload} = action;
	console.log(`${payload.rm_path}/${payload.file.name}`);
	const channel = yield call(subscribe, payload.remove_socket);
	try {
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
				timeout: delay(1000),
				data: take(channel),
			});
			if (timeout) {
				closeChannel(channel);
				yield put({
					type: REMOVE_NEW_WEBSOCKET_REQUEST,
					payload: {
						socket: payload.remove_socket,
						todo: 'rm',
						uuid: payload,
					},
				});
				yield put({
					type: INITIALIZING_HIGHLIGHT,
					payload: {uuid: payload.uuid},
				});

				yield put({
					type: SHIFT_SOCKETS,
					payload: {uuid: payload.uuid, todo: 'remove'},
				});
				yield put({
					type: PWD_REQUEST,
					paylod: {
						socket: payload.socket,
						uuid: payload.uuid,
						pwd_path: null,
					},
				});
			} else {
				// const data = yield take(channel);
				const res = yield call(rmResponse, {data});
				console.log(res);
				switch (res.type) {
					case RM_SUCCESS:
						console.log({
							uuid: payload.uuid,
							name: payload.file.name,
							size: payload.file.size,
							todo: payload.todo,
							progress: 100,
						});
						yield put({
							type: FIND_HISTORY,
							payload: {
								uuid: payload.uuid,
								name: payload.key,
								size: payload.file.size,
								todo: payload.todo,
								progress: payload.percent,
							},
						});
						if (payload.percent === 100) {
							yield put({
								type: SHIFT_TOTAL,
								payload: {uuid: payload.uuid},
							});
						}
						yield put({
							type: SHIFT_INCINERATOR_LIST,
							payload: {uuid: payload.uuid},
						});

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
	yield takeLatest(RM_REQUEST, sendCommand);
	// const reqChannel = yield actionChannel(RM_REQUEST);
	// let uuid = null;
	// let socket = null;
	//
	// while (true) {
	// 	const {timeout, action} = yield race({
	// 		timeout: delay(1000),
	// 		action: take(reqChannel),
	// 	});
	// 	if (timeout) {
	// 		console.log('send command rm - end');
	// 		if (uuid !== null && socket !== null) {
	// 			yield put(
	// 				removeNewWebsocket({
	// 					socket: socket,
	// 				}),
	// 			);
	// 			yield put({
	// 				type: INITIALIZING_HIGHLIGHT,
	// 				payload: {uuid},
	// 			});
	//
	// 			yield put({
	// 				type: SHIFT_SOCKETS,
	// 				payload: {uuid, todo: 'remove'},
	// 			});
	//
	// 			uuid = null;
	// 			socket = null;
	// 		}
	// 		yield take(RM_REQUEST);
	// 	} else {
	// 		console.log(action);
	// 		uuid = action.payload.uuid;
	// 		socket = action.payload.remove_socket;
	// 		yield call(sendCommand, action);
	// 	}
	// }
}

export default function* commandRmSaga() {
	yield all([fork(watchSendCommand)]);
}
