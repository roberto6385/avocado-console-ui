import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	commandLsAction,
	RM_FAILURE,
	RM_REQUEST,
	RM_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {createWebsocketChannel} from './sendConnect';

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
						case SFTP.CommandResponse.CommandCase.RM: {
							const rm = command.getRm();
							console.log('command : rm', rm);
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
		switch (type) {
			case RM_REQUEST:
				yield put({
					type: RM_FAILURE,
					payload: {
						errorMessage: 'Error while command rm',
					},
				});
				break;
		}
	}
}

function* sendCommand(action) {
	try {
		const {type, payload} = action;
		const channel = yield call(createWebsocketChannel, payload.socket);
		switch (type) {
			case RM_REQUEST:
				yield call(sftp_ws, {
					keyword: 'CommandByRm',
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
			const res = yield call(messageReader, data, payload, type);
			console.log(payload);
			console.log(res);

			// switch (res.type) {
			// 	case RM_SUCCESS:
			// 		console.log('rm success!');
			// 		yield put(commandLsAction(payload));
			// 		break;
			// 	default:
			// 		break;
			// }
		}
	} catch (err) {
		console.log(err);
		//
	}
}

function* watchSendCommand() {
	yield takeEvery(RM_REQUEST, sendCommand);
}

export default function* commandRmSaga() {
	yield all([fork(watchSendCommand)]);
}
