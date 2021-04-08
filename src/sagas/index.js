import {all} from 'redux-saga/effects';
import authSaga from './auth';

export function* rootSaga() {
	yield all([authSaga()]);
}
