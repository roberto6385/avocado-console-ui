import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	CHANGE_MODE,
	EDIT_REQUEST,
	EDIT_SUCCESS,
	SAVE_EDITTEXT,
	SAVE_FILE_FOR_EDIT,
	SAVE_TEXT,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';
let fileBuffer = new ArrayBuffer(0);

const appendBuffer = (buffer1, buffer2) => {
	var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
	tmp.set(new Uint8Array(buffer1), 0);
	tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
	return tmp.buffer;
};

let getReceiveSum = 0;

async function messageReader(data) {
	if (data instanceof ArrayBuffer) {
		const message = SFTP.Message.deserializeBinary(data);

		if (message.getTypeCase() === SFTP.Message.TypeCase.RESPONSE) {
			const response = message.getResponse();
			console.log('response status: ', response.getStatus());
			if (
				response.getResponseCase() ===
				SFTP.Response.ResponseCase.COMMAND
			) {
				const command = response.getCommand();
				switch (command.getCommandCase()) {
					case SFTP.CommandResponse.CommandCase.GET: {
						const get = command.getGet();
						console.log('command : get', get);

						const data = get.getData_asU8();
						fileBuffer = appendBuffer(fileBuffer, data);

						// 프로그래스바
						var sum = getReceiveSum + data.length;
						const percent = (sum * 100) / get.getFilesize();
						// 여기서 progress bar?
						console.log(percent);
						console.log(get.getLast());

						let text = '';
						if (get.getLast() === true) {
							const blob = new Blob([fileBuffer]);
							text = await new Response(blob).text();
							fileBuffer = new ArrayBuffer(0);
						}
						return {
							type: EDIT_SUCCESS,
							last: get.getLast(),
							percent,
							text,
						};
					}
				}
			}
		}
	}
}

function* sendCommand({payload}) {
	console.log(payload);
	const channel = yield call(subscribe, payload.socket);
	console.log(payload.editFile);
	yield call(sftp_ws, {
		keyword: 'CommandByGet',
		ws: payload.socket,
		path: payload.path,
		fileName: payload.editFile.fileName,
	});
	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, data);
			if (res && res.last && res.percent === 100) {
				yield put({
					type: EDIT_SUCCESS,
					payload: {
						uuid: payload.uuid,
						percent: res.percent,
					},
				});
				yield put({
					type: SAVE_TEXT,
					payload: {uuid: payload.uuid, text: res.text},
				});
				yield put({
					type: SAVE_EDITTEXT,
					payload: {uuid: payload.uuid, editText: res.text},
				});
				yield put({
					type: SAVE_FILE_FOR_EDIT,
					payload: {uuid: payload.uuid, editFile: payload.editFile},
				});
				yield put({
					type: CHANGE_MODE,
					payload: {
						uuid: payload.uuid,
						mode: 'edit',
					},
				});
			}
		}
	} catch (err) {
		console.log(err);
	}
}

function* watchSendCommand() {
	yield takeEvery(EDIT_REQUEST, sendCommand);
}

export default function* commandEditSaga() {
	yield all([fork(watchSendCommand)]);
}
