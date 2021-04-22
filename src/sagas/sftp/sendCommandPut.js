import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	ADD_HISTORY,
	PUT_FAILURE,
	PUT_REQUEST,
	PUT_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';

function* messageReader(data, payload) {
	try {
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
						case SFTP.CommandResponse.CommandCase.PUT: {
							const resPut = command.getPut();
							console.log('command : put', resPut);
							console.log(resPut.getProgress());
							console.log(resPut.getLast());

							return {
								type: PUT_SUCCESS,
								last: resPut.getLast(),
								percent: resPut.getProgress(),
								uploadFile: payload.uploadFile,
							};
						}
					}
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({
			type: PUT_FAILURE,
			payload: {
				errorMessage: 'Error while upload file',
			},
		});
	}
}

function* sendCommand({payload}) {
	// for (let value of payload.files) {
	const channel = yield call(subscribe, payload.socket);
	// console.log(value);
	yield call(sftp_ws, {
		keyword: 'CommandByPut',
		ws: payload.socket,
		path: payload.path,
		uploadFile: payload.uploadFile,
	});
	try {
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, data, payload);
			if (res.last && res.percent === 100) {
				yield put({
					type: PUT_SUCCESS,
					payload: {
						uuid: payload.uuid,
						percent: res.percent,
					},
				});
				yield put({
					type: ADD_HISTORY,
					payload: {
						uuid: payload.uuid,
						name: res.uploadFile.name,
						size: res.uploadFile.size,
						todo: 'put',
						progress: res.percent,
					},
				});
			}
		}
	} catch (err) {
		console.log(err);
	}
	// }
}

function* watchSendCommand() {
	yield takeEvery(PUT_REQUEST, sendCommand);
	// const reqChannel = yield actionChannel(PUT_REQUEST);
	// while (true) {
	// 	const {payload} = yield take(reqChannel);
	// 	yield call(sendCommand, payload);
	// }
}

export default function* commandPutSaga() {
	yield all([fork(watchSendCommand)]);
}
