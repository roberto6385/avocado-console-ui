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
	ADD_HISTORY,
	commandLsAction,
	INIT_DELETE_WORK_LIST,
	INITIALIZING_HIGHLIGHT,
	PWD_SUCCESS,
	RM_FAILURE,
	RM_REQUEST,
	RM_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from '../channel';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);
	try {
		if (payload.keyword === 'pwd') {
			yield call(messageSender, {
				keyword: 'CommandByPwd',
				ws: payload.socket,
			});
		} else {
			console.log(payload.file.name);
			console.log(payload.newPath);

			if (payload.file.name !== '..' && payload.file.name !== '.') {
				yield call(messageSender, {
					keyword:
						payload.keyword === 'rm'
							? 'CommandByRm'
							: 'CommandByRmdir',
					ws: payload.socket,
					path: `${payload.newPath}/${payload.file.name}`,
				});
			}
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
				const res = yield call(messageReader, {data, payload});
				const past = payload.path;
				switch (res.type) {
					case RM_SUCCESS:
						console.log(payload.file);
						yield put({type: RM_SUCCESS});

						if (payload.newPath === payload.path) {
							yield put({
								type: ADD_HISTORY,
								payload: {
									uuid: payload.uuid,
									name: payload.file.name,
									size: payload.file.size,
									todo: 'rm',
									progress: 100,
								},
							});
						}
						break;

					case PWD_SUCCESS:
						yield put({
							type: INITIALIZING_HIGHLIGHT,
							payload: {uuid: payload.uuid},
						});
						yield put({
							type: INIT_DELETE_WORK_LIST,
							payload: {uuid: payload.uuid},
						});

						yield put({
							type: PWD_SUCCESS,
							payload: {
								uuid: payload.uuid,
								path: res.path,
								pathList: res.pathList,
								removeIndex: 1,
							},
						});
						yield put(
							commandLsAction({
								...payload,
								newPath: past,
							}),
						);
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
	const reqChannel = yield actionChannel(RM_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		yield call(sendCommand, action);
	}
}

export default function* commandRmSaga() {
	yield all([fork(watchSendCommand)]);
}
