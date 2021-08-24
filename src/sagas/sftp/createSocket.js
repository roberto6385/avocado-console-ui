import {call, put, take, takeLatest} from 'redux-saga/effects';
import {sftpAction} from '../../reducers/renewal';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';
import {createWebsocket} from './socket';

function setApi(data) {
	const message = new SFTP.Message();
	const request = new SFTP.Request();
	const connect = new SFTP.ConnectRequest();

	connect.setToken(data.token);
	connect.setHost(data.host);
	connect.setUser(data.user);
	connect.setPassword(data.password);
	connect.setPort(data.port);

	// sftp 서버로 alive message 재전송 회수 ( 0 값이면 사용 안 함 )
	connect.setKeepalivecount(2);
	// sftp 서버로 alive message 전송 주기 ( 단위 ms : 1000ms -> 1sec)
	connect.setKeepaliveinterval(60000);

	request.setConnect(connect);
	message.setRequest(request);

	data.socket.send(message.serializeBinary());
}
function getApi(data) {
	if (data instanceof ArrayBuffer) {
		const message = SFTP.Message.deserializeBinary(data);
		if (message.getTypeCase() === SFTP.Message.TypeCase.RESPONSE) {
			const response = message.getResponse();
			console.log(response);
			console.log('response status: ', response.getStatus());

			if (
				response.getResponseCase() ===
				SFTP.Response.ResponseCase.CONNECT
			) {
				const connect = response.getConnect();
				return {uuid: connect.getUuid()};
			} else if (
				response.getResponseCase() === SFTP.Response.ResponseCase.ERROR
			) {
				const error = response.getError();
				console.log(error.getMessage());
				throw error.getMessage();
			}
		} else {
			throw 'data is not protocol buffer.';
		}
	} else {
		const message = JSON.parse(data);
		console.log('data is not ArrayBuffer', message);

		if (message['status'] === 'connected') {
			console.log(message['uuid']);
		}
		console.log(message.result);
	}
}

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);

	try {
		const socket = yield call(createWebsocket);
		const channel = yield call(subscribe, socket);

		yield call(setApi, {
			...payload,
			socket: socket,
		});
		const data = yield take(channel);
		const res = yield call(getApi, data);
		console.log(res.uuid); // uuid
		yield put(
			sftpAction.createSocketDone({
				socket: socket,
				uuid: payload.uuid,
				type: payload.type,
			}),
		);

		for (let v of payload.selected) {
			yield put(
				sftpAction.addList({
					uuid: payload.uuid,
					type: payload.type,
					value: {path: payload.path, file: v},
				}),
			);
			if (v.type === 'directory') {
				yield put(
					sftpAction.searchDirectory({
						socket: socket,
						uuid: payload.uuid,
						type: payload.type,
						path: payload.path,
						file: v,
					}),
				);
			}
		}
	} catch (err) {
		console.log(err);
		yield put(sftpAction.createSocketFail());
	}
}

export default function* watcher() {
	yield takeLatest(sftpAction.createSocket, sendCommand);
}
