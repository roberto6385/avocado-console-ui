import {
	all,
	call,
	fork,
	take,
	put,
	takeEvery,
	takeLatest,
	debounce,
} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	commandLsAction,
	RM_SUCCESS,
	RMDIR_FAILURE,
	RMDIR_REQUEST,
	RMDIR_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';

function* messageReader(data, payload, type) {
	const {uuid} = payload;
	console.log(payload);
	console.log(type);
	console.log(data);
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
					console.log(command);
					switch (command.getCommandCase()) {
						case SFTP.CommandResponse.CommandCase.RMDIR: {
							const rmdir = command.getRmdir();
							console.log('command : rmdir', rmdir);
							yield put({
								type: RMDIR_SUCCESS,
								payload: {
									uuid,
								},
							});
							return {
								type: RMDIR_SUCCESS,
							};
						}
					}
				}
			}
		}
	} catch (err) {
		switch (type) {
			case RMDIR_REQUEST:
				yield put({
					type: RMDIR_FAILURE,
					payload: {
						errorMessage: 'Error while command rmdir',
					},
				});
				break;
		}
	}
}

function* sendCommand(action) {
	try {
		const {type, payload} = action;
		const channel = yield call(subscribe, payload.socket);
		switch (type) {
			case RMDIR_REQUEST:
				yield call(sftp_ws, {
					keyword: 'CommandByRmdir',
					ws: payload.socket,
					path: payload.deletePath,
				});
				break;
			default:
				break;
		}

		while (true) {
			console.log(payload);
			const data = yield take(channel);
			yield call(messageReader, data, payload, type);
			yield takeLatest(
				RMDIR_SUCCESS,
				yield put(commandLsAction(payload)),
			);
		}
	} catch (err) {
		console.log(err);
	}
}

function* watchSendCommand() {
	yield takeEvery(RMDIR_REQUEST, sendCommand);
}

export default function* commandRmdirSaga() {
	yield all([fork(watchSendCommand)]);
}
