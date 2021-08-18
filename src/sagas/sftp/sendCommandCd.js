import {
	all,
	call,
	fork,
	take,
	put,
	race,
	delay,
	takeLatest,
} from 'redux-saga/effects';
import {
	CD_FAILURE,
	CD_REQUEST,
	CD_SUCCESS,
	ERROR,
	PWD_REQUEST,
	READY_STATE,
} from '../../reducers/sftp';
import messageSender from './messageSender';

import {closeChannel, subscribe} from '../channel';
import {cdResponse} from '../../ws/sftp/cd_response';
import {createPathList} from '../../components/SFTP/functions';
import {dialogBoxAction} from '../../reducers/dialogBoxs';

function* sendCommand(action) {
	const {payload} = action;

	console.log(payload.cd_path);
	let pass = false;

	const channel = yield call(subscribe, payload.socket);

	try {
		if (payload.socket.readyState === 3) {
			console.log('closed');
			return;
		}
		yield call(messageSender, {
			keyword: 'CommandByCd',
			ws: payload.socket,
			path: payload.cd_path,
		});
		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(1000),
				data: take(channel),
			});
			if (timeout) {
				closeChannel(channel);
				console.log('cd end');
				if (!pass) {
					yield put({
						type: CD_REQUEST,
						payload: {
							socket: payload.socket,
							uuid: payload.uuid,
							path: payload.path,
							cd_path: payload.cd_path,
						},
					});
				}

				if (payload.socket.readyState !== 1) {
					yield put({
						type: READY_STATE,
						payload: {uuid: payload.uuid},
					});
				}
			} else {
				const res = yield call(cdResponse, {data});

				switch (res.type) {
					case CD_SUCCESS:
						yield put({
							type: CD_SUCCESS,
							payload: {
								uuid: payload.uuid,
								path: payload.cd_path,
								pathList: createPathList({
									path: payload.cd_path,
								}),
							},
						});
						pass = true;

						yield put({
							type: PWD_REQUEST,
							payload: {
								socket: payload.socket,
								uuid: payload.uuid,
								pwd_path: payload.path,
							},
						});

						break;
					case ERROR:
						console.log(res.err);
						pass = true;
						yield put({type: CD_FAILURE});
						yield put(
							dialogBoxAction.openAlert({key: 'sftp-wrong-path'}),
						);
						break;
					default:
						console.log(res);
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		closeChannel(channel);
		yield put({type: CD_FAILURE});
		yield put(dialogBoxAction.openAlert({key: 'sftp-wrong-path'}));
	}
}

function* watchSendCommand() {
	yield takeLatest(CD_REQUEST, sendCommand);
}

export default function* commandCdSaga() {
	yield all([fork(watchSendCommand)]);
}
