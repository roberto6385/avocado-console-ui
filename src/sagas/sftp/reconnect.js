import {call, put, take, throttle} from 'redux-saga/effects';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {tabBarAction} from '../../reducers/tabBar';
import {sftpAction} from '../../reducers/renewal';
import {createWebsocket} from './socket';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';

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

function* worker(action) {
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
		yield put(tabBarAction.deleteTab(payload.prevUuid));
		yield put(
			sftpAction.reconnectDone({
				uuid: payload.prevUuid,
				newUuid: res.uuid,
				socket: socket,
				readyState: socket.readyState,
			}),
		);
		yield put(
			tabBarAction.addTab({
				type: 'SFTP',
				uuid: res.uuid,
				server: {
					id: payload.id,
					name: payload.name,
					key: payload.key,
				},
				prevUuid: payload.prevUuid,
				prevIndex: payload.prevIndex,
			}),
		);
		yield put(
			sftpAction.commandCd({
				socket: socket,
				uuid: res.uuid,
				path: payload.prevPath,
			}),
		);
	} catch (err) {
		console.log(err);
		yield put(dialogBoxAction.openAlert({key: 'invalid-server'}));
		yield put(sftpAction.reconnectFail());
	}
}

export default function* watcher() {
	yield throttle(1000, sftpAction.reconnect, worker);
}
