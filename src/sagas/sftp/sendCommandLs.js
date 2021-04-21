import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {LS_FAILURE, LS_REQUEST, LS_SUCCESS} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';
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
					console.log(command);

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
	console.log(action);
	try {
		const {type, payload} = action;
		console.log(payload);
		const channel = yield call(subscribe, payload.socket);
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
			yield call(messageReader, data, payload, type);
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
