import {cancel, fork, take, all} from 'redux-saga/effects';
import {DISCONNECTION_SUCCESS} from '../../reducers/sftp/index';

import connectSaga from './sendConnect';
import disconnectSaga from './sendDisconnect';

export default function* sftpSaga() {
	yield all([yield fork(connectSaga), yield fork(disconnectSaga)]);
	yield take(DISCONNECTION_SUCCESS, yield cancel(yield fork(connectSaga)));
}
