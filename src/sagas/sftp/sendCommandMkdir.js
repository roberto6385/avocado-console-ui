import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	commandLsAction,
	MKDIR_FAILURE,
	MKDIR_REQUEST,
	MKDIR_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';

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

					switch (command.getCommandCase()) {
						case SFTP.CommandResponse.CommandCase.MKDIR: {
							const mkdir = command.getMkdir();
							console.log('command : mkdir', mkdir);
							yield put({
								type: MKDIR_SUCCESS,
								payload: {
									uuid,
								},
							});
							return {
								type: MKDIR_SUCCESS,
							};
						}
					}
				}
			}
		}
	} catch (err) {
		switch (type) {
			case MKDIR_REQUEST:
				yield put({
					type: MKDIR_FAILURE,
					payload: {
						errorMessage: 'Error while command mkdir',
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
			case MKDIR_REQUEST:
				yield call(sftp_ws, {
					keyword: 'CommandByMkdir',
					ws: payload.socket,
					path: payload.newPath,
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
				case MKDIR_SUCCESS:
					console.log('mkdir success!');
					yield put(commandLsAction(payload));
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
	yield takeEvery(MKDIR_REQUEST, sendCommand);
}

export default function* commandMkdirSaga() {
	yield all([fork(watchSendCommand)]);
}
