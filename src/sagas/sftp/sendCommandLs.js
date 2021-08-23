import {call, put, take, takeLatest} from 'redux-saga/effects';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';
import {sftpAction} from '../../reducers/renewal';

function setApi(data) {
	const message = new SFTP.Message();
	const request = new SFTP.Request();
	const cmd = new SFTP.CommandRequest();
	const ls = new SFTP.ListDirectoryRequest();

	ls.setPath(data.path);
	cmd.setLs(ls);
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
			console.log(
				response.getResponseCase() ===
					SFTP.Response.ResponseCase.COMMAND,
			);
			if (
				response.getResponseCase() ===
				SFTP.Response.ResponseCase.COMMAND
			) {
				const command = response.getCommand();
				if (
					command.getCommandCase() ===
					SFTP.CommandResponse.CommandCase.LS
				) {
					const ls = command.getLs();
					// console.log('command : ls', ls);

					const entryList = ls.getEntryList();
					// console.log('entry ', entryList.length);

					// const list = [];
					const list = [];
					for (let i = 0; i < entryList.length; i++) {
						const entry = entryList[i];
						// list.push(entry.getLongname());

						// new pure list
						const splitedValue = entry
							.getLongname()
							.replace(/\s{2,}/gi, ' ')
							.split(' ');
						// 나중에 longname에서 가져와야 할 정보나 값이 생기면
						// splitedValue 에서 사용하기 바람.
						// console.log(splitedValue);
						if (entry.getFilename() !== '.')
							list.push({
								name: entry.getFilename(),
								size: entry.getAttributes().getSize(),
								type:
									entry
										.getAttributes()
										.getPermissionsstring()
										.charAt(0) === 'd'
										? 'directory'
										: 'file',
								lastModified: entry
									.getAttributes()
									.getMtimestring(),
								permission: entry
									.getAttributes()
									.getPermissionsstring(),
								link: splitedValue[1],
								owner: splitedValue[2],
								group: splitedValue[3],
							});
					}
					return {list: list};
				} else {
					throw 'getCommandCase is not LS';
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
		yield call(setApi, {socket: payload.socket, path: payload.path});
		const data = yield take(channel);
		const res = yield call(getApi, data);
		console.log(res);
		yield put(
			sftpAction.commandLsDone({
				uuid: payload.uuid,
				path: payload.path,
				files: res.list,
			}),
		);
	} catch (err) {
		console.log(err);
		yield put(sftpAction.commandLsFail({uuid: payload.uuid}));
	}
}

export default function* watcher() {
	yield takeLatest(sftpAction.commandLs, sendCommand);
}
