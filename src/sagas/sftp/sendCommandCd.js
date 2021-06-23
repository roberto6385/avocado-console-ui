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
	commandPwdAction,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {closeChannel, subscribe} from '../channel';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {cdResponse} from '../../ws/sftp/cd_response';

function* sendCommand(action) {
	const {payload} = action;
	console.log(payload);
	const channel = yield call(subscribe, payload.socket);
	try {
		yield call(messageSender, {
			keyword: 'CommandByCd',
			ws: payload.socket,
			path: payload.cd_path,
		});
		while (true) {
			const {timeout, data} = yield race({
				timeout: delay(200),
				data: take(channel),
			});
			if (timeout) {
				console.log('CD 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				const res = yield call(cdResponse, {data});
				// let past = payload.path;
				// let prev = payload.pathList;
				// let next = [];
				// let temp = [];
				// let temp2 = [];
				// let remove = [];
				// let add = [];
				// let shouldLs = [];

				switch (res.type) {
					case CD_SUCCESS:
						yield put({
							type: CD_SUCCESS,
							payload: {uuid: payload.uuid},
						});

						yield put(
							commandPwdAction({
								socket: payload.socket,
								uuid: payload.uuid,
								prev_path: payload.path,
							}),
						);

						// yield call(messageSender, {
						// 	keyword: 'CommandByPwd',
						// 	ws: payload.socket,
						// });
						break;
					//
					// case PWD_SUCCESS:
					// 	past = payload.path;
					// 	prev = payload.pathList;
					// 	next = res.pathList;
					// 	temp = prev.filter((v) => next.includes(v));
					// 	temp2 = next.filter((v) => ![past].includes(v));
					// 	temp.pop();
					// 	remove = prev.filter((v) => !next.includes(v));
					// 	add = next.filter((v) => !prev.includes(v));
					// 	shouldLs = temp2.filter((v) => !temp.includes(v));
					//
					// 	// success 에서는 filelist initializing...
					// 	// pathList 비교 후 경로가 바뀌기 전 + 현재 경로 까지의 pathlist 및 filelist 제거
					// 	yield put({
					// 		type: PWD_SUCCESS,
					// 		payload: {
					// 			uuid: payload.uuid,
					// 			path: res.path,
					// 			pathList: res.pathList,
					// 			removeIndex:
					// 				add.length === 0 //추가 없음
					// 					? remove.length === 0 //삭제도 없음
					// 						? 1 // 그럼 refresh를 위한 1
					// 						: remove.length + 1 //아님 삭제 + 1
					// 					: remove.length === 0
					// 					? 0 // 추가는 있는데 삭제가 없음.
					// 					: remove.length, // 추가 삭제 둘 다 있음.
					// 		},
					// 	});
					// 	// 비교 후 여기서 조회할 경로만 조회
					// 	if (add.length !== 0) {
					// 		for (let value of add) {
					// 			console.log(value);
					// 			yield put(
					// 				commandLsAction({
					// 					...payload,
					// 					newPath: value,
					// 				}),
					// 			);
					// 		}
					// 	} else if (remove.length === 0) {
					// 		//추가도 0 삭제도 0
					// 		console.log('refresh');
					// 		console.log(past);
					// 		yield put(
					// 			commandLsAction({
					// 				...payload,
					// 				newPath: past,
					// 			}),
					// 		);
					// 	} else {
					// 		for (let value of shouldLs) {
					// 			//추가는 0 삭제는 존재
					// 			console.log('remove exist');
					// 			console.log(value);
					// 			yield put(
					// 				commandLsAction({
					// 					...payload,
					// 					newPath: value,
					// 				}),
					// 			);
					// 		}
					// 	}
					// 	break;
					// // yield put(commandPwdAction(payload));
					default:
						console.log(res);
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: CD_FAILURE});
		yield put({
			type: OPEN_ALERT_POPUP,
			data: 'wrong_path',
		});
		closeChannel(channel);
	}
}

function* watchSendCommand() {
	yield takeLatest(CD_REQUEST, sendCommand);

	// const reqChannel = yield actionChannel(CD_REQUEST);
	// console.log('watch send command connection');
	// while (true) {
	// 	const action = yield take(reqChannel);
	// 	console.log('cd request start!!');
	// 	yield call(sendCommand, action);
	// }
}

export default function* commandCdSaga() {
	yield all([fork(watchSendCommand)]);
}
