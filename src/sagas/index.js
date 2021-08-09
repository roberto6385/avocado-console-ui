import {all, fork} from 'redux-saga/effects';

import clientTicket from './auth/clientTicket';
import userTicket from './auth/userTicket';
import user from './auth/user';
import sftp from './sftp';
import ssh from './ssh/ssh';

export default function* rootSaga() {
	yield all([
		fork(clientTicket),
		fork(userTicket),
		fork(sftp),
		fork(ssh),
		fork(user),
	]);
}
