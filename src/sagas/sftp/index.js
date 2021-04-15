import {END, eventChannel} from 'redux-saga';
import {
	cancel,
	fork,
	put,
	take,
	all,
	takeLatest,
	call,
} from 'redux-saga/effects';
import {
	CONNECTION_REQUEST,
	CONNECTION_SUCCESS,
	DISCONNECTION_SUCCESS,
	errorAction,
} from '../../reducers/sftp/index';
import SFTP from '../../dist/sftp_pb';
import {OPEN_TAB} from '../../reducers/common';
import sftp_ws from '../../ws/sftp_ws';

import disconnectSaga from './sendDisconnect';

function createWebsocket(payload) {
	const server = payload.server;
	return new Promise((resolve, reject) => {
		const socket = new WebSocket(`ws://${server.host}:8081/ws/sftp`);
		socket.binaryType = 'arraybuffer';

		socket.onopen = function () {
			resolve(socket);
		};

		socket.onerror = function (evt) {
			reject(evt);
		};
	});
}

function createWebsocketChannel(socket) {
	return eventChannel((emit) => {
		socket.onmessage = (event) => {
			emit(event.data);
		};

		socket.onclose = () => {
			emit(END);
		};

		return () => {
			socket.onmessage = null;
		};
	});
}

function* sendConnect({payload}) {
	console.log(payload);
	let socket;
	let socketChannel;
	try {
		socket = yield call(createWebsocket, payload);
		socketChannel = yield call(createWebsocketChannel, socket);
		yield call(sftp_ws, {
			keyword: 'Connection',
			ws: socket,
			token: payload.token,
			data: payload.server,
		});

		// while (true) {
		const data = yield take(socketChannel); // 메시지가 send 될 때
		if (data instanceof ArrayBuffer) {
			const message = SFTP.Message.deserializeBinary(data);
			if (message.getTypeCase() === SFTP.Message.TypeCase.RESPONSE) {
				const response = message.getResponse();
				console.log('response status: ', response.getStatus());
				if (
					response.getResponseCase() ===
					SFTP.Response.ResponseCase.CONNECT
				) {
					const connect = response.getConnect();
					console.log(connect);
					yield put({
						type: CONNECTION_SUCCESS,
						payload: connect.getUuid(),
					});
					yield take(
						CONNECTION_SUCCESS,
						yield put({
							type: OPEN_TAB,
							data: {
								id: payload.server.id,
								type: 'SFTP',
								ws: socket,
								uuid: connect.getUuid(),
								mode: 'list',
								channel: socketChannel,
							},
						}),
					);
				}
			}
		}
		// }
	} catch (err) {
		yield put(errorAction('Error while connecting to the WebSocket'));
	}
}

function* watchSendConnect() {
	yield takeLatest(CONNECTION_REQUEST, sendConnect);
}

export default function* sftpSaga() {
	yield all([yield fork(watchSendConnect), yield fork(disconnectSaga)]);
	yield take(
		DISCONNECTION_SUCCESS,
		yield cancel(yield fork(watchSendConnect)),
	);
}
