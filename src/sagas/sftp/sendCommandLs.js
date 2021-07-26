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
	commandLsAction,
	ERROR,
	LS_FAILURE,
	LS_REQUEST,
	LS_SUCCESS,
	READY_STATE,
} from '../../reducers/sftp';
import {closeChannel, subscribe} from '../channel';
import {sortFunction} from '../../components/SFTP/functions';
import {lsResponse} from '../../ws/sftp/ls_response';
import messageSender from './messageSender';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);
	let pass = false;

	const channel = yield call(subscribe, payload.socket);

	try {
		yield call(messageSender, {
			keyword: 'CommandByLs',
			ws: payload.socket,
			path: payload.ls_path,
		});
		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(1000),
				data: take(channel),
			});
			if (timeout) {
				closeChannel(channel);
				console.log('ls end');
				if (!pass) {
					yield put(
						commandLsAction({
							socket: payload.socket,
							uuid: payload.uuid,
							ls_path: payload.ls_path,
						}),
					);
				}
				if (payload.socket.readyState !== 1) {
					yield put({
						type: READY_STATE,
						payload: {uuid: payload.uuid},
					});
				}
			} else {
				const res = yield call(lsResponse, {data});
				console.log(res);
				switch (res.type) {
					case LS_SUCCESS:
						yield put({
							type: LS_SUCCESS,
							payload: {
								uuid: payload.uuid,
								fileList: sortFunction({
									fileList:
										payload.ls_path === '/'
											? res.list.filter(
													(v) => v.name !== '..',
											  )
											: res.list,
								}),
							},
						});
						pass = true;
						break;

					case ERROR:
						pass = true;

						console.log(res.err);
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: LS_FAILURE});
		closeChannel(channel);
	}
}

function* watchSendCommand() {
	yield takeLatest(LS_REQUEST, sendCommand);
}

export default function* commandLsSaga() {
	yield all([fork(watchSendCommand)]);
}
