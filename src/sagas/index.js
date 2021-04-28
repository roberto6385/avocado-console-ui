import {all, fork} from 'redux-saga/effects';
import clientTicket from './auth/clientTicket';
import userTicket from './auth/userTicket';
import refreshTicket from './auth/refreshTicket';
import verify from './auth/verify';
import revoke from './auth/revoke';
import find from './auth/find';

import sftp from './sftp';
import sshtSage from './ssht/ssht';

export default function* rootSaga() {
	yield all([
		fork(clientTicket),
		fork(userTicket),
		fork(refreshTicket),
		fork(verify),
		fork(revoke),
		fork(find),
		fork(sftp),
		fork(sshtSage),
	]);
}
