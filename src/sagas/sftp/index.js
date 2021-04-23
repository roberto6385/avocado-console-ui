import {cancel, fork, take, all} from 'redux-saga/effects';
import {DISCONNECTION_SUCCESS} from '../../reducers/sftp';

import connectSaga from './sendConnect';
import commandDisconnectSaga from './sendDisconnect';
import commandPwdSaga from './sendCommandPwd';
import commandLsSaga from './sendCommandLs';
import commandCdSaga from './sendCommandCd';
import commandMkdirSaga from './sendCommandMkdir';
import commandRmSaga from './sendCommandRm';
import commandPutSaga from './sendCommandPut';
import commandGetSaga from './sendCommandGet';
import commandEditSaga from './sendCommandEdit';
import commandRenameSaga from './sendCommandRename';

export default function* sftpSaga() {
	yield all([
		yield fork(connectSaga),
		yield fork(commandDisconnectSaga),
		yield fork(commandPwdSaga),
		yield fork(commandLsSaga),
		yield fork(commandCdSaga),
		yield fork(commandMkdirSaga),
		yield fork(commandRmSaga),
		yield fork(commandPutSaga),
		yield fork(commandGetSaga),
		yield fork(commandEditSaga),
		yield fork(commandRenameSaga),
	]);
	yield take(DISCONNECTION_SUCCESS, yield cancel(yield fork(connectSaga)));
}
