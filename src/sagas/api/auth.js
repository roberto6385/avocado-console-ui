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
function* getClientAuth() {
	try {
		const res = yield call(clientAuthApi);
		console.log(res);
		yield put(authAction.getClientAuthSuccess(res.data));
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

function* getUserAuth(action) {
	console.log(action);
	try {
		const res = yield call(userAuthApi, action.payload);
		console.log(res);

		yield put(authAction.getUserAuthSuccess(res.data));
	} catch (err) {
		yield put(authAction.getUserAuthFailure(err));
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
function* refreshToken(action) {
	try {
		const res = yield call(refreshAuthApi, action.payload);
		console.log(res);
		yield put(authAction.refreshTokenSuccess(res.data));
	} catch (err) {
		yield put(authAction.refreshTokenFailure(err));
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
function* verifyToken(action) {
	try {
		const res = yield call(verifyAuthApi, action.payload);
		yield put(authAction.verifyTokenSuccess(res.data));
	} catch (err) {
		yield put(authAction.verifyTokenFailure(err));
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
function* revokeToken(action) {
	try {
		yield call(revokeAuthApi, action.payload);
		yield put(authAction.revokeTokenSuccess());
	} catch (err) {
		//TODO: error 일떄 logout 어떻게 처리해야 하는가?
		yield put(authAction.revokeTokenFailure);
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
function* findToken(action) {
	try {
		const res = yield call(findAuthApi, action.payload);
		yield put(authAction.findTokenSuccess(res.data));
	} catch (err) {
		yield put(authAction.findTokenFailure(err));
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

function* getAlternativeAuth(action) {
	try {
		const res = yield call(alternativeAuthApi, action.payload);
		console.log(res);
		yield put(authAction.getAlternativeAuthSuccess(res.data));
	} catch (err) {
		yield put(authAction.getAlternativeAuthFailure(err));
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

function* getGoogleAuth(action) {
	try {
		const res = yield call(googleAuthApi, action.payload);
		console.log(res);
		const user = yield call(getGoogleUserApi, res.data.access_token);
		yield put(
			authAction.getGoogleAuthSuccess({
				...res.data,
				email: user.data.email,
			}),
		);
	} catch (err) {
		yield put(authAction.getGoogleAuthFailure(err));
	}
}

function* watchGetClientAuth() {
	yield takeLatest(authAction.getClientAuthRequest, getClientAuth);
}

function* watchGetUserAuth() {
	yield takeLatest(authAction.getUserAuthRequest, getUserAuth);
}

function* watchRefreshToken() {
	yield takeLatest(authAction.refreshTokenRequest, refreshToken);
}

function* watchVerifyToken() {
	yield takeLatest(authAction.verifyTokenRequest, verifyToken);
}

function* watchRevokeToken() {
	yield takeLatest(authAction.revokeTokenRequest, revokeToken);
}

function* watchFindToken() {
	yield takeLatest(authAction.findTokenRequest, findToken);
}

// 클라이언트 인증 + 대체인증의 responese로 최종 체크하는 함수
function* watchGetAlternativeAuth() {
	yield takeLatest(authAction.getAlternativeAuthRequest, getAlternativeAuth);
}

function* watchGetGoogleAuth() {
	yield takeLatest(authAction.getGoogleAuthRequest, getGoogleAuth);
}

export default function* authSaga() {
	yield all([
		fork(watchGetClientAuth),
		fork(watchGetUserAuth),
		fork(watchRefreshToken),
		fork(watchVerifyToken),
		fork(watchRevokeToken),
		fork(watchFindToken),
		fork(watchGetAlternativeAuth),
		fork(watchGetGoogleAuth),
	]);
}
