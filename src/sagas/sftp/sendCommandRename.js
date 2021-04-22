import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	commandPwdAction,
	RENAME_FAILURE,
	RENAME_REQUEST,
	RENAME_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';

function* messageReader(data, payload) {
	const {uuid} = payload;
	console.log(payload);
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
		yield put({
			type: RENAME_FAILURE,
			payload: {
				errorMessage: 'Error while command rename',
			},
		});
	}
}

function* sendCommand(payload) {
	try {
		const channel = yield call(subscribe, payload.socket);
		yield call(sftp_ws, {
			keyword: 'CommandByRename',
			ws: payload.socket,
			path: `${payload.path}/${payload.prevName}`,
			newPath: `${payload.path}/${payload.nextName}`,
		});

		console.log(payload);
		const data = yield take(channel);
		const res = yield call(messageReader, data, payload);

		switch (res.type) {
			case RENAME_SUCCESS:
				console.log('rename success!');
				yield put(commandPwdAction(payload));
				break;
			default:
				break;
		}
	} catch (err) {
		console.log(err);
		//
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(RENAME_REQUEST);
	while (true) {
		const {payload} = yield take(reqChannel);
		yield call(sendCommand, payload);
	}
}

export default function* commandRenameSaga() {
	yield all([fork(watchSendCommand)]);
}
