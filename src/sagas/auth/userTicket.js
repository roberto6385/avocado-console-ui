import {all, fork, put, call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
	GET_USER_TICKET_REQUEST,
	GET_USER_TICKET_FAILURE,
	GET_USER_TICKET_SUCCESS,
	REFRESH_USER_TICKET_REQUEST,
	REFRESH_USER_TICKET_SUCCESS,
	REFRESH_USER_TICKET_FAILURE,
	REVOKE_USER_TICKET_REQUEST,
	REVOKE_USER_TICKET_FAILURE,
	REVOKE_USER_TICKET_SUCCESS,
} from '../../reducers/auth/userTicket';
import base64 from 'base-64';

const querystring = require('query-string');

function getUserTicketApi(params) {
	const encodeData = base64.encode(`${'web'}:${'123456789'}`);

	return axios.post(
		'/oauth2/v1/token',

		querystring.stringify({
			grant_type: 'password',
			username: params.username, // client username 은 web이고 query parameter는 user 라서 직접입력함.
			password: params.password,
		}),
		{
			headers: {
				Authorization: 'Basic ' + encodeData,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			baseURL:
				'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
		},
	);
}
function getUserInfoApi(params) {
	return axios.get(`/open/api/v1/users/id/${params.user_id}@netand.co.kr`, {
		headers: {
			Authorization: `Bearer ${params.access_token}`,
			'Content-Type': 'application/json',
		},
		baseURL:
			'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
	});
}
function* getUserTicket(action) {
	try {
		const res = yield call(getUserTicketApi, action.params);
		const user = yield call(getUserInfoApi, res.data);

		yield put({
			type: GET_USER_TICKET_SUCCESS,
			payload: {
				data: res.data,
				user: {
					id: user.data.id,
					email: user.data.email,
					name: user.data.name,
					userUid: user.data.userUid,
				},
			},
		});
	} catch (err) {
		yield put({type: GET_USER_TICKET_FAILURE, data: err});
	}
}

function refreshUserTicketApi(params) {
	return axios.post(
		'/oauth2/v1/token',
		querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token: params.refresh_token,
		}),
		{
			headers: {
				Authorization: params.Authorization,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			baseURL:
				'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
		},
	);
}
function* refreshUserTicket(action) {
	try {
		const res = yield call(refreshUserTicketApi, action.params);
		console.log(res);
		yield put({type: REFRESH_USER_TICKET_SUCCESS, data: res.data});
	} catch (err) {
		yield put({type: REFRESH_USER_TICKET_FAILURE, data: err.response.data});
	}
}

function revokeUserTicketApi(params) {
	return axios.post('/oauth2/v1/revoke', null, {
		headers: {
			Authorization: params.Authorization,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		baseURL:
			'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
	});
}
function* revokeUserTicket(action) {
	try {
		yield call(revokeUserTicketApi, action.params);
		yield put({type: REVOKE_USER_TICKET_SUCCESS});
	} catch (err) {
		//TODO: error 일떄 logout 어떻게 처리해야 하는가?
		yield put({type: REVOKE_USER_TICKET_SUCCESS});
		yield put({type: REVOKE_USER_TICKET_FAILURE});
	}
}

function* watchGetUserTicket() {
	yield takeLatest(GET_USER_TICKET_REQUEST, getUserTicket);
}

function* watchRefreshUserTicket() {
	yield takeLatest(REFRESH_USER_TICKET_REQUEST, refreshUserTicket);
}

function* watchGetRevoke() {
	yield takeLatest(REVOKE_USER_TICKET_REQUEST, revokeUserTicket);
}

export default function* userTicketSaga() {
	yield all([
		fork(watchGetUserTicket),
		fork(watchRefreshUserTicket),
		fork(watchGetRevoke),
	]);
}
