import {all, call, fork, put, take, takeLatest} from 'redux-saga/effects';
import {
	CONNECTION_FAILURE,
	CONNECTION_REQUEST,
	CONNECTION_SUCCESS,
	errorAction,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import SFTP from '../../dist/sftp_pb';
import {OPEN_TAB} from '../../reducers/common';
import {subscribe} from './channel';
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

function* sendConnect({payload}) {
	console.log(payload);
	let socket;
	let socketChannel;
	try {
		socket = yield call(createWebsocket, payload);
		socketChannel = yield call(subscribe, socket);
		yield call(sftp_ws, {
			keyword: 'Connection',
			ws: socket,
			token: payload.token,
			data: payload.server,
		});
		while (true) {
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
							payload: {
								uuid: connect.getUuid(),
								socket,
								responseStatus: response.getStatus(),
								channel: socketChannel,
							},
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
		}
	} catch (err) {
		yield put(errorAction('Error while connecting to the WebSocket'));
		yield put({type: CONNECTION_FAILURE});
	}
}

function* watchSendConnect() {
	yield takeLatest(CONNECTION_REQUEST, sendConnect);
}
export default function* connectSaga() {
	yield all([fork(watchSendConnect)]);
}
