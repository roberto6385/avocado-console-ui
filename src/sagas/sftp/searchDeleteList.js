import {
	call,
	take,
	put,
	actionChannel,
	race,
	delay,
	all,
	fork,
} from 'redux-saga/effects';
import {
	DELETE_WORK_LIST,
	DELETE_WORK_TRANSPORTER,
	ERROR,
	LS_FAILURE_DELETE,
	LS_REQUEST_DELETE,
	LS_SUCCESS_DELETE,
	searchDeleteListAction,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, fileSubscribe} from '../channel';
import {lsSearchResponse} from '../../ws/sftp/ls_search_response';

function* sendCommand(action) {
	const {payload} = action;

	const channel = yield call(fileSubscribe, payload.socket);

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
						break;

					case ERROR:
						console.log(res.err);
						break;
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
	let uuid = null;

	while (true) {
		const {timeout, action} = yield race({
			timeout: delay(1000),
			action: take(reqChannel),
		});
		if (timeout) {
			if (uuid !== null) {
				yield put({
					type: DELETE_WORK_TRANSPORTER,
					payload: {
						uuid: uuid,
					},
				});
				uuid = null;
			}
			yield take(LS_REQUEST_DELETE);
		} else {
			console.log(action);
			uuid = action.payload.uuid;
			yield call(sendCommand, action);
		}
	}
}

export default function* searchListSaga() {
	yield all([fork(watchSendCommand)]);
}
