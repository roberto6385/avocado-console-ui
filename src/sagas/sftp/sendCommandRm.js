import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import {
	ADD_HISTORY,
	RM_FAILURE,
	RM_REQUEST,
	RM_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);
	yield call(sftp_ws, {
		keyword: payload.keyword === 'rm' ? 'CommandByRm' : 'CommandByRmdir',
		ws: payload.socket,
		path: `${payload.path}/${payload.fileName}`,
	});

	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, {data, payload});
			switch (res.type) {
				case RM_SUCCESS:
					yield put({type: RM_SUCCESS});
					yield put({
						type: ADD_HISTORY,
						payload: {
							uuid: payload.uuid,
							name: payload.fileName,
							size: payload.fileSize,
							todo: 'rm',
							progress: 100,
						},
					});
					return {type: 'end'};
			}
		}
	} catch (err) {
		yield put({type: RM_FAILURE});

		console.log(err);
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
