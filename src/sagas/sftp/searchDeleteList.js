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
	DELETE_WORK_LIST,
	DELETE_WORK_TRANSPORTER,
	LS_FAILURE_DELETE,
	LS_REQUEST_DELETE,
	LS_SUCCESS_DELETE,
	searchDeleteListAction,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from '../channel';
import {lsSearchResponse} from '../../ws/sftp/ls_search_response';

function* sendCommand(action) {
	const {payload} = action;

	const channel = yield call(subscribe, payload.socket);

	try {
		yield call(messageSender, {
			keyword: 'CommandByLs',
			ws: payload.socket,
			path: payload.delete_path,
		});

		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(200),
				data: take(channel),
			});
			if (timeout) {
				console.log('DELETE 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				// const data = yield take(channel);
				const res = yield call(lsSearchResponse, {data});
				const array = [];
				for (let value of res.list) {
					if (value.name !== '.' && value.name !== '..') {
						array.push({file: value, path: payload.delete_path});
					}
				}

				console.log({path: payload.delete_path});
				console.log(array);

				switch (res.type) {
					case LS_SUCCESS_DELETE:
						if (array.length !== 0) {
							yield put({
								type: DELETE_WORK_LIST,
								payload: {
									uuid: payload.uuid,
									array,
								},
							});
							for (let item of array.slice()) {
								if (item.file.type === 'directory') {
									console.log(
										`${payload.delete_path}/${item.file.name}`,
									);
									yield put(
										searchDeleteListAction({
											socket: payload.socket,
											uuid: payload.uuid,
											delete_path: `${payload.delete_path}/${item.file.name}`,
										}),
									);
								} else {
									console.log(item.file);
								}
							}
						}
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: LS_FAILURE_DELETE});
		closeChannel(channel);
	}
}

function* watchSendCommand() {
	const reqChannel = yield actionChannel(LS_REQUEST_DELETE);
	// const req = yield take(reqChannel);

	// console.log(req);
	while (true) {
		const {timeout, action} = yield race({
			timeout: delay(3000),
			action: take(reqChannel),
		});
		if (timeout) {
			console.log('end');
			// yield put({
			// 	type: DELETE_WORK_TRANSPORTER,
			// 	payload: {
			// 		uuid: req.payload.uuid,
			// 	},
			// });
		} else {
			yield call(sendCommand, action);
		}
	}

	// const reqChannel = yield actionChannel(LS_REQUEST_DELETE);
	// while (true) {
	// 	const action = yield take(reqChannel);
	// 	yield call(sendCommand, action);
	// }
}

export default function* searchListSaga() {
	yield all([fork(watchSendCommand)]);
}
