import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	commandLsAction,
	PWD_FAILURE,
	PWD_REQUEST,
	PWD_SUCCESS,
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
						case SFTP.CommandResponse.CommandCase.PWD: {
							const pwd = command.getPwd();
							console.log('command : pwd', pwd);
							let pathList = ['/'];
							let tempPathList = pwd.getMessage().split('/');
							tempPathList.reduce(function (
								accumulator,
								currentValue,
							) {
								pwd.getMessage() !== '/' &&
									pathList.push(
										accumulator + '/' + currentValue,
									);
								return accumulator + '/' + currentValue;
							});

							yield put({
								type: PWD_SUCCESS,
								payload: {
									uuid,
									path: pwd.getMessage(),
									pathList,
								},
							});
							return {
								type: PWD_SUCCESS,
								path: pwd.getMessage(),
								pathList,
							};
						}
					}
				}
			}
		}
	} catch (err) {
		switch (type) {
			case PWD_REQUEST:
				yield put({
					type: PWD_FAILURE,
					payload: {
						errorMessage: 'Error while command pwd',
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
			case PWD_REQUEST:
				yield call(sftp_ws, {
					keyword: 'CommandByPwd',
					ws: payload.socket,
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
				case PWD_SUCCESS:
					console.log('pwd success!');
					// for (const key of res.pathList) {
					yield put(
						commandLsAction({
							...payload,
							path: res.pathList[res.pathList.length - 1],
						}),
					);
					// }
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
	yield takeEvery(PWD_REQUEST, sendCommand);
}

export default function* commandPwdSaga() {
	yield all([fork(watchSendCommand)]);
}
