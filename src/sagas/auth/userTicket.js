import {all, fork, put, call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
	GET_CLIENT_TICKET_REQUEST,
	GET_CLIENT_TICKET_FAILURE,
	GET_CLIENT_TICKET_SUCCESS,
	GET_USER_TICKET_REQUEST,
	GET_USER_TICKET_FAILURE,
	GET_USER_TICKET_SUCCESS,
	REFRESH_USER_TICKET_REQUEST,
	REFRESH_USER_TICKET_SUCCESS,
	REFRESH_USER_TICKET_FAILURE,
	REVOKE_USER_TICKET_REQUEST,
	REVOKE_USER_TICKET_FAILURE,
	REVOKE_USER_TICKET_SUCCESS,
	FIND_VALID_USER_TICKET_SUCCESS,
	FIND_VALID_USER_TICKET_FAILURE,
	FIND_VALID_USER_TICKET_REQUEST,
	VARIFY_USER_TICKET_REQUEST,
	VARIFY_USER_TICKET_SUCCESS,
	VARIFY_USER_TICKET_FAILURE,
} from '../../reducers/auth/userTicket';
import base64 from 'base-64';

const querystring = require('query-string');

function getUserTicketApi(params) {
	const encodeData = base64.encode(`${'web'}:${'123456789'}`);
	console.log('Basic ' + encodeData);
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
function* getClientTicket(action) {
	try {
		const res = yield call(getUserTicketApi, action.params);
		console.log(res);
		const user = yield call(getUserInfoApi, res.data);
		console.log(user);

		yield put({
			type: GET_USER_TICKET_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		yield put({type: GET_USER_TICKET_FAILURE, payload: err});
	}
}

function* getUserTicket(action) {
	try {
		const res = yield call(getUserTicketApi, action.params);
		console.log(res);
		const user = yield call(getUserInfoApi, res.data);
		console.log(user);

		yield put({
			type: GET_USER_TICKET_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		yield put({type: GET_USER_TICKET_FAILURE, payload: err});
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
		yield put({type: REFRESH_USER_TICKET_SUCCESS, payload: res.data});
	} catch (err) {
		yield put({
			type: REFRESH_USER_TICKET_FAILURE,
			payload: err.response.data,
		});
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

function findValidUserTicketApi(params) {
	return axios.get(
		`/oauth2/v1/token?offset=${params.offset}&limit=${params.limit}`,
		{
			data: null,
			headers: {
				Authorization: params.Authorization,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			baseURL:
				'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
		},
	);
}
function* findValidUserTicket(action) {
	try {
		const res = yield call(findValidUserTicketApi, action.params);
		yield put({type: FIND_VALID_USER_TICKET_SUCCESS, payload: res.data});
	} catch (err) {
		yield put({
			type: FIND_VALID_USER_TICKET_FAILURE,
			payload: err.response.data,
		});
	}
}

function getVerifyUserTicketApi(params) {
	return axios.post('/oauth2/v1/verify', null, {
		headers: {
			Authorization: params.Authorization,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		baseURL:
			'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
	});
}
function* getVerifyUserTicket(action) {
	try {
		const res = yield call(getVerifyUserTicketApi, action.params);
		yield put({type: VARIFY_USER_TICKET_SUCCESS, payload: res.data});
	} catch (err) {
		yield put({
			type: VARIFY_USER_TICKET_FAILURE,
			payload: err.response.data,
		});
	}
}

function* watchGetClientTicket() {
	yield takeLatest(GET_CLIENT_TICKET_REQUEST, getClientTicket);
}

function* watchGetUserTicket() {
	yield takeLatest(GET_USER_TICKET_REQUEST, getUserTicket);
}

function* watchRefreshUserTicket() {
	yield takeLatest(REFRESH_USER_TICKET_REQUEST, refreshUserTicket);
}

function* watchGetRevokeUserTicket() {
	yield takeLatest(REVOKE_USER_TICKET_REQUEST, revokeUserTicket);
}

function* watchFindValidUserTicket() {
	yield takeLatest(FIND_VALID_USER_TICKET_REQUEST, findValidUserTicket);
}

function* watchVerifyUserTicket() {
	yield takeLatest(VARIFY_USER_TICKET_REQUEST, getVerifyUserTicket);
}

export default function* userTicketSaga() {
	yield all([
		fork(watchGetUserTicket),
		fork(watchGetClientTicket),
		fork(watchRefreshUserTicket),
		fork(watchGetRevokeUserTicket),
		fork(watchFindValidUserTicket),
		fork(watchVerifyUserTicket),
	]);
}
