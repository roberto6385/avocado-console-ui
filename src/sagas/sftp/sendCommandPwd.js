import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	commandLsAction,
	PWD_FAILURE,
	PWD_REQUEST,
	PWD_SUCCESS,
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
		yield put({
			type: PWD_FAILURE,
			payload: {
				errorMessage: 'Error while command pwd',
			},
		});
	}
}

function* sendCommand(payload) {
	try {
		const channel = yield call(subscribe, payload.socket);
		yield call(sftp_ws, {
			keyword: 'CommandByPwd',
			ws: payload.socket,
		});

		const data = yield take(channel);
		const res = yield call(messageReader, data, payload);
		console.log(res);
		for (let value of res.pathList) {
			yield put(commandLsAction({...payload, path: value}));
		}
	} catch (err) {
		console.log(err);
		//
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(PWD_REQUEST);
	while (true) {
		const {payload} = yield take(reqChannel);
		yield call(sendCommand, payload);
	}
}

export default function* commandPwdSaga() {
	yield all([fork(watchSendCommand)]);
}
