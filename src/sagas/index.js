import {all, fork} from 'redux-saga/effects';
import clientTicket from './clientTicket';
import userTicket from './userTicket';

export default function* rootSaga() {
	yield all([fork(clientTicket), fork(userTicket)]);
}
