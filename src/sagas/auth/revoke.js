import {all, fork, put, call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
	GET_REVOKE_FAILURE,
	GET_REVOKE_REQUEST,
	GET_REVOKE_SUCCESS,
} from '../../reducers/auth/revoke';
import {REVOKE_USER_TICKET} from '../../reducers/auth/userTicket';

function getRevokeApi(params) {
	return axios.post(
		'/oauth2/v1/revoke',
		{},
		{
			headers: {
				Authorization: params.Authorization,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
	);
}

function* getRevoke(action) {
	try {
		const res = yield call(getRevokeApi, action.params);
		yield put({type: GET_REVOKE_SUCCESS, data: res.data});
		yield put({type: REVOKE_USER_TICKET});
	} catch (err) {
		yield put({type: GET_REVOKE_FAILURE, data: err.response.data});
	}
}

function* watchGetRevoke() {
	yield takeLatest(GET_REVOKE_REQUEST, getRevoke);
}

export default function* revokeSaga() {
	yield all([fork(watchGetRevoke)]);
}
