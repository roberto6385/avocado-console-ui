import {actionChannel, all, call, fork, take} from 'redux-saga/effects';
import {DOWNLOAD_REQUEST} from '../reducers/download';
import {buffers} from 'redux-saga';

function handleRequest(payload) {
	console.log(payload);
	// try{
	// }catch(err){
	//
	// }
}

function* watchDownload() {
	const requestChannel = yield actionChannel(
		DOWNLOAD_REQUEST,
		buffers.sliding(5),
	);
	while (true) {
		const {payload} = yield take(requestChannel);
		yield call(handleRequest, payload);
	}
}

export default function* downloadSaga() {
	yield all([fork(watchDownload)]);
}
