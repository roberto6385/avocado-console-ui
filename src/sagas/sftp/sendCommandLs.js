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
	commandLsAction,
	DELETE_WORK_LIST,
	LS_FAILURE,
	LS_REQUEST,
	LS_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from '../channel';
import {sortFunction} from '../../components/SFTP/listConversion';
import {lsResponse} from '../../ws/sftp/ls_response';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);
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
					// if (payload.newPath === '.' || payload.newPath === '..')
					// 	return;
					// if (payload.keyword !== 'pathFinder') {
					// 	console.log(res.list);
					// 	yield put({
					// 		type: LS_SUCCESS,
					// 		payload: {
					// 			uuid: payload.uuid,
					// 			fileList: sortFunction({
					// 				fileList:
					// 					payload.newPath === '/'
					// 						? res.list.filter(
					// 								(v) => v.name !== '..',
					// 						  )
					// 						: res.list,
					// 				keyword: 'name',
					// 				toggle: true,
					// 			}),
					// 		},
					// 	});
					// 	console.log('ls success end!');
					// } else {
					// 	yield put({
					// 		type: DELETE_WORK_LIST,
					// 		payload: {
					// 			uuid: payload.uuid,
					// 			list: res.list,
					// 			path: payload.newPath,
					// 		},
					// 	});
					//
					// 	for (let item of res.list) {
					// 		if (
					// 			item.type === 'directory' &&
					// 			item.name !== '..' &&
					// 			item.name !== '.'
					// 		) {
					// 			yield put(
					// 				commandLsAction({
					// 					...payload,
					// 					newPath: `${payload.newPath}/${item.name}`,
					// 					keyword: 'pathFinder',
					// 					deleteWorks: [
					// 						...payload.deleteWorks,
					// 						{
					// 							list: res.list,
					// 							path: payload.newPath,
					// 						},
					// 					],
					// 				}),
					// 			);
					// 		}
					// 	}
					// }
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
	// yield takeLatest(LS_REQUEST, sendCommand);

	const reqChannel = yield actionChannel(LS_REQUEST);
	while (true) {
		const action = yield take(reqChannel);
		yield call(sendCommand, action);
	}
}

export default function* commandLsSaga() {
	yield all([fork(watchSendCommand)]);
}
