import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	commandLsAction,
	MKDIR_SUCCESS,
	RENAME_FAILURE,
	RENAME_REQUEST,
	RENAME_SUCCESS,
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

					switch (command.getCommandCase()) {
						case SFTP.CommandResponse.CommandCase.RENAME: {
							const rename = command.getRename();
							console.log('command : rename', rename);
							yield put({
								type: RENAME_SUCCESS,
								payload: {
									uuid,
								},
							});
							return {type: RENAME_SUCCESS};
						}
					}
				}
			}
		}
	} catch (err) {
		switch (type) {
			case RENAME_REQUEST:
				yield put({
					type: RENAME_FAILURE,
					payload: {
						errorMessage: 'Error while command rename',
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
			case RENAME_REQUEST:
				yield call(sftp_ws, {
					keyword: 'CommandByRename',
					ws: payload.socket,
					path: `${payload.path}/${payload.prevName}`,
					newPath: `${payload.path}/${payload.nextName}`,
				});
				break;
			default:
				break;
		}

		while (true) {
			console.log(payload);
			const data = yield take(channel);
			const res = yield call(messageReader, data, payload, type);

			switch (res.type) {
				case RENAME_SUCCESS:
					console.log('rename success!');
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
	yield takeEvery(RENAME_REQUEST, sendCommand);
}

export default function* commandRenameSaga() {
	yield all([fork(watchSendCommand)]);
}
