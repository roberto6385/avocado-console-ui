import {
	all,
	call,
	fork,
	take,
	put,
	actionChannel,
	race,
	delay,
	takeEvery,
	throttle,
} from 'redux-saga/effects';
import {
	ERROR,
	LS_FAILURE,
	LS_REQUEST,
	LS_SUCCESS,
	PWD_REQUEST,
} from '../../reducers/sftp';
import {closeChannel, subscribe} from '../channel';
import {sortFunction} from '../../components/SFTP/listConversion';
import {lsResponse} from '../../ws/sftp/ls_response';
import messageSender from './messageSender';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);
	//
	// const socket = yield call(createWebsocket);
	// const channel = yield call(subscribe, socket);
	const channel = yield call(subscribe, payload.socket);

	try {
		yield call(messageSender, {
			keyword: 'CommandByLs',
			ws: payload.socket,
			path: payload.ls_path,
		});
		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(200),
				data: take(channel),
			});
			if (timeout) {
				console.log('LS 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				// const data = yield take(channel);
				const res = yield call(lsResponse, {data});
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
						break;

					case ERROR:
						console.log(res.err);
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: LS_FAILURE});
		alert('LS 에러발생 채널종료!');
		closeChannel(channel);
	}
}

function* watchSendCommand() {
	// yield takeEvery(LS_REQUEST, sendCommand);
	yield throttle(1000, LS_REQUEST, sendCommand);

	// const reqChannel = yield actionChannel(LS_REQUEST);
	// while (true) {
	// 	const action = yield take(reqChannel);
	// 	yield call(sendCommand, action);
	// }
}

export default function* commandLsSaga() {
	yield all([fork(watchSendCommand)]);
}
