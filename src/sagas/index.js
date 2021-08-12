import {all, fork} from 'redux-saga/effects';

import authSaga from './api/auth';
import userResourceSaga from './api/userResource';
import sftp from './sftp';
import ssh from './ssh/ssh';

export default function* rootSaga() {
	yield all([fork(authSaga), fork(sftp), fork(ssh), fork(userResourceSaga)]);
}
