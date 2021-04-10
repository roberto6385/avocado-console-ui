import {all, fork} from 'redux-saga/effects';
import userTicket from './userTicket';

export default function* rootSaga() {
	yield all([fork(userTicket)]);
}
