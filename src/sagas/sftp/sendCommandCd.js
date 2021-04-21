import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	CD_FAILURE,
	CD_REQUEST,
	CD_SUCCESS,
	commandPwdAction,
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
						case SFTP.CommandResponse.CommandCase.CD: {
							const cd = command.getCd();
							console.log('command : cd', cd);
							yield put({
								type: CD_SUCCESS,
								payload: {uuid},
							});
							return {
								type: CD_SUCCESS,
							};
						}
					}
				}
			}
		}
	} catch (err) {
		switch (type) {
			case CD_REQUEST:
				yield put({
					type: CD_FAILURE,
					payload: {
						errorMessage: 'Error while command cd',
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
			case CD_REQUEST:
				yield call(sftp_ws, {
					keyword: 'CommandByCd',
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
				case CD_SUCCESS:
					console.log('cd success!');
					yield put(commandPwdAction(payload));
					// }
					break;
				default:
					break;
			}
		}
	} catch (err) {
		console.log(err);
	}
}

function* watchSendCommand() {
	yield takeEvery(CD_REQUEST, sendCommand);
}

export default function* commandCdSaga() {
	yield all([fork(watchSendCommand)]);
}
