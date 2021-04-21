import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	commandLsAction,
	LS_FAILURE,
	LS_REQUEST,
	LS_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';
import {listConversion} from '../../components/SFTP/commands';

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
		yield put({
			type: LS_FAILURE,
			payload: {
				errorMessage: 'Error while command ls',
			},
		});
	}
}

function* sendCommand(payload) {
	try {
		console.log(payload);
		const channel = yield call(subscribe, payload.socket);
		yield call(sftp_ws, {
			keyword: 'CommandByLs',
			ws: payload.socket,
			path: payload.path,
		});
		const data = yield take(channel);
		yield call(messageReader, data, payload);
	} catch (err) {
		console.log(err);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(LS_REQUEST);
	while (true) {
		const {payload} = yield take(reqChannel);
		yield call(sendCommand, payload);
	}
}

export default function* commandLsSaga() {
	yield all([fork(watchSendCommand)]);
}
