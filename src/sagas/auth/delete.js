import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {
	DELETE_ACCOUNT_REQUEST,
	DELETE_ACCOUNT_SUCCESS,
	DELETE_ACCOUNT_FAILURE,
} from '../../reducers/auth/delete';
import axios from 'axios';
import {REVOKE_USER_TICKET_SUCCESS} from '../../reducers/auth/userTicket';

async function deleteTokenApi(params) {
	console.log(params);
	return await axios.delete(`/open/api/v1/users/${params.userUid}`, {
		headers: {
			Authorization: `Bearer ${params.token}`,
			'Content-Type': 'application/json',
		},
		baseURL:
			'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
	});
}

function* deleteAccount(action) {
	try {
		const res = yield call(deleteTokenApi, action.params);
		console.log(res);
		yield put({
			type: DELETE_ACCOUNT_SUCCESS,
		});
		yield put({
			type: REVOKE_USER_TICKET_SUCCESS,
		});
	} catch (err) {
		console.log(err);
		yield put({type: DELETE_ACCOUNT_FAILURE, payload: err});
	}
}

function* watchDeleteAccount() {
	yield takeLatest(DELETE_ACCOUNT_REQUEST, deleteAccount);
}

export default function* deleteAccountSaga() {
	yield all([fork(watchDeleteAccount)]);
}
