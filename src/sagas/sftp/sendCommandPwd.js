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
import {
	commandLsAction,
	PWD_FAILURE,
	PWD_REQUEST,
	PWD_SUCCESS,
} from '../../reducers/sftp';
import messageSender from './messageSender';
import {messageReader} from './messageReader';
import {closeChannel, subscribe} from '../channel';

function* sendCommand(action) {
	const {payload} = action;
	const channel = yield call(subscribe, payload.socket);
	console.log('다시 요청!');
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
				console.log('PWD 채널 사용이 없습니다. 종료합니다.');
				closeChannel(channel);
			} else {
				const res = yield call(messageReader, {data, payload});
				const past = payload.path;
				const prev = payload.pathList;
				const next = res.pathList;
				const temp = prev.filter((v) => next.includes(v));
				const temp2 = next.filter((v) => ![past].includes(v));
				temp.pop();
				const remove = prev.filter((v) => !next.includes(v));

				const add = next.filter((v) => !prev.includes(v));
				const shouldLs = temp2.filter((v) => !temp.includes(v));
				switch (res.type) {
					case PWD_SUCCESS:
						console.log('이전경로');
						console.log([past]);
						console.log('조회가 필요없는 경로');
						console.log(temp);
						console.log('삭제된 경로 + 1');
						// 삭제된 경로가 0이라면 조회해야 할 경로의 목록을 추가만 해주면 된다.
						// 경로가 1 이상이라면 삭제된 경로의 수 +1 만큼 제거한다.
						console.log(prev.filter((v) => !next.includes(v)));
						console.log('추가된 경로');
						console.log(next.filter((v) => !prev.includes(v)));
						console.log('조회해야 할 경로');
						console.log(temp2.filter((v) => !temp.includes(v)));

						// success 에서는 filelist initializing...
						// pathList 비교 후 경로가 바뀌기 전 + 현재 경로 까지의 pathlist 및 filelist 제거
						yield put({
							type: PWD_SUCCESS,
							payload: {
								uuid: payload.uuid,
								path: res.path,
								pathList: res.pathList,
								removeIndex:
									add.length === 0 //추가 없음
										? remove.length === 0 //삭제도 없음
											? 1 // 그럼 refresh를 위한 1
											: remove.length + 1 //아님 삭제 + 1
										: remove.length === 0
										? 0 // 추가는 있는데 삭제가 없음.
										: remove.length, // 추가 삭제 둘 다 있음.
							},
						});
						// 비교 후 여기서 조회할 경로만 조회
						if (add.length !== 0) {
							for (let value of add) {
								console.log(value);
								yield put(
									commandLsAction({
										...payload,
										newPath: value,
									}),
								);
							}
						} else if (remove.length === 0) {
							//추가도 0 삭제도 0
							console.log('refresh');
							console.log(past);
							yield put(
								commandLsAction({
									...payload,
									newPath: past,
								}),
							);
						} else {
							for (let value of shouldLs) {
								//추가는 0 삭제는 존재
								console.log('remove exist');
								console.log(value);
								yield put(
									commandLsAction({
										...payload,
										newPath: value,
									}),
								);
							}
						}
						break;
				}
			}
		}
	} catch (err) {
		console.log(err);
		yield put({type: PWD_FAILURE});
		alert('PWD 에러발생 채널종료!');
		closeChannel(channel);
	}
}

function* watchSendCommand() {
	yield takeEvery(PWD_REQUEST, sendCommand);

	// const reqChannel = yield actionChannel(PWD_REQUEST);
	// console.log('watch send command pwd');
	// while (true) {
	// 	const action = yield take(reqChannel);
	// 	console.log('pwd request start!!');
	// 	yield call(sendCommand, action);
	// }
}

export default function* commandPwdSaga() {
	yield all([fork(watchSendCommand)]);
}
