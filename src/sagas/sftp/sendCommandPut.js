import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	commandLsAction,
	PUT_FAILURE,
	PUT_REQUEST,
	PUT_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {createWebsocketChannel} from './sendConnect';

function* messageReader(data, payload, type) {
	const {uuid} = payload;
	console.log(payload);
	console.log(type);
	console.log(data);
	// return new Promise(function (resolve) {
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
					console.log(command.getCommandCase());
					console.log(SFTP.CommandResponse.CommandCase.PUT);
					switch (command.getCommandCase()) {
						case SFTP.CommandResponse.CommandCase.PUT: {
							const put = command.getPut();
							console.log('command : put', put);
							console.log(put.getProgress());
							// yield call(
							// 	yield put({
							// 		type: PUT_SUCCESS,
							// 		payload: {
							// 			uuid,
							// 			percent: put.getProgress(),
							// 		},
							// 	}),
							// );
							return {
								type: PUT_SUCCESS,
								last: put.getLast(),
								percent: put.getProgress(),
							};
						}
					}
				}
			}
		}
	} catch (err) {
		yield put({
			type: PUT_FAILURE,
			payload: {
				errorMessage: 'Error while upload file',
			},
		});
	}
}

function* sendCommand(action) {
	try {
		const {type, payload} = action;
		const channel = yield call(createWebsocketChannel, payload.socket);
		switch (type) {
			case PUT_REQUEST:
				yield call(sftp_ws, {
					keyword: 'CommandByPut',
					ws: payload.socket,
					path: payload.path,
					uploadFile: payload.uploadFile,
				});
				break;
			default:
				break;
		}

		while (true) {
			console.log(payload);
			const data = yield take(channel);
			const res = yield call(messageReader, data, payload, type);
			console.log(payload);
			console.log(res);

			switch (res.type) {
				case PUT_SUCCESS:
					if (res.last && res.percent === 100) {
						yield put({
							type: PUT_SUCCESS,
							payload: {uuid: payload.uuid, percent: res.percent},
						});
						// rm, rmdir, put 에서 모두
						// sendCommandLs line 109 Error 발생
						// yield put(commandLsAction(payload));
					}
					break;
				default:
					break;
			}
		}
	} catch (err) {
		console.log(err);
		//
	}
}

function* watchSendCommand() {
	yield takeEvery(PUT_REQUEST, sendCommand);
}

export default function* commandPutSaga() {
	yield all([fork(watchSendCommand)]);
}
