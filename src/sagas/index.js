import {all, fork} from 'redux-saga/effects';
import clientTicket from './auth/clientTicket';
import userTicket from './auth/userTicket';
import createUser from './auth/create';
import deleteAccount from './auth/delete';
import putModifySaga from './auth/modify';

import sftp from './sftp';
import sshtSage from './ssh/ssh';

export default function* rootSaga() {
	yield all([
		fork(clientTicket),
		fork(userTicket),
		fork(putModifySaga),
		fork(sftp),
		fork(sshtSage),
		fork(createUser),
		fork(deleteAccount),
	]);
}
