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
	AUTH_WITH_GOOGLE_REQUEST,
	AUTH_WITH_GOOGLE_SUCCESS,
	AUTH_WITH_GOOGLE_FAILURE,
} from '../../reducers/auth/userTicket';
import {
	ENCODE_DATA,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GRANT_TYPE_AUTH_CODE,
	GRANT_TYPE_CLIENT,
	GRANT_TYPE_PASSWORD,
	GRANT_TYPE_REFRESH,
} from '../../api/constants';

const querystring = require('query-string');

export function getClientTicketApi() {
	return axios.post(
		'/oauth2/v1/token',
		querystring.stringify({grant_type: GRANT_TYPE_CLIENT}),
		{
			headers: {
				Authorization: 'Basic ' + ENCODE_DATA,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			baseURL:
				'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
		},
	);
}
function* getClientTicket() {
	try {
		const res = yield call(getClientTicketApi);
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
	console.log('Basic ' + ENCODE_DATA);
	return axios.post(
		'/oauth2/v1/token',

		querystring.stringify({
			//
			grant_type: GRANT_TYPE_PASSWORD, // user인증
			username: payload.username, // client username 은 web이고 query parameter는 user 라서 직접입력함.
			password: payload.password,
		}),
		{
			headers: {
				Authorization: 'Basic ' + ENCODE_DATA,
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
			grant_type: GRANT_TYPE_REFRESH,
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
	return axios.post(
		'/oauth2/v1/alternative/verify',
		querystring.stringify({
			username: payload.email,
		}),
		{
			headers: {
				Authorization: `Bearer ${payload.auth}`,
				AlternativeAuthN: `google ${payload.alternativeAuth}`,
				'Content-Type': `application/x-www-form-urlencoded`,
			},
			baseURL:
				'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
		},
	);
}

function* alternativeUserTicket(action) {
	try {
		const res = yield call(alternativeUserTicketApi, action.payload);
		console.log(res);
		yield put({type: ALTERNATIVE_TICKET_SUCCESS, payload: res.data});
	} catch (err) {
		yield put({type: ALTERNATIVE_TICKET_FAILURE, payload: err});
	}
}

const getParameter = (name) => {
	const list = location.search.substring(1).split('&');
	for (let i = 0; i < list.length; i++) {
		const data = list[i].split('=');
		if (data.length === 2) {
			if (data[0] === name) {
				return data[1];
			}
		}
	}
	return null;
};

function authWithGoogleApi() {
	return axios.post(
		'https://accounts.google.com/o/oauth2/token',
		querystring.stringify({
			code: decodeURIComponent(getParameter('code')),
			grant_type: GRANT_TYPE_AUTH_CODE,
			redirect_uri:
				window.location.protocol +
				'//' +
				window.location.host +
				'/Redirect',
			client_id: GOOGLE_CLIENT_ID,
			client_secret: GOOGLE_CLIENT_SECRET,
		}),
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
	);
}

function getUserInfoWithGoogleApi(token) {
	return axios.get(
		`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
	);
}

function* authWithGoogle(action) {
	try {
		const res = yield call(authWithGoogleApi, action.payload);
		console.log(res);
		const user = yield call(
			getUserInfoWithGoogleApi,
			res.data.access_token,
		);
		yield put({
			type: AUTH_WITH_GOOGLE_SUCCESS,
			payload: {...res.data, email: user.data.email},
		});
	} catch (err) {
		yield put({type: AUTH_WITH_GOOGLE_FAILURE});
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

// 클라이언트 인증 + 대체인증의 responese로 최종 체크하는 함수
function* watchAlternativeUserTicket() {
	yield takeLatest(ALTERNATIVE_TICKET_REQUEST, alternativeUserTicket);
}

function* watchAlternativeAuthWithGoogle() {
	yield takeLatest(AUTH_WITH_GOOGLE_REQUEST, authWithGoogle);
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
		fork(watchAlternativeAuthWithGoogle),
	]);
}
