import {all, fork, put, call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
	GET_CLIENT_TICKET_REQUEST,
	GET_CLIENT_TICKET_FAILURE,
	GET_CLIENT_TICKET_SUCCESS,
} from '../../reducers/auth/clientTicket';

const querystring = require('query-string');

function getClientTicketApi(params) {
	return axios.post(
		'/oauth2/v1/token/',
		querystring.stringify({grant_type: 'client_credentials'}),
		{
			headers: {
				Authorization: params.Authorization,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
	);
}

function* getClientTicket(action) {
	try {
		const res = yield call(getClientTicketApi, action.params);
		yield put({type: GET_CLIENT_TICKET_SUCCESS, data: res.data});
	} catch (err) {
		yield put({type: GET_CLIENT_TICKET_FAILURE, data: err.response.data});
	}
}

function* watchGetClientTicket() {
	yield takeLatest(GET_CLIENT_TICKET_REQUEST, getClientTicket);
}

export default function* clientTicketSaga() {
	yield all([fork(watchGetClientTicket)]);
}
