import {cancel, fork, take, all} from 'redux-saga/effects';
import {DISCONNECTION_SUCCESS} from '../../reducers/sftp/index';

import connectSaga from './sendConnect';
import disconnectSaga from './sendDisconnect';
import commandSaga from './sendCommand';

export default function* sftpSaga() {
	yield all([
		yield fork(connectSaga),
		yield fork(disconnectSaga),
		yield fork(commandSaga),
	]);
	yield take(DISCONNECTION_SUCCESS, yield cancel(yield fork(connectSaga)));
}
