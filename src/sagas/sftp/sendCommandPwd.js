import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	commandLsAction,
	PWD_FAILURE,
	PWD_REQUEST,
	PWD_SUCCESS,
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
		const channel = yield call(subscribe, payload.socket);
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
			console.log(res);

			yield put(commandLsAction({...payload, path: res.path}));
			// 드롭다운 방식은 / 부터 현재 경로까지 모든 경로를 ls 해야하기 때문에
			// 그러나 지금은 dropdown은 제외하고 구현중...
			// for (const key of res.pathList) {
			// 	yield put(
			// 		commandLsAction({
			// 			...payload,
			// 			path: res.pathList[res.pathList.length - 1],
			// 		}),
			// 	);
			// }
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
