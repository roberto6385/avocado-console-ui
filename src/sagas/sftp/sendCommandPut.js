import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import {PUT_REQUEST, PUT_SUCCESS} from '../../reducers/sftp';
import {subscribe} from './channel';
import sftp_ws from '../../ws/sftp_ws';
import {messageReader} from './messageReader';

function* sendCommand(action) {
	let channel;
	const {type, payload} = action;
	channel = yield call(subscribe, payload.socket);
	sftp_ws({
		keyword: 'CommandByPut',
		ws: payload.socket,
		path: payload.path,
		uploadFile: payload.uploadFile,
	});

	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, {
				type,
				data,
				payload,
			});
			switch (res.type) {
				case PUT_SUCCESS:
					if (res.last && res.percent === 100) {
						yield console.log('업로드 클리어!');
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
			}
		}
	} catch (err) {
		console.log(err);
	}
}

function* watchSendCommand() {
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
