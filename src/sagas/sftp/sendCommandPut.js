import {
	all,
	call,
	fork,
	take,
	put,
	actionChannel,
	takeEvery,
} from 'redux-saga/effects';
import {
	ADD_HISTORY,
	commandLsAction,
	commandPwdAction,
	EDIT_PUT_SUCCESS,
	FIND_HISTORY,
	PUT_FAILURE,
	PUT_REQUEST,
	PUT_SUCCESS,
	PWD_FAILURE,
	PWD_SUCCESS,
} from '../../reducers/sftp';
import {subscribe} from './channel';
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
		yield call(messageSender, {
			keyword: 'CommandByPut',
			ws: payload.socket,
			path: payload.path,
			uploadFile: payload.file,
		});
	}

	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, {data, payload});
			switch (res.type) {
				case PUT_SUCCESS:
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
							type: PUT_SUCCESS,
							payload: {
								uuid: payload.uuid,
								percent: res.percent,
							},
						});

						return {type: 'end'};
					}
					break;
				case EDIT_PUT_SUCCESS:
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
						return {type: 'end'};
					}
					break;

				case PWD_SUCCESS:
					yield put({
						type: PWD_SUCCESS,
						payload: {
							uuid: payload.uuid,
							path: res.path,
							pathList: res.pathList,
						},
					});
					for (let value of res.pathList) {
						yield put(commandLsAction({...payload, path: value}));
					}
					return {type: 'end'};
			}
		}
	} catch (err) {
		console.log(err);
		payload.keyword === 'pwd'
			? yield put({type: PWD_FAILURE})
			: yield put({type: PUT_FAILURE});
		return {type: 'error'};
	}
}

function* watchSendCommand() {
	// yield takeEvery(PUT_REQUEST, sendCommand);
	const reqChannel = yield actionChannel(PUT_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		const res = yield call(sendCommand, action);
		yield console.log(res);
	}
}

export default function* commandPutSaga() {
	yield all([fork(watchSendCommand)]);
}
