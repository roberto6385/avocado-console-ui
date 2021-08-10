import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import base64 from 'base-64';
import querystring from 'query-string';
import axios from 'axios';

import {
	GET_USER_TICKET_SUCCESS,
	REVOKE_USER_TICKET_SUCCESS,
} from '../../reducers/auth/userTicket';
import {
	DELETE_USER_ACCOUNT_FAILURE,
	DELETE_USER_ACCOUNT_REQUEST,
	DELETE_USER_ACCOUNT_SUCCESS,
	MODIFY_USER_ACCOUT_FAILURE,
	MODIFY_USER_ACCOUT_REQUEST,
	CREATE_USER_ACCOUNT_FAILURE,
	CREATE_USER_ACCOUNT_REQUEST,
	CREATE_USER_ACCOUNT_SUCCESS,
	FIND_USER_BY_ID_REQUEST,
	FIND_USER_BY_ID_FAILURE,
	FIND_USER_BY_ID_SUCCESS,
} from '../../reducers/auth/user';

async function createUserAccountApi(params) {
	console.log(params);
	return await axios.post(
		`/open/api/v1/users`,
		{
			id: params.id,
			companyId: 'netand',
			name: params.name,
			password: params.password,
			email: params.email,
			telephone: '02-1234-1234',
			mobile: '010-1234-1234',
		},
		{
			headers: {
				Authorization: `Bearer ${params.token}`,
				'Content-Type': 'application/json',
			},
			baseURL:
				'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
		},
	);
}

function createUserTokenApi() {
	const encodeData = base64.encode(`${'web'}:${'123456789'}`);
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

function* createUserAccount(action) {
	try {
		const res = yield call(createUserTokenApi, action.params);
		console.log(res);
		console.log(action.params);
		const user = yield call(createUserAccountApi, {
			...action.params,
			token: res.data.access_token,
		});

		console.log(user);
		console.log('회원가입이 완료되었습니다.');
		yield put({
			type: CREATE_USER_ACCOUNT_SUCCESS,
			payload: user,
		});
	} catch (err) {
		console.log(err);
		yield put({type: CREATE_USER_ACCOUNT_FAILURE, payload: err});
	}
}

async function modifyUserAccountApi(params) {
	console.log(params);
	return await axios.put(
		`/open/api/v1/users/${params.userUid}`,
		{
			name: params.name,
			password: params.password,
		},
		{
			headers: {
				Authorization: `Bearer ${params.access_token}`,
				'Content-Type': 'application/json',
			},
			baseURL:
				'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
		},
	);
}

function* modifyUserAccount(action) {
	try {
		const res = yield call(modifyUserAccountApi, action.params);
		console.log(res);
		yield put({
			type: GET_USER_TICKET_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		yield put({type: MODIFY_USER_ACCOUT_FAILURE, payload: err});
	}
}

async function deleteTokenApi(params) {
	console.log(params);
	return await axios.delete(`/open/api/v1/users/${params.userUid}`, {
		headers: {
			Authorization: `Bearer ${params.token}`,
			'Content-Type': 'application/json',
		},
		baseURL:
			'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
	});
}
function* deleteUserAccount(action) {
	try {
		const res = yield call(deleteTokenApi, action.params);
		console.log(res);
		yield put({
			type: DELETE_USER_ACCOUNT_SUCCESS,
		});
		yield put({
			type: REVOKE_USER_TICKET_SUCCESS,
		});
	} catch (err) {
		console.log(err);
		yield put({type: DELETE_USER_ACCOUNT_FAILURE, payload: err});
	}
}

function findUserByIdApi(params) {
	console.log(params);
	return axios.get(`/open/api/v1/users/id/${params.id}@netand.co.kr`, {
		headers: {
			Authorization: `Bearer ${params.access_token}`,
			'Content-Type': 'application/json',
		},
		baseURL:
			'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
	});
}

function* findUserById(action) {
	console.log(action);
	try {
		const res = yield call(findUserByIdApi, action.payload);
		console.log(res);
		yield put({type: FIND_USER_BY_ID_SUCCESS, payload: res.data});
	} catch (err) {
		yield put({type: FIND_USER_BY_ID_FAILURE, payload: err});
	}
}

function* watchCreateUserAccount() {
	yield takeLatest(CREATE_USER_ACCOUNT_REQUEST, createUserAccount);
}

function* watchModifyUserAccount() {
	yield takeLatest(MODIFY_USER_ACCOUT_REQUEST, modifyUserAccount);
}

function* watchDeleteUserAccount() {
	yield takeLatest(DELETE_USER_ACCOUNT_REQUEST, deleteUserAccount);
}

function* watchFindUserById() {
	yield takeLatest(FIND_USER_BY_ID_REQUEST, findUserById);
}

export default function* userSaga() {
	yield all([
		fork(watchCreateUserAccount),
		fork(watchModifyUserAccount),
		fork(watchDeleteUserAccount),
		fork(watchFindUserById),
	]);
}
