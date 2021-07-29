import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {
	CREATE_USER_FAILURE,
	CREATE_USER_REQUEST,
	CREATE_USER_SUCCESS,
} from '../../reducers/auth/create';
import axios from 'axios';
import base64 from 'base-64';
const querystring = require('query-string');

async function createUserApi(params) {
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

function createTokenApi() {
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

function* createUser(action) {
	try {
		const res = yield call(createTokenApi, action.params);
		console.log(res);
		console.log(action.params);
		const user = yield call(createUserApi, {
			...action.params,
			token: res.data.access_token,
		});

		console.log(user);
		console.log('회원가입이 완료되었습니다.');
		yield put({
			type: CREATE_USER_SUCCESS,
			payload: user,
		});
	} catch (err) {
		console.log(err);
		yield put({type: CREATE_USER_FAILURE, data: err});
	}
}

function* watchCreateUser() {
	yield takeLatest(CREATE_USER_REQUEST, createUser);
}

export default function* createUserSaga() {
	yield all([fork(watchCreateUser)]);
}
