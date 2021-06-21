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
	commandPwdAction,
	FIND_HISTORY,
	WRITE_FAILURE,
	WRITE_REQUEST,
	WRITE_SUCCESS,
	PWD_FAILURE,
	PWD_SUCCESS,
} from '../../reducers/sftp';
import {closeChannel, subscribe} from '../channel';
import messageSender from './messageSender';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);

	if (payload.keyword === 'pwd') {
		yield call(messageSender, {
			keyword: 'CommandByPwd',
			ws: payload.socket,
		});
	} else {
		const filepath =
			payload.path === '/'
				? `${payload.path}${payload.file.name}`
				: `${payload.path}/${payload.file.name}`;

		yield call(messageSender, {
			keyword: 'CommandByPut',
			ws: payload.socket,
			path: filepath,
			uploadFile: payload.file,
		});
	}

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
				const past = payload.path;

				switch (res.type) {
					case WRITE_SUCCESS:
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
						break;

					case PWD_SUCCESS:
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
				}
			}
		}
	} catch (err) {
		console.log(err);
		payload.keyword === 'pwd'
			? yield put({type: PWD_FAILURE})
			: yield put({type: WRITE_FAILURE});
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
