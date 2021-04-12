import {all, fork} from 'redux-saga/effects';
import clientTicket from './clientTicket';
import userTicket from './userTicket';
import refreshTicket from './refreshTicket';

export default function* rootSaga() {
	yield all([fork(clientTicket), fork(userTicket), fork(refreshTicket)]);
}
