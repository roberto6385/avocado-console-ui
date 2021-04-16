import {all, call, fork, put, take, takeLatest} from 'redux-saga/effects';
import {
	DISCONNECTION_FAILURE,
	DISCONNECTION_REQUEST,
	DISCONNECTION_SUCCESS,
	errorAction,
} from '../../reducers/sftp';
import sftp_ws from '../../ws/sftp_ws';
import SFTP from '../../dist/sftp_pb';
import {CLOSE_TAB} from '../../reducers/common';

function* sendDisconnect({payload}) {
	console.log(payload);
	const {socket, channel, id, uuid} = payload;
	try {
		yield call(sftp_ws, {
			keyword: 'Disconnection',
			ws: socket,
		});
		const data = yield take(channel);
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
		yield put(errorAction('Error while disconnecting to the WebSocket'));
		yield put({type: DISCONNECTION_FAILURE});
	} finally {
		console.log('finally');
		yield put({
			type: CLOSE_TAB,
			data: id,
		});
	}
}

function* watchSendDisconnect() {
	yield takeLatest(DISCONNECTION_REQUEST, sendDisconnect);
}

export default function* disconnectSaga() {
	yield all([fork(watchSendDisconnect)]);
}
