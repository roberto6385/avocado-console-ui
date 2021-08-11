import {all, fork} from 'redux-saga/effects';

import userTicket from './auth/userTicket';
import userSaga from './auth/user';
import sftp from './sftp';
import ssh from './ssh/ssh';

export default function* rootSaga() {
	yield all([fork(userTicket), fork(sftp), fork(ssh), fork(userSaga)]);
}
