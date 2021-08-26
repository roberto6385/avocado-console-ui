import {call, put, select, take, takeLatest} from 'redux-saga/effects';
import {sftpAction, sftpSelector} from '../../reducers/renewal';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';
import {pathFormatter} from '../../utils/sftp';

function setRmdirApi(data) {
	const message = new SFTP.Message();
	const request = new SFTP.Request();
	const cmd = new SFTP.CommandRequest();
	const rmdir = new SFTP.RemoveDirectoryRequest();
	rmdir.setPath(data.path);

	cmd.setRmdir(rmdir);
	request.setCommand(cmd);
	message.setRequest(request);

	data.socket.send(message.serializeBinary());
}

function setRmApi(data) {
	const message = new SFTP.Message();
	const request = new SFTP.Request();
	const cmd = new SFTP.CommandRequest();
	const rm = new SFTP.RemoveFileRequest();
	rm.setPath(data.path);

	cmd.setRm(rm);
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
	const {sftp} = yield select(sftpSelector.all);
	const state = sftp.find((v) => v.uuid === payload.uuid);

	try {
		const channel = yield call(subscribe, state.delete.socket);
		const item = state.delete.list.slice().shift();
		if (!item) {
			console.log('종료');
			yield put(
				sftpAction.deleteSocket({
					socket: state.delete.socket,
					uuid: payload.uuid,
					type: 'delete',
				}),
			);
			yield take(sftpAction.deleteSocketDone);
			yield put(
				sftpAction.commandPwd({
					socket: state.socket,
					uuid: payload.uuid,
				}),
			);
		} else {
			yield put(
				sftpAction.deleteList({
					uuid: payload.uuid,
					type: 'delete',
				}),
			);

			const path = pathFormatter(item.path, item.file.name);
			if (item.file.type === 'file') {
				yield call(setRmApi, {
					socket: data.delete.socket,
					path: path,
				});
			} else {
				yield call(setRmdirApi, {
					socket: data.delete.socket,
					path: path,
				});
			}
			const data = yield take(channel);
			yield call(getApi, data);
			yield put(
				sftpAction.setHistoryProgress({
					uuid: payload.uuid,
					link: item.link,
					progress: 100,
				}),
			);
			yield put(sftpAction.commandRemoveDone());
			yield put(sftpAction.commandRemove({uuid: payload.uuid}));
		}
	} catch (err) {
		console.log(err);
		yield put(sftpAction.commandRemoveFail());
	}
}

export default function* watcher() {
	yield takeLatest(sftpAction.commandRemove, worker);
}
