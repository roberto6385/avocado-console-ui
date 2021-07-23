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
import messageSender from './messageSender';
import {closeChannel, subscribe} from '../channel';
import {pwdResponse} from '../../ws/sftp/pwd_response';
import {pathFunction} from '../../components/SFTP/listConversion';
import {
	commandLsAction,
	INIT_FILELIST,
	LS_SUCCESS,
	PWD_FAILURE,
	PWD_REQUEST,
	PWD_SUCCESS,
	READY_STATE,
} from '../../reducers/sftp';

function* sendCommand(action) {
	const {payload} = action;

	if (payload.socket.readyState === 3) {
		console.log('already socket is closing');
		return;
	}

	const channel = yield call(subscribe, payload.socket);

	try {
		yield call(messageSender, {
			keyword: 'CommandByPwd',
			ws: payload.socket,
		});

		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(5000),
				data: take(channel),
			});
			if (timeout) {
				closeChannel(channel);
				console.log('pwd end');
				if (payload.socket.readyState !== 1) {
					yield put({
						type: READY_STATE,
						payload: {uuid: payload.uuid},
					});
				}
			} else {
				// const data = yield take(channel);
				const res = yield call(pwdResponse, {data});
				console.log(res);
				let ls_pathList = [];
				let prev_filter = [];
				let next_filter = [];
				let current_filter = [res.path];
				let remove_index = 0;

				if (payload.pwd_path === null) {
					yield put({
						type: INIT_FILELIST,
						payload: {uuid: payload.uuid},
					});
					console.log(res.path);
					ls_pathList = pathFunction({path: res.path});
					console.log(ls_pathList);
				} else {
					console.log(payload.pwd_path);
					const prevList = pathFunction({path: payload.pwd_path});
					const nextList = pathFunction({path: res.path});

					prev_filter = prevList.filter((v) => !nextList.includes(v));
					next_filter = nextList.filter((v) => !prevList.includes(v));

					console.log('제거된 경로');
					console.log(prev_filter);
					console.log('추가된 경로');
					console.log(next_filter);
					console.log('현재 경로');
					console.log(current_filter);

					if (payload.key === 'write') {
						remove_index =
							prev_filter.length === 0 && next_filter.length === 0
								? 1
								: 0;
						ls_pathList =
							prev_filter.length === 0 && next_filter.length === 0
								? [res.path]
								: [];
					} else {
						remove_index =
							prev_filter.length === 0
								? next_filter.length === 0
									? 1 // 제거 없음 추가 없음 1
									: 0 // 제거 없음 추가 있음 0
								: next_filter.length === 0
								? prev_filter.length + 1 // 제거 있음 추가 없음 => 제거 + 1
								: prev_filter.length; // 제거 있음 추가 있음 => 제거
						ls_pathList =
							next_filter.length === 0 ? [res.path] : next_filter;
					}
				}
				switch (res.type) {
					case PWD_SUCCESS:
						yield put({
							type: PWD_SUCCESS,
							payload: {
								uuid: payload.uuid,
								path: res.path,
								pathList: res.pathList,
								removeIndex: remove_index,
							},
						});
						// 내가 필요한 경로만큼만 요청!
						for (let value of ls_pathList) {
							yield put(
								commandLsAction({
									socket: payload.socket,
									uuid: payload.uuid,
									ls_path: value,
								}),
							);
							yield take(LS_SUCCESS);
						}
						break;
					default:
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: PWD_FAILURE});
	}
}

function* watchSendCommand() {
	yield takeLatest(PWD_REQUEST, sendCommand);
}

export default function* commandPwdSaga() {
	yield all([fork(watchSendCommand)]);
}
