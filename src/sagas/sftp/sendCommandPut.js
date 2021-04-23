import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	FIND_HISTORY,
	PUT_FAILURE,
	PUT_REQUEST,
	PUT_SUCCESS,
} from '../../reducers/sftp';
import {subscribe} from './channel';
import sftp_ws from '../../ws/sftp_ws';

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

							yield put({
								type: FIND_HISTORY,
								payload: {
									uuid: payload.uuid,
									name: payload.uploadFile.name,
									size: payload.uploadFile.size,
									todo: payload.keyword,
									progress: resPut.getProgress(),
								},
							});

							return {
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
	const channel = yield call(
		subscribe,
		payload.socket,
		// buffers.expanding(10),
	);
	sftp_ws({
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
				yield console.log('업로드 클리어!');
				yield put({
					type: PUT_SUCCESS,
					payload: {
						uuid: payload.uuid,
						percent: res.percent,
					},
				});
				return {type: 'end'};
			}
		}
	} catch (err) {
		console.log(err);
	}
}

function* watchSendCommand() {
	// yield takeEvery(PUT_REQUEST, sendCommand);
	const reqChannel = yield actionChannel(PUT_REQUEST);
	while (true) {
		const {payload} = yield take(reqChannel);
		const res = yield call(sendCommand, payload);
		yield console.log(res);
	}
}

export default function* commandPutSaga() {
	yield all([fork(watchSendCommand)]);
}
