import {all, fork, put, call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
	GET_USER_TICKET_REQUEST,
	GET_USER_TICKET_FAILURE,
	GET_USER_TICKET_SUCCESS,
} from '../../reducers/auth/userTicket';

const querystring = require('query-string');

function getUserTicketApi(params) {
	return axios.post(
		'/oauth2/v1/token',
		querystring.stringify({
			grant_type: 'password',
			// username: params.username,
			username: params.username, // client username 은 web이고 query parameter는 user 라서 직접입력함.
			password: params.password,
		}),
		{
			headers: {
				Authorization: params.Authorization,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
	);
}

function* getUserTicket(action) {
	try {
		const res = yield call(getUserTicketApi, action.params);
		yield put({type: GET_USER_TICKET_SUCCESS, data: res.data});
	} catch (err) {
		yield put({type: GET_USER_TICKET_FAILURE, data: err.response.data});
	}
}

function* watchGetUserTicket() {
	yield takeLatest(GET_USER_TICKET_REQUEST, getUserTicket);
}

export default function* userTicketSaga() {
	yield all([fork(watchGetUserTicket)]);
}
