import {call, put, select, take, takeLatest} from 'redux-saga/effects';
import {sftpAction, sftpSelector} from '../../reducers/renewal';
import {subscribe} from '../channel';
import SFTP from '../../dist/sftp_pb';

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
	const {data} = yield select(sftpSelector.all);
	const sftp = data.find((v) => v.uuid === payload.uuid);
	try {
		const channel = yield call(subscribe, sftp.download.socket);
		const item = sftp.download.list.slice().shift();
		if (!item) {
			yield put(
				sftpAction.deleteSocket({
					socket: sftp.download.socket,
					uuid: payload.uuid,
					type: 'download',
				}),
			);
		} else {
			yield put(
				sftpAction.deleteList({
					uuid: payload.uuid,
					type: 'download',
				}),
			);

			const path =
				item.path === '/'
					? item.path + item.file.name
					: `${item.path}/${item.file.name}`;

			yield call(setApi, {
				socket: sftp.download.socket,
				path: path,
				offset: 0,
				length: readChunkSize,
				completed: false,
			});
			while (true) {
				const data = yield take(channel);
				const res = yield call(getApi, {data, file: item.file});
				console.log(res);
				if (!res.completion) {
					yield call(setApi, {
						socket: sftp.download.socket,
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
	} catch (err) {
		console.log(err);
	}
}

export default function* watcher() {
	yield takeLatest(sftpAction.commandRead, worker);
}
