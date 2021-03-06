import {
	call,
	delay,
	put,
	race,
	select,
	take,
	takeLatest,
} from 'redux-saga/effects';
import {sftpAction, sftpSelector, types} from '../../reducers/renewal';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';
import {pathFormatter} from '../../utils/sftp';

const readChunkSize = 1024 * 56; // 56 //read_chunkSize
let percent = 0;
let accumulatedByte = 0;

let fileBuffer = new ArrayBuffer(0);

const appendBuffer = (buffer1, buffer2) => {
	const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
	tmp.set(new Uint8Array(buffer1), 0);
	tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
	return tmp.buffer;
};

function setApi(data) {
	const message = new SFTP.Message();
	const request = new SFTP.Request();
	const cmd = new SFTP.CommandRequest();
	const read = new SFTP.ReadFileRequest();

	read.setPath(data.path);
	read.setOffset(data.offset);
	read.setLength(data.length);
	read.setCompleted(data.completed);

	cmd.setReadfile(read);
	request.setCommand(cmd);
	message.setRequest(request);

	data.socket.send(message.serializeBinary());
}

function getApi({data, file}) {
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
					SFTP.CommandResponse.CommandCase.READFILE
				) {
					const read = command.getReadfile();
					const data = read.getData_asU8();
					fileBuffer = appendBuffer(fileBuffer, data);

					console.log('command : read file', read);
					console.log(read.getReadbytes(), file.name);

					if (read.getCompleted() === false) {
						accumulatedByte += read.getReadbytes();
					}
					percent = (accumulatedByte * 100) / file.size;

					console.log('accumulatedByte : ' + accumulatedByte);
					console.log('percent : ' + percent);

					if (read.getCompleted()) {
						const blob = new Blob([fileBuffer]);
						const url = URL.createObjectURL(blob);

						const a = document.createElement('a');
						document.body.appendChild(a);
						a.setAttribute('hidden', true);
						a.href = url;
						a.download = file.name;
						a.click();
						window.URL.revokeObjectURL(url);
						fileBuffer = new ArrayBuffer(0);
					}
					if (read.getReadbytes() === -1) {
						accumulatedByte = 0;
						percent = 0;
					}
					return {
						accByte: accumulatedByte,
						ending:
							read.getReadbytes() === -1
								? true
								: accumulatedByte === file.size,
						completion: read.getCompleted(),
						percent: read.getReadbytes() === -1 ? 100 : percent,
					};
				} else {
					throw 'getCommandCase is not READFILE';
				}
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
	let leftover = null;

	try {
		const channel = yield call(subscribe, state.download.socket);
		const item = state.download.list.slice().shift();
		if (!item) {
			yield put(
				sftpAction.deleteSocket({
					socket: state.download.socket,
					uuid: payload.uuid,
					type: types.download,
				}),
			);
		} else {
			accumulatedByte = item.offset ? item.offset : 0;
			percent = item.percent ? item.percent : 0;

			yield put(
				sftpAction.deleteList({
					uuid: payload.uuid,
					type: types.download,
				}),
			);

			const path = pathFormatter(item.path, item.file.name);

			yield call(setApi, {
				socket: state.download.socket,
				path: path,
				offset: accumulatedByte,
				length: readChunkSize,
				completed: false,
			});
			while (true) {
				const {timeout, data} = yield race({
					timeout: delay(2000),
					data: take(channel),
				});
				if (timeout) {
					yield put(
						sftpAction.setLeftover({
							uuid: payload.uuid,
							type: types.download,
							item: {
								...item,
								offset: leftover.accByte,
								percent: leftover.percent,
							},
						}),
					);
					yield take(sftpAction.commandRead);
				} else {
					// const data = yield take(channel);
					const res = yield call(getApi, {data, file: item.file});
					console.log(res);
					leftover = res;
					yield put(
						sftpAction.setHistoryProgress({
							uuid: payload.uuid,
							link: item.link,
							progress: res.percent,
						}),
					);
					if (!res.completion) {
						yield call(setApi, {
							socket: state.download.socket,
							path: path,
							offset: res.ending ? res.accByte : res.accByte + 1,
							length: readChunkSize,
							completed: res.ending,
						});
					} else {
						console.log('commandReadDone');
						yield put(sftpAction.commandReadDone());
						yield put(sftpAction.commandRead({uuid: payload.uuid}));
					}
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put(sftpAction.commandReadFail());
	}
}

export default function* watcher() {
	yield takeLatest(sftpAction.commandRead, worker);
}
