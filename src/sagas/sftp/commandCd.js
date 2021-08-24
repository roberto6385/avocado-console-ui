import {call, put, take, takeLatest} from 'redux-saga/effects';
import {sftpAction} from '../../reducers/renewal';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';

function setApi(data) {
	const message = new SFTP.Message();
	const request = new SFTP.Request();
	const cmd = new SFTP.CommandRequest();
	const cd = new SFTP.ChangeDirectoryRequest();
	cd.setPath(data.path);

	cmd.setCd(cd);
	request.setCommand(cmd);
	message.setRequest(request);
	console.log(message.serializeBinary());
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
				SFTP.Response.ResponseCase.COMMAND
			) {
				const command = response.getCommand();
				if (
					command.getCommandCase() ===
					SFTP.CommandResponse.CommandCase.CD
				) {
					const cd = command.getCd();
					console.log('command : cd', cd);
				} else {
					throw 'getCommandCase is not CD';
				}
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
	if (payload.socket.readyState !== 1) {
		yield put(
			sftpAction.setReady({
				uuid: payload.uuid,
				readyState: payload.socket.readyState,
			}),
		);
		return;
	}
	try {
		const channel = yield call(subscribe, payload.socket);
		yield call(setApi, {path: payload.path, socket: payload.socket});
		const data = yield take(channel);
		yield call(getApi, data);
		yield put(sftpAction.commandCdDone());
		yield put(
			sftpAction.commandPwd({socket: payload.socket, uuid: payload.uuid}),
		);
	} catch (err) {
		console.log(err);
		yield put(sftpAction.commandCdFail());
		// yield put(dialogBoxAction.openAlert({key: 'sftp-wrong-path'}));
	}
}

export default function* watcher() {
	yield takeLatest(sftpAction.commandCd, sendCommand);
}
