import {call, put, take, throttle} from 'redux-saga/effects';
import {subscribe} from '../channel';
import {createWebsocket} from './socket';
import {sftpAction} from '../../reducers/renewal';
import SFTP from '../../dist/sftp_pb';
import {tabBarAction} from '../../reducers/tabBar';

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
		yield put(sftpAction.connectDone({socket: socket, uuid: res.uuid}));
		//todo  extraReducer로 탭 생성할지 할지 고민중
		yield put(
			tabBarAction.addTab({
				uuid: res.uuid,
				type: 'SFTP',
				server: {name: payload.name, key: payload.key},
			}),
		);
		yield put(sftpAction.commandPwd({socket: socket, uuid: res.uuid}));
	} catch (err) {
		console.log(err);
		yield put(sftpAction.connectFail());
	}
}

export default function* watcher() {
	yield throttle(1000, sftpAction.connect, sendCommand);
}
