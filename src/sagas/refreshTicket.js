import {all, fork, put, call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
	GET_REFRESH_TICKET_FAILURE,
	GET_REFRESH_TICKET_SUCCESS,
	GET_REFRESH_TICKET_REQUEST,
} from '../reducers/refreshTicket';

const querystring = require('query-string');

function getRefreshTicketApi(params) {
	return axios.post(
		'/oauth2/v1/token/',
		querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token: params.refresh_token,
		}),
		{
			headers: {
				Authorization: params.Authorization,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
	);
}

function* getRefreshTicket(action) {
	try {
		const res = yield call(getRefreshTicketApi, action.params);
		yield put({type: GET_REFRESH_TICKET_SUCCESS, data: res.data});
	} catch (err) {
		yield put({type: GET_REFRESH_TICKET_FAILURE, data: err.response.data});
	}
}

function* watchGetRefreshTicket() {
	yield takeLatest(GET_REFRESH_TICKET_REQUEST, getRefreshTicket);
}

export default function* refreshTicketSaga() {
	yield all([fork(watchGetRefreshTicket)]);
}
