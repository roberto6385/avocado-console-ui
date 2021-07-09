import {cancel, fork, take, all} from 'redux-saga/effects';

import commandPwdSaga from './sendCommandPwd';
import connectSaga from './sendConnect';
import reconnectSaga from './sendReconnect';
import disconnectSaga from './sendDisconnect';
import commandLsSaga from './sendCommandLs';
import commandCdSaga from './sendCommandCd';
import commandMkdirSaga from './sendCommandMkdir';
import commandRmSaga from './sendCommandRm';
import commandReadSaga from './sendCommandRead';
import commandWriteSaga from './sendCommandWrite';
import commandRenameSaga from './sendCommandRename';
import searchListSaga from './searchDeleteList';
import createWebsocketSaga from './createNewWebsocket';
import removeWebsocketSaga from './removeNewWebsocket';
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
	]);
	yield take(DISCONNECTION_SUCCESS, yield cancel(yield fork(connectSaga)));
}
