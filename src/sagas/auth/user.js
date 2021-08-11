import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
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
import {getClientTicketApi} from './userTicket';

async function createUserAccountApi(payload) {
	console.log(payload);
	return await axios.post(
		`/open/api/v1/users`,
		{
			id: payload.id,
			companyId: 'netand',
			name: payload.name,
			password: payload.password,
			email: payload.email,
			telephone: '02-1234-1234',
			mobile: '010-1234-1234',
		},
		{
			headers: {
				Authorization: `Bearer ${payload.token}`,
				'Content-Type': 'application/json',
			},
			baseURL:
				'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
		},
	);
}

function* createUserAccount(action) {
	try {
		console.log(action.payload);
		const client = yield call(getClientTicketApi);
		const user = yield call(createUserAccountApi, {
			...action.payload,
			token: client.data.access_token,
		});
		console.log(user);
		yield put({
			type: CREATE_USER_ACCOUNT_SUCCESS,
			payload: user,
		});
	} catch (err) {
		console.log(err);
		yield put({type: CREATE_USER_ACCOUNT_FAILURE, payload: err});
	}
}

async function modifyUserAccountApi(payload) {
	console.log(payload);
	return await axios.put(
		`/open/api/v1/users/${payload.userUid}`,
		{
			name: payload.name,
			password: payload.password,
		},
		{
			headers: {
				Authorization: `Bearer ${payload.access_token}`,
				'Content-Type': 'application/json',
			},
			baseURL:
				'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
		},
	);
}

function* modifyUserAccount(action) {
	try {
		const res = yield call(modifyUserAccountApi, action.payload);
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

async function deleteTokenApi(payload) {
	console.log(payload);
	return await axios.delete(`/open/api/v1/users/${payload.userUid}`, {
		headers: {
			Authorization: `Bearer ${payload.token}`,
			'Content-Type': 'application/json',
		},
		baseURL:
			'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
	});
}
function* deleteUserAccount(action) {
	try {
		const res = yield call(deleteTokenApi, action.payload);
		console.log(res);
		yield put({type: DELETE_USER_ACCOUNT_SUCCESS});
		yield put({type: REVOKE_USER_TICKET_SUCCESS});
	} catch (err) {
		console.log(err);
		yield put({type: DELETE_USER_ACCOUNT_FAILURE, payload: err});
	}
}

function findUserByIdApi(payload) {
	console.log(payload);
	return axios.get(`/open/api/v1/users/id/${payload.id}@netand.co.kr`, {
		headers: {
			Authorization: `Bearer ${payload.access_token}`,
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
