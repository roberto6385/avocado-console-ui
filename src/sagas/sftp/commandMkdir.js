import {call, put, take, takeLatest} from 'redux-saga/effects';
import {sftpAction} from '../../reducers/renewal';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';

function setApi(data) {
	const message = new SFTP.Message();
	const request = new SFTP.Request();
	const cmd = new SFTP.CommandRequest();
	const mkdir = new SFTP.MakeDirectoryRequest();
	mkdir.setPath(data.path);

	cmd.setMkdir(mkdir);
	request.setCommand(cmd);
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
				SFTP.Response.ResponseCase.COMMAND
			) {
				const command = response.getCommand();
				if (
					command.getCommandCase() ===
					SFTP.CommandResponse.CommandCase.MKDIR
				) {
					const mkdir = command.getMkdir();
					console.log('command : mkdir', mkdir);
				} else {
					throw 'getCommandCase is not MKDIR';
				}
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
		const channel = yield call(subscribe, payload.socket);
		yield call(setApi, {socket: payload.socket, path: payload.path});
		const data = yield take(channel);
		yield call(getApi, data);
		yield put(sftpAction.commandMkdirDone());
		yield put(
			sftpAction.commandPwd({socket: payload.socket, uuid: payload.uuid}),
		);
	} catch (err) {
		console.log(err);
		yield put(sftpAction.commandMkdirFail());
	}
}

export default function* watcher() {
	yield takeLatest(sftpAction.commandMkdir, worker);
}
