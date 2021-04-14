import {actionChannel, all, call, fork, put, take} from 'redux-saga/effects';
import {
	UPLOAD_FAILURE,
	UPLOAD_REQUEST,
	UPLOAD_SUCCESS,
} from '../reducers/upload';
import {buffers} from 'redux-saga';
import newSftp_ws from '../ws/sftp_ws';
import {SFTP_SAVE_HISTORY} from '../reducers/sftp';

const doSomething = async (payload) => {
	console.log(payload);
	return await newSftp_ws({
		keyword: 'CommandByPut',
		ws: payload.ws,
		path: payload.path,
		uploadFile: payload.key,
	});
};

function* handleRequest(payload) {
	try {
		const res = yield call(doSomething, payload);
		yield put({type: UPLOAD_SUCCESS, date: res});
		yield put({
			type: SFTP_SAVE_HISTORY,
			data: {
				uuid: payload.uuid,
				name: payload.key.name,
				path: payload.path,
				size: payload.key.size,
				todo: 'put',
				progress: res.percent,
				// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
				// 삭제, dispatch, 삭제 해서 progress 100 만들기
			},
		});
		yield console.log('end!!');
	} catch (err) {
		console.log(err);
		yield put({type: UPLOAD_FAILURE, data: err.response.data});
	}
}

function* watchUpload() {
	const requestChannel = yield actionChannel(
		UPLOAD_REQUEST,
		// buffers.sliding(2),
		// 동시에 사용 가능한 채널의 수 가 아니라 대기할 벤치의 수 같다...?
	);
	while (true) {
		const {payload} = yield take(requestChannel);
		yield call(handleRequest, payload);
	}
}

export default function* uploadSaga() {
	yield all([fork(watchUpload)]);
}
