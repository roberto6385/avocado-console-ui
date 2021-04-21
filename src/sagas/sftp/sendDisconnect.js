import {all, call, fork, take, put, takeEvery} from 'redux-saga/effects';
import SFTP from '../../dist/sftp_pb';
import {
	DISCONNECTION_FAILURE,
	DISCONNECTION_REQUEST,
	DISCONNECTION_SUCCESS,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {subscribe} from './channel';
import {CLOSE_TAB} from '../../reducers/common';

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
				return {type: DISCONNECTION_FAILURE};
		}
	}
}

function* sendCommand(action) {
	try {
		const {type, payload} = action;
		const channel = yield call(subscribe, payload.socket);
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
					break;
				case DISCONNECTION_FAILURE:
					console.log('disconnection fail!');
					yield put({type: CLOSE_TAB, data: payload.id});
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
