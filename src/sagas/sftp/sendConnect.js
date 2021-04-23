import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import {
	CONNECTION_FAILURE,
	CONNECTION_REQUEST,
	CONNECTION_SUCCESS,
} from '../../reducers/sftp';
import {subscribe} from './channel';
import sftp_ws from '../../ws/sftp_ws';
import {createWebsocket} from './socket';
import {messageReader} from './messageReader';
import {OPEN_TAB} from '../../reducers/common';

function* sendCommand(action) {
	console.log(action);
	let socket;
	let channel;
	const {type, payload} = action;

	socket = yield call(createWebsocket, payload);
	channel = yield call(subscribe, socket);
	sftp_ws({
		keyword: 'Connection',
		ws: socket,
		data: payload,
	});

	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, {
				type,
				data,
				payload,
				socket,
			});
			switch (res.type) {
				case CONNECTION_SUCCESS:
					yield put({
						type: CONNECTION_SUCCESS,
						payload: {
							uuid: res.uuid,
							socket: socket,
						},
					});
					yield put({
						type: OPEN_TAB,
						data: {
							id: payload.id,
							type: 'SFTP',
							ws: socket,
							uuid: res.uuid,
						},
					});
					return {type: 'end'};
			}
		}
	} catch (err) {
		yield put({type: CONNECTION_FAILURE});
		console.log(err);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(CONNECTION_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		const res = yield call(sendCommand, action);
		yield console.log(res);
	}
}

export default function* connectSaga() {
	yield all([fork(watchSendCommand)]);
}
