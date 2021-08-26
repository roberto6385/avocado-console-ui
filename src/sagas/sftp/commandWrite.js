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

const writeChunkSize = 1024 * 4; //write_chunkSize
let percent = 0;
let accumulatedByte = 0;

function setApi(data) {
	const sendBuffer = (buffer) => {
		const message = new SFTP.Message();
		const request = new SFTP.Request();
		const cmd = new SFTP.CommandRequest();
		const write = new SFTP.WriteFileRequest();

		write.setPath(data.path);
		write.setOffset(data.offset);
		write.setLength(data.length);
		write.setData(Buffer.from(buffer)); // 파일 전송 데이터.
		write.setCompleted(data.completed); // 전체 전송 후에는 true로 설정.
		write.setMode(data.mode); // 처음 파일 전송

		cmd.setWritefile(write);
		request.setCommand(cmd);
		message.setRequest(request);

		data.socket.send(message.serializeBinary());
	};

	const readBytes = (file, slice) => {
		const reader = new FileReader();

		return new Promise((resolve) => {
			reader.onload = (e) => {
				resolve(e.target.result);
			};
			const blob = file.slice(slice.offset, slice.length);
			reader.readAsArrayBuffer(blob);
		});
	};

	const readFile = (file, slice) => {
		readBytes(file, slice).then((buffer) => {
			// send protocol buffer
			console.log('read arraybuffer : ', buffer);
			sendBuffer(buffer);
		});
	};

	readFile(data.file, {
		offset: data.offset,
		length: data.length + data.offset,
	});
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
					SFTP.CommandResponse.CommandCase.WRITEFILE
				) {
					const write = command.getWritefile();
					console.log('command : write file', write);
					console.log(write.getWritebytes(), file.name);

					if (write.getCompleted() === false) {
						accumulatedByte += write.getWritebytes();
					}

					percent = (accumulatedByte * 100) / file.size;

					if (write.getWritebytes() === -1 || write.getCompleted()) {
						accumulatedByte = 0;
						percent = 0;
					}

					return {
						accByte: accumulatedByte,
						ending:
							write.getWritebytes() === -1
								? true
								: accumulatedByte === file.size,
						completion: write.getCompleted(),
						percent: write.getWritebytes() === -1 ? 100 : percent,
					};
				} else {
					throw 'getCommandCase is not WRITEFILE';
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
		const channel = yield call(subscribe, state.upload.socket);
		const item = state.upload.list.slice().shift();

		if (!item) {
			yield put(
				sftpAction.deleteSocket({
					socket: state.upload.socket,
					uuid: payload.uuid,
					type: 'upload',
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
			accumulatedByte = item.offset ? item.offset : 0;
			percent = item.percent ? item.percent : 0;

			yield put(
				sftpAction.deleteList({
					uuid: payload.uuid,
					type: 'upload',
				}),
			);
			const path = pathFormatter(item.path, item.file.name);
			yield call(setApi, {
				socket: state.upload.socket,
				path: path,
				file: item.file,
				offset: accumulatedByte,
				length: item.offset ? 0 : writeChunkSize,
				completed: false,
				mode: item.offset ? 2 : 1,
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
							type: types.upload,
							item: {
								...item,
								offset: leftover.accByte,
								percent: leftover.percent,
							},
						}),
					);
					yield take(sftpAction.commandWrite);
				} else {
					const res = yield call(getApi, {data, file: item.file});
					leftover = res;
					console.log(res);
					yield put(
						sftpAction.setHistoryProgress({
							uuid: payload.uuid,
							link: item.link,
							progress: res.percent,
						}),
					);
					if (!res.completion) {
						yield call(setApi, {
							socket: state.upload.socket,
							path: path,
							file: item.file,
							offset: res.accByte,
							length: writeChunkSize,
							completed: res.ending,
							mode: 2,
						});
					} else {
						console.log('commandWriteDone');
						yield put(sftpAction.commandWriteDone());
						yield put(
							sftpAction.commandWrite({uuid: payload.uuid}),
						);
					}
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put(sftpAction.commandWriteFail());
	}
}

export default function* watcher() {
	yield takeLatest(sftpAction.commandWrite, worker);
}
