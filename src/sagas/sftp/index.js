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
import commandRenameSaga from './sendCommandRename';
import {DISCONNECTION_SUCCESS} from '../../reducers/sftp';

export default function* sftpSaga() {
	yield all([
		fork(connectSaga),
		fork(disconnectSaga),
		fork(commandPwdSaga),
		fork(commandLsSaga),
		fork(commandCdSaga),
		fork(commandMkdirSaga),
		fork(commandRmSaga),
		fork(commandPutSaga),
		fork(commandGetSaga),
		fork(commandRenameSaga),
	]);
	yield take(DISCONNECTION_SUCCESS, yield cancel(yield fork(connectSaga)));
}
