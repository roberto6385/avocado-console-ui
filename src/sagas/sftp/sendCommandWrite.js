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
import {writeResponse} from '../../ws/sftp/write_response';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);
	const senderLength = 1024 * 4;

	let filepath = '';
	filepath =
		payload.write_path === '/'
			? `${payload.write_path}${payload.file.name}`
			: `${payload.write_path}/${payload.file.name}`;

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
	yield put({
		type: ADD_HISTORY,
		payload: {
			uuid: payload.uuid,
			name: payload.file.name,
			size: payload.file.size,
			todo: 'write',
			progress: 0,
		},
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
				const res = yield call(writeResponse, {data, payload});

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
						yield put({
							type: FIND_HISTORY,
							payload: {
								uuid: payload.uuid,
								name: payload.file.name,
								size: payload.file.size,
								todo: 'write',
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
							yield put(
								commandPwdAction({
									socket: payload.socket,
									uuid: payload.uuid,
									pwd_path: payload.path,
								}),
							);
						}

						// else {
						// 	if (res.last && res.percent === 100) {
						// 		yield put({
						// 			type: ADD_HISTORY,
						// 			payload: {
						// 				uuid: payload.uuid,
						// 				name: payload.file.name,
						// 				size: payload.file.size,
						// 				todo: 'edit',
						// 				progress: 100,
						// 			},
						// 		});
						//
						// 		yield put(commandPwdAction(payload));
						// 	}
						// }
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
	// yield takeEvery(WRITE_REQUEST, sendCommand);
	const reqChannel = yield actionChannel(WRITE_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		yield call(sendCommand, action);
	}
}

export default function* commandWriteSaga() {
	yield all([fork(watchSendCommand)]);
}
