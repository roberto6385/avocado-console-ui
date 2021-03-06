import {call, put, take, takeLatest} from 'redux-saga/effects';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';
import {createPathList} from '../../utils/sftp';
import {sftpAction} from '../../reducers/renewal';

function setApi(data) {
	const message = new SFTP.Message();
	const request = new SFTP.Request();
	const cmd = new SFTP.CommandRequest();
	const pwd = new SFTP.PrintWorkingDirectoryRequest();

	cmd.setPwd(pwd);
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
					SFTP.CommandResponse.CommandCase.PWD
				) {
					const pwd = command.getPwd();
					console.log('command : pwd', pwd);

					let list = createPathList({path: pwd.getPath()});

					return {
						path: pwd.getPath(),
						list,
					};
				} else {
					throw 'getCommandCase is not PWD';
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
		yield call(setApi, {socket: payload.socket});
		const data = yield take(channel);
		const res = yield call(getApi, data);
		console.log(res);
		yield put(
			sftpAction.commandPwdDone({
				uuid: payload.uuid,
				path: res.path,
				deleteList: null,
			}),
		);
		for (let v of res.list) {
			yield put(
				sftpAction.commandLs({
					socket: payload.socket,
					path: v,
					uuid: payload.uuid,
				}),
			);
			yield take(sftpAction.commandLsDone);
		}
	} catch (err) {
		console.log(err);
		yield put(sftpAction.commandPwdFail({uuid: payload.uuid}));
	}
}

export default function* watcher() {
	yield takeLatest(sftpAction.commandPwd, worker);
}
