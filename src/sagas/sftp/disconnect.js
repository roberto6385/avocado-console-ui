import {call, put, take, throttle} from 'redux-saga/effects';
import {sftpAction} from '../../reducers/renewal';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';
import {tabBarAction} from '../../reducers/tabBar';

function setApi(data) {
	const message = new SFTP.Message();
	const request = new SFTP.Request();
	const disconnect = new SFTP.DisconnectRequest();

	request.setDisconnect(disconnect);
	message.setRequest(request);

	console.log(message);

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
				SFTP.Response.ResponseCase.DISCONNECT
			) {
				const disconnect = response.getDisconnect();
				console.log('disconnect : ', disconnect);
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
	try {
		yield put(tabBarAction.deleteTab(payload.uuid));

		const channel = yield call(subscribe, payload.socket);
		yield call(setApi, {socket: payload.socket});
		const data = yield take(channel);
		yield call(getApi, data);
		// 탭을 먼저 제거해야 함
		yield put(sftpAction.disconnectDone({uuid: payload.uuid}));
	} catch (err) {
		console.log(err);
		yield put(sftpAction.disconnectFail({uuid: payload.uuid}));
	}
}

export default function* watcher() {
	yield throttle(1000, sftpAction.disconnect, worker);
}
