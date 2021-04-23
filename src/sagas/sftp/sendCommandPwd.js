import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import {
	commandLsAction,
	PWD_FAILURE,
	PWD_REQUEST,
	PWD_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);
	sftp_ws({
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
		yield put({type: PWD_FAILURE});
		console.log(err);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(PWD_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		const res = yield call(sendCommand, action);
		yield console.log(res);
	}
}

export default function* commandPwdSaga() {
	yield all([fork(watchSendCommand)]);
}
