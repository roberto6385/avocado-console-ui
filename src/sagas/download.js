import {actionChannel, all, call, fork, put, take} from 'redux-saga/effects';
import {
	DOWNLOAD_FAILURE,
	DOWNLOAD_REQUEST,
	DOWNLOAD_SUCCESS,
} from '../reducers/download';
import {buffers} from 'redux-saga';
import newSftp_ws from '../ws/sftp_ws';
import {SFTP_SAVE_HISTORY} from '../reducers/sftp';

const doSomething = async (payload) => {
	return await newSftp_ws({
		keyword: 'CommandByGet',
		ws: payload.ws,
		path: payload.path,
		fileName: payload.key.fileName,
	});
};

function* handleRequest(payload) {
	try {
		const res = yield call(doSomething, payload);
		yield put({type: DOWNLOAD_SUCCESS, date: res});
		yield put({
			type: SFTP_SAVE_HISTORY,
			data: {
				uuid: payload.uuid,
				name: payload.key.fileName,
				path: payload.path,
				size: payload.key.fileSize,
				todo: 'get',
				progress: res.percent,
				// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
				// 삭제, dispatch, 삭제 해서 progress 100 만들기
			},
		});
	} catch (err) {
		console.log(err);
		yield put({type: DOWNLOAD_FAILURE, data: err.response.data});
	}
}

function* watchDownload() {
	const requestChannel = yield actionChannel(
		DOWNLOAD_REQUEST,
		// buffers.sliding(2),
		// 동시에 사용 가능한 채널의 수 가 아니라 대기할 벤치의 수 같다...?
	);
	while (true) {
		const {payload} = yield take(requestChannel);
		yield call(handleRequest, payload);
	}
}

export default function* downloadSaga() {
	yield all([fork(watchDownload)]);
}
