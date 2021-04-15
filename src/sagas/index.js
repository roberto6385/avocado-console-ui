import {all, fork} from 'redux-saga/effects';
import clientTicket from './auth/clientTicket';
import userTicket from './auth/userTicket';
import refreshTicket from './auth/refreshTicket';
import verify from './auth/verify';
import revoke from './auth/revoke';
import find from './auth/find';

import download from './download';
import upload from './upload';

import sftp from './sftp';

export default function* rootSaga() {
	yield all([
		fork(clientTicket),
		fork(userTicket),
		fork(refreshTicket),
		fork(verify),
		fork(revoke),
		fork(find),
		fork(download),
		fork(upload),
		fork(sftp),
	]);
}
