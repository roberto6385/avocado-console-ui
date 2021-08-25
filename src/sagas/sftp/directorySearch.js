import {call, put, select, take, takeLatest} from 'redux-saga/effects';
import {sftpAction, sftpSelector, types} from '../../reducers/renewal';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';

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
					const entryList = ls.getEntryList();

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
	const {data} = yield select(sftpSelector.all);
	const sftp = data.find((v) => v.uuid === payload.uuid);
	try {
		const channel = yield call(subscribe, sftp.search.socket);
		const item = sftp.search.list.slice().shift();
		if (!item) {
			yield put(
				sftpAction.deleteSocket({
					socket: sftp.search.socket,
					uuid: payload.uuid,
					type: types.search,
				}),
			);
			if (!sftp.delete.socket) {
				yield put(
					sftpAction.createSocket({
						uuid: payload.uuid,
						key: payload.key,
						type: types.delete,
					}),
				);
			}
		} else {
			yield put(
				sftpAction.addList({
					uuid: payload.uuid,
					type: types.delete,
					value: item,
				}),
			);
			yield put(
				sftpAction.deleteList({
					uuid: payload.uuid,
					type: types.search,
				}),
			);

			if (item.file.type === 'directory') {
				const path =
					item.path === '/'
						? item.path + item.file.name
						: `${item.path}/${item.file.name}`;
				yield call(setApi, {
					socket: sftp.search.socket,
					path: path,
				});
				const data = yield take(channel);
				const res = yield call(getApi, data);
				console.log(res);
				const work = res.list.slice().filter((v) => v.name !== '..');
				console.log(work);
				for (let v of work) {
					yield put(
						sftpAction.addList({
							uuid: payload.uuid,
							type: types.search,
							value: {path: path, file: v},
						}),
					);
				}
			}
			yield put(
				sftpAction.searchDirectory({
					uuid: payload.uuid,
					key: payload.key,
				}),
			);
		}
	} catch (err) {
		console.log(err);
		yield put(sftpAction.searchDirectoryFail({uuid: payload.uuid}));
	}
}

export default function* watcher() {
	yield takeLatest(sftpAction.searchDirectory, worker);
}
