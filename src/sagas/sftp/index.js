import {cancel, fork, take, all} from 'redux-saga/effects';
import {DISCONNECTION_SUCCESS} from '../../reducers/sftp';

import connectSaga from './sendConnect';
import commandDisconnectSaga from './sendDisconnect';
import commandPwdSaga from './sendCommandPwd';
import commandLsSaga from './sendCommandLs';
import commandCdSaga from './sendCommandCd';
import commandMkdirSaga from './sendCommandMkdir';
import commandRmSaga from './sendCommandRm';
import commandRmdirSaga from './sendCommandRmdir';
import commandPurSaga from './sendCommandPut';

export default function* sftpSaga() {
	yield all([
		yield fork(connectSaga),
		yield fork(commandDisconnectSaga),
		yield fork(commandPwdSaga),
		yield fork(commandLsSaga),
		yield fork(commandCdSaga),
		yield fork(commandMkdirSaga),
		yield fork(commandRmSaga),
		yield fork(commandRmdirSaga),
		yield fork(commandPurSaga),
	]);
	yield take(DISCONNECTION_SUCCESS, yield cancel(yield fork(connectSaga)));
}
