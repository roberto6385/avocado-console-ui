import {all, fork, put, call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {authAction} from '../../reducers/api/auth';
import {
	ENCODE_DATA,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GRANT_TYPE_AUTH_CODE,
	GRANT_TYPE_CLIENT,
	GRANT_TYPE_PASSWORD,
	GRANT_TYPE_REFRESH,
} from '../../api/constants';
import {config} from '../../api/config';

const querystring = require('query-string');

export function clientAuthApi() {
	return axios.post(
		'/oauth2/v1/token',
		querystring.stringify({grant_type: GRANT_TYPE_CLIENT}),
		{
			headers: {
				Authorization: 'Basic ' + ENCODE_DATA,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			baseURL: config.auth,
		},
	);
}
function* clientAuth() {
	try {
		const res = yield call(clientAuthApi);
		console.log(res);
		yield put(authAction.clientSuccess(res.data));
	} catch (err) {
		yield put(authAction.clientFailuer(err));
	}
}

function userAuthApi(payload) {
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
			baseURL: config.auth,
		},
	);
}

function* userAuth(action) {
	console.log(action);
	try {
		const res = yield call(userAuthApi, action.payload);
		console.log(res);

		yield put(authAction.userSuccess(res.data));
	} catch (err) {
		yield put(authAction.userFailure(err));
	}
}

function refreshAuthApi(payload) {
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
			baseURL: config.auth,
		},
	);
}
function* refreshAuth(action) {
	try {
		const res = yield call(refreshAuthApi, action.payload);
		console.log(res);
		yield put(authAction.refreshSuccess(res.data));
	} catch (err) {
		yield put(authAction.refreshFailure(err));
	}
}

function verifyAuthApi(payload) {
	return axios.post('/oauth2/v1/verify', null, {
		headers: {
			Authorization: payload.Authorization,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		baseURL: config.auth,
	});
}
function* verifyAuth(action) {
	try {
		const res = yield call(verifyAuthApi, action.payload);
		yield put(authAction.verifySuccess(res.data));
	} catch (err) {
		yield put(authAction.verifyFailure(err));
	}
}

function revokeAuthApi(payload) {
	return axios.post('/oauth2/v1/revoke', null, {
		headers: {
			Authorization: payload.Authorization,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		baseURL: config.auth,
	});
}
function* revokeAuth(action) {
	try {
		yield call(revokeAuthApi, action.payload);
		yield put(authAction.revokeSuccess());
	} catch (err) {
		//TODO: error 일떄 logout 어떻게 처리해야 하는가?
		yield put(authAction.revokeFailure);
	}
}

function findAuthApi(payload) {
	return axios.get(
		`/oauth2/v1/token?offset=${payload.offset}&limit=${payload.limit}`,
		{
			data: null,
			headers: {
				Authorization: payload.Authorization,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			baseURL: config.auth,
		},
	);
}
function* findAuth(action) {
	try {
		const res = yield call(findAuthApi, action.payload);
		yield put(authAction.findSuccess(res.data));
	} catch (err) {
		yield put(authAction.findFailure(err));
	}
}

function alternativeAuthApi(payload) {
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
			baseURL: config.auth,
		},
	);
}

function* alternativeAuth(action) {
	try {
		const res = yield call(alternativeAuthApi, action.payload);
		console.log(res);
		yield put(authAction.alternativeSuccess(res.data));
	} catch (err) {
		yield put(authAction.alternativeFailure(err));
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

function googleAuthApi() {
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

function getGoogleUserApi(token) {
	return axios.get(
		`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
	);
}

function* googleAuth(action) {
	try {
		const res = yield call(googleAuthApi, action.payload);
		console.log(res);
		const user = yield call(getGoogleUserApi, res.data.access_token);
		yield put(
			authAction.googleSuccess({...res.data, email: user.data.email}),
		);
	} catch (err) {
		yield put(authAction.googleFailure(err));
	}
}

function* watchClient() {
	yield takeLatest(authAction.clientRequest, clientAuth);
}

function* watchUser() {
	yield takeLatest(authAction.userRequest, userAuth);
}

function* watchRefresh() {
	yield takeLatest(authAction.refreshRequest, refreshAuth);
}

function* watchVerify() {
	yield takeLatest(authAction.verifyRequest, verifyAuth);
}

function* watchRevoke() {
	yield takeLatest(authAction.revokeRequest, revokeAuth);
}

function* watchFind() {
	yield takeLatest(authAction.findRequest, findAuth);
}

// 클라이언트 인증 + 대체인증의 responese로 최종 체크하는 함수
function* watchAlternative() {
	yield takeLatest(authAction.alternativeRequest, alternativeAuth);
}

function* watchGoogle() {
	yield takeLatest(authAction.googleRequest, googleAuth);
}

export default function* authSaga() {
	yield all([
		fork(watchClient),
		fork(watchUser),
		fork(watchRefresh),
		fork(watchVerify),
		fork(watchRevoke),
		fork(watchFind),
		fork(watchAlternative),
		fork(watchGoogle),
	]);
}
