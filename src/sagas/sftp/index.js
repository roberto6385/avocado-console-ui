import {cancel, fork, take, all} from 'redux-saga/effects';

import commandPwdSaga from './sendCommandPwd';
import connectSaga from './sendConnect';
import disconnectSaga from './sendDisconnect';
import commandLsSaga from './sendCommandLs';
import commandCdSaga from './sendCommandCd';
import commandMkdirSaga from './sendCommandMkdir';
import commandRmSaga from './sendCommandRm';
import commandRmdirSaga from './sendCommandRmdir';
import commandPutSaga from './sendCommandPut';
import commandGetSaga from './sendCommandGet';
import commandReadSaga from './sendCommandRead';
import commandWriteSaga from './sendCommandWrite';
import commandRenameSaga from './sendCommandRename';
import searchListSaga from './searchDeleteList';
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
		fork(commandRmdirSaga),
		fork(commandPutSaga),
		fork(commandGetSaga),
		fork(commandReadSaga),
		fork(commandRenameSaga),
		fork(commandWriteSaga),
		fork(searchListSaga),
	]);
	yield take(DISCONNECTION_SUCCESS, yield cancel(yield fork(connectSaga)));
}
