import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	commandPwdAction,
	MKDIR_FAILURE,
	MKDIR_REQUEST,
	MKDIR_SUCCESS,
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
		yield put({
			type: MKDIR_FAILURE,
			payload: {
				errorMessage: 'Error while command mkdir',
			},
		});
	}
}

function* sendCommand(payload) {
	try {
		const channel = yield call(subscribe, payload.socket);
		yield call(sftp_ws, {
			keyword: 'CommandByMkdir',
			ws: payload.socket,
			path: payload.newPath,
		});

		const data = yield take(channel);
		const res = yield call(messageReader, data, payload);
		console.log(res);

		switch (res.type) {
			case MKDIR_SUCCESS:
				console.log('mkdir success!');
				yield put(commandPwdAction(payload));
				break;
			default:
				break;
		}
	} catch (err) {
		console.log(err);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(MKDIR_REQUEST);
	while (true) {
		const {payload} = yield take(reqChannel);
		yield call(sendCommand, payload);
	}
}

export default function* commandMkdirSaga() {
	yield all([fork(watchSendCommand)]);
}
