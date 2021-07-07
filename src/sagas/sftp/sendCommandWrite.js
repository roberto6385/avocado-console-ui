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
} from 'redux-saga/effects';
import {
	WRITE_FAILURE,
	WRITE_REQUEST,
	WRITE_SUCCESS,
} from '../../reducers/sftp/sftp';
import {closeChannel, sftpSubscribe} from '../channel';
import messageSender from './messageSender';
import {writeResponse} from '../../ws/sftp/write_response';
import {FIND_HISTORY} from '../../reducers/sftp/history';
import {removeNewWebsocket} from '../../reducers/sftp/crud';
import {commandPwdAction} from '../../reducers/sftp/list';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(sftpSubscribe, payload.write_socket);
	const senderLength = 1024 * 4;

	try {
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
			// timeout delay의 time 간격으로 messageReader가 실행된다.
			const {timeout, data} = yield race({
				timeout: delay(1000),
				data: take(channel),
			});
			if (timeout) {
				console.log('WRITE 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
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
