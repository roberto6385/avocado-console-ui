import {call, put, take, takeEvery} from 'redux-saga/effects';
import {subscribe} from '../channel';
import {sftpAction} from '../../reducers/renewal';
import SFTP from '../../dist/sftp_pb';

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
		const channel = yield call(subscribe, payload.socket);
		yield call(setApi, {socket: payload.socket});
		const data = yield take(channel);
		yield call(getApi, data);
		yield put(
			sftpAction.deleteSocketDone({
				uuid: payload.uuid,
				type: payload.type,
			}),
		);
		yield put(sftpAction.setOn({uuid: payload.uuid, type: payload.type}));
	} catch (err) {
		console.log(err);
		yield put(
			sftpAction.deleteSocketFail({
				uuid: payload.uuid,
				type: payload.type,
			}),
		);
	}
}

export default function* removeWebsocketSaga() {
	yield takeEvery(sftpAction.deleteSocket, sendCommand);
}
