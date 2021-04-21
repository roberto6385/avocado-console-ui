import {all, call, fork, take, put, actionChannel} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	DISCONNECTION_FAILURE,
	DISCONNECTION_REQUEST,
	DISCONNECTION_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';
import {CLOSE_TAB} from '../../reducers/common';

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
				}
			}
		}
	} catch (err) {
		yield put({
			type: DISCONNECTION_FAILURE,
			payload: {
				errorMessage: 'Error while command disconnect',
			},
		});
	} finally {
		yield put({type: CLOSE_TAB, data: payload.id});
	}
}

function* sendCommand(payload) {
	try {
		const channel = yield call(subscribe, payload.socket);
		yield call(sftp_ws, {
			keyword: 'Disconnection',
			ws: payload.socket,
		});
		const data = yield take(channel);
		yield call(messageReader, data, payload);
	} catch (err) {
		console.log(err);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(DISCONNECTION_REQUEST);
	while (true) {
		const {payload} = yield take(reqChannel);
		yield call(sendCommand, payload);
	}
}

export default function* commandDisconnectSaga() {
	yield all([fork(watchSendCommand)]);
}
