import {
	all,
	call,
	fork,
	take,
	put,
	takeEvery,
	takeLatest,
	actionChannel,
} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	ADD_HISTORY,
	addHistoryAction,
	commandLsAction,
	RM_FAILURE,
	RM_REQUEST,
	RM_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';

function* messageReader(data, payload) {
	const {uuid} = payload;
	console.log(payload);
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
					switch (command.getCommandCase()) {
						case SFTP.CommandResponse.CommandCase.RM: {
							const rm = command.getRm();
							console.log('command : rm', rm);
							yield put({
								type: ADD_HISTORY,
								payload: {
									uuid,
									name: payload.fileName,
									size: payload.fileSize,
									todo: 'rm',
									progress: 100,
								},
							});
							yield put({
								type: RM_SUCCESS,
								payload: {
									uuid,
								},
							});
							return {
								type: RM_SUCCESS,
							};
						}
					}
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({
			type: RM_FAILURE,
			payload: {
				errorMessage: 'Error while command rm',
			},
		});
	}
}

function* sendCommand(payload) {
	try {
		const channel = yield call(subscribe, payload.socket);
		yield call(sftp_ws, {
			keyword: 'CommandByRm',
			ws: payload.socket,
			path: `${payload.path}/${payload.fileName}`,
		});
		const data = yield take(channel);
		yield call(messageReader, data, payload);
	} catch (err) {
		console.log(err);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(RM_REQUEST);
	while (true) {
		const {payload} = yield take(reqChannel);
		yield call(sendCommand, payload);
		// yield takeLatest(RM_SUCCESS, yield call(commandLsAction, payload));
	}
}

export default function* commandRmSaga() {
	yield all([fork(watchSendCommand)]);
}
