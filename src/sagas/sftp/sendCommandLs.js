import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {LS_FAILURE, LS_REQUEST, LS_SUCCESS} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {createWebsocketChannel} from './sendConnect';
import {listConversion} from '../../components/SFTP/commands';

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
						case SFTP.CommandResponse.CommandCase.LS: {
							const ls = command.getLs();
							console.log('command : ls', ls);

							const entryList = ls.getEntryList();
							console.log('entry ', entryList.length);

							let result = '';
							const list = [];

							for (let i = 0; i < entryList.length; i++) {
								const entry = entryList[i];
								list.push(entry.getLongname());

								console.log('entry : ', entry.getLongname());
								result += entry.getLongname() + '\n';
							}
							const fileList = listConversion(list);
							yield put({
								type: LS_SUCCESS,
								payload: {
									uuid,
									result,
									fileList,
								},
							});
							return {type: LS_SUCCESS};
						}

						// case SFTP.CommandResponse.CommandCase.PWD: {
						// 	const pwd = command.getPwd();
						// 	console.log('command : pwd', pwd);
						// 	let pathList = ['/'];
						// 	let tempPathList = pwd.getMessage().split('/');
						// 	tempPathList.reduce(function (
						// 		accumulator,
						// 		currentValue,
						// 	) {
						// 		pwd.getMessage() !== '/' &&
						// 			pathList.push(
						// 				accumulator + '/' + currentValue,
						// 			);
						// 		return accumulator + '/' + currentValue;
						// 	});
						//
						// 	yield put({
						// 		type: PWD_SUCCESS,
						// 		payload: {
						// 			uuid,
						// 			path: pwd.getMessage(),
						// 			pathList,
						// 		},
						// 	});
						// 	return {
						// 		type: PWD_SUCCESS,
						// 		path: pwd.getMessage(),
						// 		pathList,
						// 	};
						// }
					}
				}
			}
		}
	} catch (err) {
		switch (type) {
			case LS_REQUEST:
				yield put({
					type: LS_FAILURE,
					payload: {
						errorMessage: 'Error while command ls',
					},
				});
				break;
		}
	}
}

function* sendCommand(action) {
	try {
		const {type, payload} = action;
		console.log(payload);
		const channel = yield call(createWebsocketChannel, payload.socket);
		switch (type) {
			case LS_REQUEST:
				yield call(sftp_ws, {
					keyword: 'CommandByLs',
					ws: payload.socket,
					path: payload.path,
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
				case LS_SUCCESS:
					console.log('ls success!');
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
	yield takeEvery(LS_REQUEST, sendCommand);
}

export default function* commandLsSaga() {
	yield all([fork(watchSendCommand)]);
}
