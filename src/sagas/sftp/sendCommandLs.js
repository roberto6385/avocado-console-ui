import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import {LS_FAILURE, LS_REQUEST, LS_SUCCESS} from '../../reducers/sftp';
import messageSender from './messageSender';
import {subscribe} from './channel';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);
	yield call(messageSender, {
		keyword: 'CommandByLs',
		ws: payload.socket,
		path: payload.path,
	});

	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, {data, payload});
			switch (res.type) {
				case LS_SUCCESS:
					yield put({
						type: LS_SUCCESS,
						payload: {
							uuid: payload.uuid,
							fileList: res.fileList,
						},
					});
					return {type: 'end'};
			}
		}
	} catch (err) {
		yield put({type: LS_FAILURE});
		console.log(err);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(LS_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		const res = yield call(sendCommand, action);
		yield console.log(res);
	}
}

export default function* commandLsSaga() {
	yield all([fork(watchSendCommand)]);
}
