import {cancel, fork, take, all} from 'redux-saga/effects';
import {DISCONNECTION_SUCCESS} from '../../reducers/sftp';

import connectSaga from './sendConnect';
// import disconnectSaga from './sendDisconnect';
// import commandSaga from './sendCommand';
import commandPwdSaga from './sendCommandPwd';
import commandDisconnectSaga from './sendDisconnect';

export default function* sftpSaga() {
	yield all([
		yield fork(connectSaga),
		yield fork(commandDisconnectSaga),
		// yield fork(commandSaga),
		yield fork(commandPwdSaga),
	]);
	yield take(DISCONNECTION_SUCCESS, yield cancel(yield fork(connectSaga)));
}
