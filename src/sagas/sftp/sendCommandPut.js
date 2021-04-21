import {
	all,
	call,
	fork,
	take,
	put,
	takeEvery,
	actionChannel,
} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	ADD_HISTORY,
	PUT_FAILURE,
	PUT_REQUEST,
	PUT_SUCCESS,
	RM_REQUEST,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';

function* messageReader(data, payload) {
	const {uuid, uploadFile} = payload;
	console.log(uploadFile);
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
							// if (
							// 	resPut.getLast() &&
							// 	resPut.getProgress() === 100
							// ) {
							yield put({
								type: PUT_SUCCESS,
								payload: {
									uuid: payload.uuid,
									percent: resPut.getProgress(),
								},
							});
							yield put({
								type: ADD_HISTORY,
								payload: {
									uuid,
									name: uploadFile.name,
									size: uploadFile.size,
									todo: 'put',
									progress: resPut.getProgress(),
								},
							});
							// }
							// yield take(
							// 	PUT_SUCCESS,
							// 	commandLsAction(payload),
							// );
							// }
							return {
								type: PUT_SUCCESS,
								last: resPut.getLast(),
								percent: resPut.getProgress(),
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

function* sendCommand(payload) {
	console.log(payload);
	try {
		yield call(sftp_ws, {
			keyword: 'CommandByPut',
			ws: payload.socket,
			path: payload.path,
			uploadFile: payload.uploadFile,
		});
		// while (true) {
		const channel = yield call(subscribe, payload.socket);
		const data = yield take(channel);
		yield call(messageReader, data, payload);
		// }
	} catch (err) {
		console.log(err);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(PUT_REQUEST);
	while (true) {
		const {payload} = yield take(reqChannel);
		yield call(sendCommand, payload);
		// yield takeLatest(RM_SUCCESS, yield call(commandLsAction, payload));
	}
}

export default function* commandPutSaga() {
	yield all([fork(watchSendCommand)]);
}
