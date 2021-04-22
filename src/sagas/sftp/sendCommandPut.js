import {
	all,
	call,
	fork,
	take,
	put,
	takeEvery,
	actionChannel,
	flush,
	delay,
} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	ADD_HISTORY,
	PUT_FAILURE,
	PUT_REQUEST,
	PUT_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';
import {buffers} from 'redux-saga';

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

							// if (
							// 	resPut.getLast() &&
							// 	resPut.getProgress() === 100
							// ) {
							// }

							return {
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
	const channel = yield call(
		subscribe,
		payload.socket,
		buffers.expanding(10),
	);

	console.log(payload.uploadFile);

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
						name: payload.uploadFile.name,
						size: payload.uploadFile.size,
						todo: payload.keyword,
						progress: res.percent,
					},
				});
			}
			yield delay(100);
		}
	} catch (err) {
		console.log(err);
	}
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
