import {
	call,
	put,
	take,
	select,
	actionChannel,
	race,
	delay,
} from 'redux-saga/effects';
import {sftpAction, sftpSelector} from '../../reducers/renewal';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';
import {remoteResourceSelector} from '../../reducers/remoteResource';
import {authSelector} from '../../reducers/api/auth';

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

function* worker(action) {
	const {payload} = action;
	console.log(payload);

	try {
		yield put(
			sftpAction.addList({
				uuid: payload.uuid,
				type: 'delete',
				value: {path: payload.path, file: payload.file},
			}),
		);
		if (payload.file.type === 'directory') {
			const channel = yield call(subscribe, payload.socket);
			const path =
				payload.path === '/'
					? payload.path + payload.file.name
					: `${payload.path}/${payload.file.name}`;

			yield call(setApi, {
				socket: payload.socket,
				path: path,
			});

			const data = yield take(channel);
			const res = yield call(getApi, data);

			console.log(res);
			const work = res.list.slice().filter((v) => v.name !== '..');
			console.log(work);
			if (work.length === 0) {
				yield put(
					sftpAction.addList({
						uuid: payload.uuid,
						type: 'delete',
						value: {path: payload.path, file: payload.file},
					}),
				);
			} else {
				for (let v of work) {
					yield put(
						sftpAction.searchDirectory({
							socket: payload.socket,
							uuid: payload.uuid,
							type: 'delete',
							path: path,
							file: v,
						}),
					);
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put(sftpAction.searchDirectoryFail({uuid: payload.uuid}));
	}
}

export default function* watcher() {
	const takeChannel = yield actionChannel(sftpAction.searchDirectory);
	let uuid = null;
	while (true) {
		const {timeout, action} = yield race({
			timeout: delay(1000),
			action: take(takeChannel),
		});
		if (timeout) {
			if (uuid) {
				const {data} = yield select(sftpSelector.all);
				const sftp = data.find((v) => v.uuid === uuid);
				console.log(sftp.delete.list);
				for (let v of sftp.delete.list) {
					yield put(
						sftpAction.commandRemove({
							socket: sftp.delete.socket,
							path:
								v.path === '/'
									? v.path + v.file.name
									: `${v.path}/${v.file.name}`,
							type: v.file.type,
							uuid: uuid,
						}),
					);
					yield take(sftpAction.commandRemoveDone);
				}
				yield put(
					sftpAction.deleteSocket({
						socket: sftp.delete.socket,
						uuid: uuid,
						type: 'delete',
					}),
				);
				yield put(
					sftpAction.commandPwd({socket: sftp.socket, uuid: uuid}),
				);
				uuid = null;
			}
			yield take(sftpAction.searchDirectory);
		} else {
			uuid = action.payload.uuid;
			yield call(worker, action);
		}
	}
}
