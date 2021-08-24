import {cancel, fork, take, all} from 'redux-saga/effects';

import commandPwdSaga from './commandPwd';
import connectSaga from './connect';
import disconnectSaga from './disconnect';
import commandLsSaga from './commandLs';
import commandCdSaga from './commandCd';
import commandMkdirSaga from './commandMkdir';
import commandRenameSaga from './commandRename';

import reconnectSaga from './sendReconnect';
import commandRmSaga from './sendCommandRm';
import commandReadSaga from './sendCommandRead';
import commandWriteSaga from './sendCommandWrite';
import searchListSaga from './searchDeleteList';
import createWebsocketSaga from './createNewWebsocket';
import removeWebsocketSaga from './removeNewWebsocket';
import commandStatSaga from './sendCommandStat';
import commandChmodSaga from './sendCommandChmod';
import {DISCONNECTION_SUCCESS} from '../../reducers/sftp';

export default function* sftpSaga() {
	yield all([
		fork(connectSaga),
		fork(reconnectSaga),
		fork(disconnectSaga),
		fork(commandPwdSaga),
		fork(commandLsSaga),
		fork(commandCdSaga),
		fork(commandMkdirSaga),
		fork(commandRmSaga),
		fork(commandReadSaga),
		fork(commandRenameSaga),
		fork(commandWriteSaga),
		fork(searchListSaga),
		fork(createWebsocketSaga),
		fork(removeWebsocketSaga),
		fork(commandStatSaga),
		fork(commandChmodSaga),
	]);
	yield take(DISCONNECTION_SUCCESS, yield cancel(yield fork(connectSaga)));
}
