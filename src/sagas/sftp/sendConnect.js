import {actionChannel, all, call, fork, put, take} from 'redux-saga/effects';
import {
	CONNECTION_FAILURE,
	CONNECTION_REQUEST,
	CONNECTION_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import SFTP from '../../dist/sftp_pb';
import {OPEN_TAB} from '../../reducers/common';
import {subscribe} from './channel';

function createWebsocket(payload) {
	return new Promise((resolve, reject) => {
		const socket = new WebSocket(`ws://${payload.host}:8081/ws/sftp`);
		socket.binaryType = 'arraybuffer';

		socket.onopen = function () {
			resolve(socket);
		};

		socket.onerror = function (evt) {
			reject(evt);
		};
	});
}

function* messageReader(data, payload, socket) {
	console.log(data);
	try {
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
						},
					});
					yield take(
						CONNECTION_SUCCESS,
						yield put({
							type: OPEN_TAB,
							data: {
								id: payload.id,
								type: 'SFTP',
								ws: socket,
								uuid: connect.getUuid(),
								mode: 'list',
							},
						}),
					);
				}
			}
		}
	} catch (err) {
		yield put({
			type: CONNECTION_FAILURE,
			payload: {
				errorMessage: 'Error while command connecting',
			},
		});
	}
}

function* sendCommand(payload) {
	try {
		const socket = yield call(createWebsocket, payload);
		const channel = yield call(subscribe, socket);
		yield call(sftp_ws, {
			keyword: 'Connection',
			ws: socket,
			data: payload,
		});
		const data = yield take(channel); // 메시지가 send 될 때
		yield call(messageReader, data, payload, socket);
	} catch (err) {
		console.log(err);
	}
}

function* watchSendConnect() {
	const reqChannel = yield actionChannel(CONNECTION_REQUEST);
	while (true) {
		const {payload} = yield take(reqChannel);
		yield call(sendCommand, payload);
	}
}
export default function* connectSaga() {
	yield all([fork(watchSendConnect)]);
}
