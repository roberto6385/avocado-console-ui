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
	commandPwdAction,
	FIND_HISTORY,
	WRITE_FAILURE,
	WRITE_REQUEST,
	WRITE_SUCCESS,
} from '../../reducers/sftp';
import {closeChannel, subscribe} from '../channel';
import messageSender from './messageSender';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);
	const senderLength = 1024 * 4;

	let filepath = '';
	filepath =
		payload.writePath === '/'
			? `${payload.writePath}${payload.file.name}`
			: `${payload.writePath}/${payload.file.name}`;

	yield call(messageSender, {
		keyword: 'CommandByWrite',
		ws: payload.socket,
		path: filepath,
		offset: 0,
		length: senderLength,
		uploadFile: payload.file,
		completed: false,
		mode: 1,
	});

	try {
		while (true) {
			// timeout delay의 time 간격으로 messageReader가 실행된다.
			const {timeout, data} = yield race({
				timeout: delay(200),
				data: take(channel),
			});
			if (timeout) {
				console.log('WRITE 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				// const data = yield take(channel);
				const res = yield call(messageReader, {data, payload});

				console.log(res);
				switch (res.type) {
					case WRITE_SUCCESS:
						if (res.last === false) {
							if (res.end === false) {
								yield call(messageSender, {
									keyword: 'CommandByWrite',
									ws: payload.socket,
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
									ws: payload.socket,
									path: filepath,
									offset: res.byteSum,
									length: senderLength,
									uploadFile: payload.file,
									completed: true,
									mode: 2,
								});
							}
						}
						if (res.keyword === 'write') {
							yield put({
								type: FIND_HISTORY,
								payload: {
									uuid: payload.uuid,
									name: payload.file.name,
									size: payload.file.size,
									todo: payload.keyword,
									progress: res.percent,
								},
							});
							if (res.last && res.percent === 100) {
								yield put({
									type: WRITE_SUCCESS,
									payload: {
										uuid: payload.uuid,
										percent: res.percent,
									},
								});
							}
						} else {
							if (res.last && res.percent === 100) {
								yield put({
									type: ADD_HISTORY,
									payload: {
										uuid: payload.uuid,
										name: payload.file.name,
										size: payload.file.size,
										todo: 'edit',
										progress: 100,
									},
								});

								yield put(commandPwdAction(payload));
							}
						}
						break;

					// case PWD_SUCCESS:
					// 	yield put({
					// 		type: PWD_SUCCESS,
					// 		payload: {
					// 			uuid: payload.uuid,
					// 			path: res.path,
					// 			pathList: res.pathList,
					// 			removeIndex: 1,
					// 		},
					// 	});
					// 	yield put(
					// 		commandLsAction({
					// 			...payload,
					// 			newPath:payload.path,
					// 		}),
					// 	);
					// 	break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: WRITE_FAILURE});
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(WRITE_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		yield call(sendCommand, action);
	}
}

export default function* commandWriteSaga() {
	yield all([fork(watchSendCommand)]);
}
