import {
	all,
	call,
	fork,
	take,
	put,
	actionChannel,
	takeEvery,
} from 'redux-saga/effects';
import {
	commandLsAction,
	DELETE_WORK_LIST,
	LS_FAILURE,
	LS_REQUEST,
	LS_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from './channel';
import {messageReader} from './messageReader';
import {sortFunction} from '../../components/SFTP/listConversion';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);
	const channel = yield call(subscribe, payload.socket);
	// 현재 드롭 리스트에 필요한 모든 경로를 개별 탐색하므로 경로당 채널 생성 발생.
	// 채널을 하나만 사용하는 방향으로 수정 필요.

	try {
		yield call(messageSender, {
			keyword: 'CommandByLs',
			ws: payload.socket,
			path: payload.path,
		});
		while (true) {
			const data = yield take(channel);
			const res = yield call(messageReader, {data, payload});
			switch (res.type) {
				case LS_SUCCESS:
					if (payload.keyword !== 'pathFinder') {
						yield put({
							type: LS_SUCCESS,
							payload: {
								uuid: payload.uuid,
								fileList: sortFunction({
									fileList: res.list,
									keyword: 'name',
									toggle: true,
								}),
							},
						});
					} else {
						res.list.shift();

						if (res.list.length !== 0) {
							console.log({
								path: payload.path,
								list: res.list,
							});
							yield put({
								type: DELETE_WORK_LIST,
								payload: {
									uuid: payload.uuid,
									list: res.list,
									path: payload.path,
								},
							});

							for (let item of res.list) {
								if (
									item.type === 'directory' &&
									item.name !== '..'
								) {
									yield put(
										commandLsAction({
											...payload,
											path: `${payload.path}/${item.name}`,
											keyword: 'pathFinder',
											deleteWorks: [
												...payload.deleteWorks,
												{
													list: res.list,
													path: payload.path,
												},
											],
										}),
									);
								}
							}
						} else {
							console.log('end');
						}
					}
					return;
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

	const reqChannel = yield actionChannel(LS_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		yield call(sendCommand, action);
	}
}

export default function* commandLsSaga() {
	yield all([fork(watchSendCommand)]);
}
