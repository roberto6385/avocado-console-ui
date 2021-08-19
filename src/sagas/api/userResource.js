import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {userResourceAction} from '../../reducers/api/userResource';
import {clientAuthApi} from './auth';
import {config} from '../../api/config';

async function createUserApi(payload) {
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

function* createUser(action) {
	try {
		console.log(action.payload);
		const client = yield call(clientAuthApi);
		const user = yield call(createUserApi, {
			...action.payload,
			token: client.data.access_token,
		});
		console.log(user);
		yield put(userResourceAction.createUserSuccess(user));
	} catch (err) {
		console.log(err);
		yield put(userResourceAction.createUserFailure(err));
	}
}

async function modifyUserApi(payload) {
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

function* modifyUser(action) {
	try {
		const res = yield call(modifyUserApi, action.payload);
		console.log(res);
		yield put(userResourceAction.modifyUserSuccess(res.data));
	} catch (err) {
		console.log(err);
		yield put(userResourceAction.modifyUserFailure(err));
	}
}

async function deleteUserApi(payload) {
	console.log(payload);
	return await axios.delete(`/open/api/v1/users/${payload.userUid}`, {
		headers: {
			Authorization: `Bearer ${payload.token}`,
			'Content-Type': 'application/json',
		},
		baseURL: config.api,
	});
}
function* deleteUser(action) {
	try {
		const res = yield call(deleteUserApi, action.payload);
		console.log(res);
		yield put(userResourceAction.deleteUserSuccess(res.data));
		//todo external action => revoke
	} catch (err) {
		console.log(err);
		yield put(userResourceAction.deleteUserFailure(err));
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
		yield put(userResourceAction.findUserByIdSuccess(res.data));
	} catch (err) {
		yield put(userResourceAction.findUserByIdFailure(err));
	}
}

function* watchCreateUser() {
	yield takeLatest(userResourceAction.createUserRequest, createUser);
}

function* watchModifyUser() {
	yield takeLatest(userResourceAction.modifyUserRequest, modifyUser);
}

function* watchDeleteUser() {
	yield takeLatest(userResourceAction.deleteUserRequest, deleteUser);
}

function* watchFindUserById() {
	yield takeLatest(userResourceAction.findUserByIdRequest, findUserById);
}

export default function* userResourceSaga() {
	yield all([
		fork(watchCreateUser),
		fork(watchModifyUser),
		fork(watchDeleteUser),
		fork(watchFindUserById),
	]);
}
