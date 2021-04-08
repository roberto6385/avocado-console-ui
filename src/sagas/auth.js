import {all, fork, takeEvery} from 'redux-saga/effects';
import {REQUEST_LOGIN} from '../reducers/user';

// function* loginSaga(action) {
// 	try {
// 		// const response = yield call(loginApi,action.data)
// 		// yield put()
// 	} catch (e) {
// 		console.log(e);
// 	}
// }

function* watchLogin() {
	// yield takeEvery(REQUEST_LOGIN, loginSaga);
}

export default function* authSaga() {
	yield all([fork(watchLogin)]);
}
