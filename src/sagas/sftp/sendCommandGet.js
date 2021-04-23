import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import {
	FIND_HISTORY,
	GET_FAILURE,
	GET_REQUEST,
	GET_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload, type} = action;
	const channel = yield call(subscribe, payload.socket);

	yield call(sftp_ws, {
		keyword: 'CommandByGet',
		ws: payload.socket,
		path: payload.path,
		fileName: payload.fileName,
	});
	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, {type, data, payload});

			switch (res.type) {
				case GET_SUCCESS:
					yield put({
						type: FIND_HISTORY,
						payload: {
							uuid: payload.uuid,
							name: payload.fileName,
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
						return {type: 'end'};
					}
					break;
			}
		}
	} catch (err) {
		yield put({type: GET_FAILURE});
		console.log(err);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(GET_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		const res = yield call(sendCommand, action);
		yield console.log(res);
	}
}

export default function* commandGetSaga() {
	yield all([fork(watchSendCommand)]);
}
