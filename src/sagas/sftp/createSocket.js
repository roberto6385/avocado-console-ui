import {call, debounce, put, select, take} from 'redux-saga/effects';
import {sftpAction} from '../../reducers/renewal';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';
import {createWebsocket} from './socket';
import {remoteResourceSelector} from '../../reducers/remoteResource';
import {authSelector} from '../../reducers/api/auth';

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

function* worker(action) {
	const {payload} = action;
	console.log(payload);

	const {resources, accounts} = yield select(remoteResourceSelector.all);
	const {userData} = yield select(authSelector.all);
	const resource = resources.find((v) => v.key === payload.key);
	const account = accounts.find((v) => v.key === payload.key && v.checked);

	try {
		const socket = yield call(createWebsocket);
		const channel = yield call(subscribe, socket);

		yield call(setApi, {
			token: userData.access_token, // connection info
			host: resource.host,
			port: resource.port,
			user: account.user,
			password: account.password,
			socket: socket,
		});
		const data = yield take(channel);
		yield call(getApi, data); //todo multi socket을 사용한다면 uuid를 사용할 수 도?
		yield put(
			sftpAction.createSocketDone({
				socket: socket,
				uuid: payload.uuid,
				type: payload.type,
			}),
		);
		yield put(sftpAction.setOn({uuid: payload.uuid, type: payload.type}));
	} catch (err) {
		console.log(err);
		yield put(sftpAction.createSocketFail());
	}
}

export default function* watcher() {
	yield debounce(1000, sftpAction.createSocket, worker);
}
