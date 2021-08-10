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
	ALTERNATIVE_TICKET_REQUEST,
	ALTERNATIVE_TICKET_FAILURE,
	ALTERNATIVE_TICKET_SUCCESS,
} from '../../reducers/auth/userTicket';
import {encodeData} from '../../api/constants';

const querystring = require('query-string');

function getClientTicketApi() {
	// web, 123456789 auth part확립되면 params로
	return axios.post(
		'/oauth2/v1/token',
		querystring.stringify({grant_type: 'client_credentials'}),
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
function* getClientTicket(action) {
	try {
		const res = yield call(getClientTicketApi, action.payload);
		console.log(res);

		yield put({
			type: GET_CLIENT_TICKET_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		yield put({type: GET_CLIENT_TICKET_FAILURE, payload: err});
	}
}

function getUserTicketApi(payload) {
	console.log('Basic ' + encodeData);
	return axios.post(
		'/oauth2/v1/token',

		querystring.stringify({
			//
			grant_type: 'password', // user인증
			username: payload.username, // client username 은 web이고 query parameter는 user 라서 직접입력함.
			password: payload.password,
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

function* getUserTicket(action) {
	try {
		const res = yield call(getUserTicketApi, action.payload);
		console.log(res);

		yield put({
			type: GET_USER_TICKET_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		yield put({type: GET_USER_TICKET_FAILURE, payload: err});
	}
}

function refreshUserTicketApi(payload) {
	return axios.post(
		'/oauth2/v1/token',
		querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token: payload.refresh_token,
		}),
		{
			headers: {
				Authorization: payload.Authorization,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			baseURL:
				'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
		},
	);
}
function* refreshUserTicket(action) {
	try {
		const res = yield call(refreshUserTicketApi, action.payload);
		console.log(res);
		yield put({type: REFRESH_USER_TICKET_SUCCESS, payload: res.data});
	} catch (err) {
		yield put({
			type: REFRESH_USER_TICKET_FAILURE,
			payload: err.response.data,
		});
	}
}

function verifyUserTicketApi(payload) {
	return axios.post('/oauth2/v1/verify', null, {
		headers: {
			Authorization: payload.Authorization,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		baseURL:
			'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
	});
}
function* verifyUserTicket(action) {
	try {
		const res = yield call(verifyUserTicketApi, action.payload);
		yield put({type: VARIFY_USER_TICKET_SUCCESS, payload: res.data});
	} catch (err) {
		yield put({
			type: VARIFY_USER_TICKET_FAILURE,
			payload: err.response.data,
		});
	}
}

function revokeUserTicketApi(payload) {
	return axios.post('/oauth2/v1/revoke', null, {
		headers: {
			Authorization: payload.Authorization,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		baseURL:
			'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
	});
}
function* revokeUserTicket(action) {
	try {
		yield call(revokeUserTicketApi, action.payload);
		yield put({type: REVOKE_USER_TICKET_SUCCESS});
	} catch (err) {
		//TODO: error 일떄 logout 어떻게 처리해야 하는가?
		yield put({type: REVOKE_USER_TICKET_SUCCESS});
		yield put({type: REVOKE_USER_TICKET_FAILURE});
	}
}

function findValidUserTicketApi(payload) {
	return axios.get(
		`/oauth2/v1/token?offset=${payload.offset}&limit=${payload.limit}`,
		{
			data: null,
			headers: {
				Authorization: payload.Authorization,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			baseURL:
				'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
		},
	);
}
function* findValidUserTicket(action) {
	try {
		const res = yield call(findValidUserTicketApi, action.payload);
		yield put({type: FIND_VALID_USER_TICKET_SUCCESS, payload: res.data});
	} catch (err) {
		yield put({
			type: FIND_VALID_USER_TICKET_FAILURE,
			payload: err.response.data,
		});
	}
}

function alternativeUserTicketApi(payload) {
	// ex
	// return axios.post('/oauth2/v1/verify', null, {
	// 	headers: {
	// 		Authorization: payload.Authorization,
	// 		'Content-Type': 'application/x-www-form-urlencoded',
	// 	},
	// 	baseURL:
	// 		'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
	// });
}

function* alternativeUserTicket(action) {
	try {
		const res = yield call(alternativeUserTicketApi, action.payload);
		console.log(res);
		yield put({type: ALTERNATIVE_TICKET_SUCCESS});
	} catch (err) {
		yield put({type: ALTERNATIVE_TICKET_FAILURE});
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

function* watchVerifyUserTicket() {
	yield takeLatest(VARIFY_USER_TICKET_REQUEST, verifyUserTicket);
}

function* watchRevokeUserTicket() {
	yield takeLatest(REVOKE_USER_TICKET_REQUEST, revokeUserTicket);
}

function* watchFindValidUserTicket() {
	yield takeLatest(FIND_VALID_USER_TICKET_REQUEST, findValidUserTicket);
}

function* watchAlternativeUserTicket() {
	yield takeLatest(ALTERNATIVE_TICKET_REQUEST, alternativeUserTicket);
}

export default function* userTicketSaga() {
	yield all([
		fork(watchGetUserTicket),
		fork(watchGetClientTicket),
		fork(watchRefreshUserTicket),
		fork(watchVerifyUserTicket),
		fork(watchRevokeUserTicket),
		fork(watchFindValidUserTicket),
		fork(watchAlternativeUserTicket),
	]);
}
