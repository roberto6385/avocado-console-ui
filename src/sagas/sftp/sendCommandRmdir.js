import {
	all,
	call,
	fork,
	take,
	put,
	actionChannel,
	race,
	delay,
} from 'redux-saga/effects';
import {
	ADD_HISTORY,
	RMDIR_FAILURE,
	RMDIR_REQUEST,
	RMDIR_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from '../channel';
import {rmdirResponse} from '../../ws/sftp/rmdir_response';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);
	try {
		if (payload.file.name !== '..' && payload.file.name !== '.') {
			yield call(messageSender, {
				keyword: 'CommandByRmdir',
				ws: payload.socket,
				path:
					payload.rmdir_path === '/'
						? `${payload.rmdir_path}${payload.file.name}`
						: `${payload.rmdir_path}/${payload.file.name}`,
			});
		}

		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(200),
				data: take(channel),
			});
			if (timeout) {
				console.log('RM 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				const res = yield call(rmdirResponse, {data});
				switch (res.type) {
					case RMDIR_SUCCESS:
						console.log(payload.file);
						yield put({type: RMDIR_SUCCESS});
						yield put({
							type: ADD_HISTORY,
							payload: {
								uuid: payload.uuid,
								name: payload.file.name,
								size: payload.file.size,
								todo: 'rm',
								progress: 100,
							},
						});
						break;

					default:
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: RMDIR_FAILURE});
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(RMDIR_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		yield call(sendCommand, action);
	}
}

export default function* commandRmdirSaga() {
	yield all([fork(watchSendCommand)]);
}
