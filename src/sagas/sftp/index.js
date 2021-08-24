import {all, fork} from 'redux-saga/effects';

import commandPwdSaga from './commandPwd';
import connectSaga from './connect';
import disconnectSaga from './disconnect';
import commandLsSaga from './commandLs';
import commandCdSaga from './commandCd';
import commandMkdirSaga from './commandMkdir';
import commandRenameSaga from './commandRename';
import reconnectSaga from './reconnect';

import commandRmSaga from './commandRemove';
import commandReadSaga from './sendCommandRead';
import commandWriteSaga from './sendCommandWrite';
import searchListSaga from './searchingDirectory';
import createWebsocketSaga from './createSocket';
import removeWebsocketSaga from './deleteSocket';
import commandStatSaga from './sendCommandStat';
import commandChmodSaga from './sendCommandChmod';

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
}
