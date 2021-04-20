import {cancel, fork, take, all} from 'redux-saga/effects';
import {DISCONNECTION_SUCCESS} from '../../reducers/sftp';

import connectSaga from './sendConnect';
import commandDisconnectSaga from './sendDisconnect';
import commandPwdSaga from './sendCommandPwd';
import commandLsSaga from './sendCommandLs';
import commandCdSaga from './sendCommandCd';
import commandMkdirSaga from './sendCommandMkdir';

export default function* sftpSaga() {
	yield all([
		yield fork(connectSaga),
		yield fork(commandDisconnectSaga),
		yield fork(commandPwdSaga),
		yield fork(commandLsSaga),
		yield fork(commandCdSaga),
		yield fork(commandMkdirSaga),
	]);
	yield take(DISCONNECTION_SUCCESS, yield cancel(yield fork(connectSaga)));
}
