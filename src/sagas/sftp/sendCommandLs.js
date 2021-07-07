import {
	all,
	call,
	fork,
	take,
	put,
	race,
	delay,
	takeEvery,
} from 'redux-saga/effects';
import {ERROR} from '../../reducers/sftp/sftp';
import useSubscribe from '../../hooks/useSubscribe';
import {closeChannel, sftpSubscribe} from '../channel';
import {sortFunction} from '../../components/SFTP/listConversion';
import {lsResponse} from '../../ws/sftp/ls_response';
import messageSender from './messageSender';
import {
	LS_FAILURE,
	LS_REQUEST,
	LS_SUCCESS,
	READY_STATE,
} from '../../reducers/sftp/list';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);
	const channel = yield call(useSubscribe, {
		socket: payload.socket,
		uuid:payload.uuid,
	});

	try {
		yield call(messageSender, {
			keyword: 'CommandByLs',
			ws: payload.socket,
			path: payload.ls_path,
		});
		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(500),
				data: take(channel),
			});
			if (timeout) {
				console.log('LS 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				// const data = yield take(channel);
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
		closeChannel(channel);
	}
}

function* watchSendCommand() {
	yield takeEvery(LS_REQUEST, sendCommand);
}

export default function* commandLsSaga() {
	yield all([fork(watchSendCommand)]);
}
