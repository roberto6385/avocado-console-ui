import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import {
	ADD_HISTORY,
	commandLsAction,
	INITIALIZING_HIGHLIGHT,
	PWD_SUCCESS,
	RM_FAILURE,
	RM_REQUEST,
	RM_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {subscribe} from './channel';
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
			keyword:
				payload.keyword === 'rm' ? 'CommandByRm' : 'CommandByRmdir',
			ws: payload.socket,
			path: `${payload.path}/${payload.file.name}`,
		});
	}

	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, {data, payload});
			switch (res.type) {
				case RM_SUCCESS:
					console.log(payload.file);
					yield put({type: RM_SUCCESS});
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
					return {type: 'end'};

				case PWD_SUCCESS:
					yield put({
						type: INITIALIZING_HIGHLIGHT,
						payload: {uuid: payload.uuid},
					});
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
		yield put({type: RM_FAILURE});
		return {type: 'error'};
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(RM_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		const res = yield call(sendCommand, action);
		yield console.log(res);
	}
}

export default function* commandRmSaga() {
	yield all([fork(watchSendCommand)]);
}
