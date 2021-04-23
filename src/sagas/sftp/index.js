import {cancel, fork, take, all} from 'redux-saga/effects';

import commandPwdSaga from './sendCommandPwd';
import connectSaga from './sendConnect';
import disconnectSaga from './sendDisconnect';
import commandLsSaga from './sendCommandLs';
import commandCdSaga from './sendCommandCd';
import commandMkdirSaga from './sendCommandMkdir';
import commandRmSaga from './sendCommandRm';
import commandPutSaga from './sendCommandPut';
import commandGetSaga from './sendCommandGet';
import commandEditSaga from './sendCommandEdit';
import commandRenameSaga from './sendCommandRename';
import {DISCONNECTION_SUCCESS} from '../../reducers/sftp';

export default function* sftpSaga() {
	yield all([
		yield fork(connectSaga),
		yield fork(disconnectSaga),
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
