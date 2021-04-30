import {all, call, fork, take, put, takeLatest} from 'redux-saga/effects';
import {
	commandLsAction,
	PWD_FAILURE,
	PWD_REQUEST,
	PWD_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {messageReader} from './messageReader';
import {subscribe} from './channel';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);
	yield call(messageSender, {
		keyword: 'CommandByPwd',
		ws: payload.socket,
	});

	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, {data, payload});
			console.log(res);
			switch (res.type) {
				case PWD_SUCCESS:
					console.log(res.path);
					console.log(res.pathList);
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
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: PWD_FAILURE});
	}
}

function* watchSendCommand() {
	yield takeLatest(PWD_REQUEST, sendCommand);
}

export default function* commandPwdSaga() {
	yield all([fork(watchSendCommand)]);
}
