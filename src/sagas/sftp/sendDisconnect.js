import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	DISCONNECTION_FAILURE,
	DISCONNECTION_REQUEST,
	DISCONNECTION_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {END, eventChannel} from 'redux-saga';
import {createWebsocketChannel} from './sendConnect';
import {CLOSE_TAB} from '../../reducers/common';

function* messageReader(data, payload, type) {
	const {uuid, item, path} = payload;
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
					SFTP.Response.ResponseCase.DISCONNECT
				) {
					const disconnect = response.getDisconnect();
					console.log(disconnect);
					yield put({
						type: DISCONNECTION_SUCCESS,
						payload: {
							uuid,
						},
					});
					return {type: DISCONNECTION_SUCCESS};
				}
				// if (
				// 	response.getResponseCase() ===
				// 	SFTP.Response.ResponseCase.COMMAND
				// ) {
				// 	const command = response.getCommand();
				//
				// 	switch (command.getCommandCase()) {
				// 		case SFTP.CommandResponse.CommandCase.PWD: {
				// 			const pwd = command.getPwd();
				// 			console.log('command : pwd', pwd);
				// 			let pathList = ['/'];
				// 			let tempPathList = pwd.getMessage().split('/');
				// 			tempPathList.reduce(function (
				// 				accumulator,
				// 				currentValue,
				// 			) {
				// 				pwd.getMessage() !== '/' &&
				// 					pathList.push(
				// 						accumulator + '/' + currentValue,
				// 					);
				// 				return accumulator + '/' + currentValue;
				// 			});
				//
				// 			yield put({
				// 				type: PWD_SUCCESS,
				// 				payload: {
				// 					uuid,
				// 					path: pwd.getMessage(),
				// 					pathList,
				// 				},
				// 			});
				// 			return {
				// 				type: PWD_SUCCESS,
				// 				path: pwd.getMessage(),
				// 				pathList,
				// 			};
				// 		}
				// 	}
				// }
			}
		}
	} catch (err) {
		switch (type) {
			case DISCONNECTION_REQUEST:
				yield put({
					type: DISCONNECTION_FAILURE,
					payload: {
						errorMessage: 'Error while command disconnect',
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
			case DISCONNECTION_REQUEST:
				yield call(sftp_ws, {
					keyword: 'Disconnection',
					ws: payload.socket,
				});
				break;
			default:
				break;
		}

		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, data, payload, type);

			switch (res.type) {
				case DISCONNECTION_SUCCESS:
					console.log('disconnection success!');
					yield put({type: CLOSE_TAB, data: payload.id});
					// for (const key of res.pathList) {
					// yield put(
					// 	commandLsAction({
					// 		...payload,
					// 		path: res.pathList[res.pathList.length - 1],
					// 	}),
					// );
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
	yield takeEvery(DISCONNECTION_REQUEST, sendCommand);
}

export default function* commandDisconnectSaga() {
	yield all([fork(watchSendCommand)]);
}
