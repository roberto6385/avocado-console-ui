import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {userAction} from '../../reducers/auth/user';

import {REVOKE_USER_TICKET_SUCCESS} from '../../reducers/auth/userTicket';
import {getClientTicketApi} from './userTicket';
import {config} from '../../api/config';

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
			baseURL: config.api,
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
		yield put(userAction.createSuccess(user));
	} catch (err) {
		console.log(err);
		yield put(userAction.createFailure(err));
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
			baseURL: config.api,
		},
	);
}

function* modifyUserAccount(action) {
	try {
		const res = yield call(modifyUserAccountApi, action.payload);
		console.log(res);
		yield put(userAction.modifySuccess(res.data));
	} catch (err) {
		console.log(err);
		yield put(userAction.modifyFailure(err));
	}
}

async function deleteTokenApi(payload) {
	console.log(payload);
	return await axios.delete(`/open/api/v1/users/${payload.userUid}`, {
		headers: {
			Authorization: `Bearer ${payload.token}`,
			'Content-Type': 'application/json',
		},
		baseURL: config.api,
	});
}
function* deleteUserAccount(action) {
	try {
		const res = yield call(deleteTokenApi, action.payload);
		console.log(res);
		yield put(userAction.deleteSuccess(res.data));
		yield put({type: REVOKE_USER_TICKET_SUCCESS});
	} catch (err) {
		console.log(err);
		yield put(userAction.deleteFailure(err));
	}
}

function findUserByIdApi(payload) {
	console.log(payload);
	return axios.get(`/open/api/v1/users/id/${payload.id}@netand.co.kr`, {
		headers: {
			Authorization: `Bearer ${payload.access_token}`,
			'Content-Type': 'application/json',
		},
		baseURL: config.api,
	});
}

function* findUserById(action) {
	console.log(action);
	try {
		const res = yield call(findUserByIdApi, action.payload);
		console.log(res);
		yield put(userAction.findByIdSuccess(res.data));
	} catch (err) {
		yield put(userAction.findByIdFailure(err));
	}
}

function* watchCreateUserAccount() {
	yield takeLatest(userAction.createRequest, createUserAccount);
}

function* watchModifyUserAccount() {
	yield takeLatest(userAction.modifyRequest, modifyUserAccount);
}

function* watchDeleteUserAccount() {
	yield takeLatest(userAction.deleteRequest, deleteUserAccount);
}

function* watchFindUserById() {
	yield takeLatest(userAction.findByIdRequest, findUserById);
}

export default function* userSaga() {
	yield all([
		fork(watchCreateUserAccount),
		fork(watchModifyUserAccount),
		fork(watchDeleteUserAccount),
		fork(watchFindUserById),
	]);
}
