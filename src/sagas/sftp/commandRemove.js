import {call, put, take, takeLatest} from 'redux-saga/effects';
import {sftpAction} from '../../reducers/renewal';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';

const setRmdirApi = (data) => {
	const message = new SFTP.Message();
	const request = new SFTP.Request();
	const cmd = new SFTP.CommandRequest();
	const rmdir = new SFTP.RemoveDirectoryRequest();
	rmdir.setPath(data.path);

	cmd.setRmdir(rmdir);
	request.setCommand(cmd);
	message.setRequest(request);

	data.socket.send(message.serializeBinary());
};

const setRmApi = (data) => {
	const message = new SFTP.Message();
	const request = new SFTP.Request();
	const cmd = new SFTP.CommandRequest();
	const rm = new SFTP.RemoveFileRequest();
	rm.setPath(data.path);

	cmd.setRm(rm);
	request.setCommand(cmd);
	message.setRequest(request);

	data.socket.send(message.serializeBinary());
};

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
					SFTP.CommandResponse.CommandCase.RM
				) {
					const rm = command.getRm();
					console.log('command : rm', rm);
				} else if (
					command.getCommandCase() ===
					SFTP.CommandResponse.CommandCase.RMDIR
				) {
					const rmdir = command.getRmdir();
					console.log('command : rmdir', rmdir);
				} else {
					throw 'getCommandCase is not RM or RMDIR';
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
	try {
		const channel = yield call(subscribe, payload.socket);
		if (payload.type === 'file') {
			yield call(setRmApi, {
				socket: payload.socket,
				path: payload.path,
			});
		} else {
			yield call(setRmdirApi, {
				socket: payload.socket,
				path: payload.path,
			});
		}
		const data = yield take(channel);
		yield call(getApi, data);
		yield put(sftpAction.commandRemoveDone());
	} catch (err) {
		console.log(err);
		yield put(sftpAction.commandRemoveFail());
	}
}

export default function* watcher() {
	yield takeLatest(sftpAction.commandRemove, sendCommand);
}
