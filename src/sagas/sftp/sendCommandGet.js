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
	CHANGE_MODE,
	EDIT_GET_SUCCESS,
	FIND_HISTORY,
	GET_FAILURE,
	GET_REQUEST,
	GET_SUCCESS,
	SAVE_EDITTEXT,
	SAVE_FILE_FOR_EDIT,
	SAVE_TEXT,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from '../channel';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);

	const filepath =
		payload.path === '/'
			? `${payload.path}${payload.file.name}`
			: `${payload.path}/${payload.file.name}`;

	yield call(messageSender, {
		keyword: 'CommandByGet',
		ws: payload.socket,
		path: filepath,
		fileName: payload.file.name,
	});
	try {
		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(1000),
				data: take(channel),
			});
			if (timeout) {
				console.log('GET 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				const res = yield call(messageReader, {data, payload});

				switch (res.type) {
					case GET_SUCCESS:
						yield put({
							type: FIND_HISTORY,
							payload: {
								uuid: payload.uuid,
								name: payload.file.name,
								todo: payload.keyword,
								progress: res.percent,
							},
						});
						if (res.last && res.percent === 100) {
							yield put({
								type: GET_SUCCESS,
								payload: {
									uuid: payload.uuid,
									percent: res.percent,
								},
							});
						}
						break;

					case EDIT_GET_SUCCESS:
						yield put({
							type: FIND_HISTORY,
							payload: {
								uuid: payload.uuid,
								name: payload.file.name,
								todo: payload.keyword,
								progress: res.percent,
							},
						});
						if (res.last && res.percent === 100) {
							yield put({
								type: EDIT_GET_SUCCESS,
								payload: {
									uuid: payload.uuid,
									percent: res.percent,
								},
							});
							yield put({
								type: SAVE_TEXT,
								payload: {uuid: payload.uuid, text: res.text},
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
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: GET_FAILURE});
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(GET_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		yield call(sendCommand, action);
	}
}

export default function* commandGetSaga() {
	yield all([fork(watchSendCommand)]);
}
