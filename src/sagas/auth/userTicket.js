import {all, fork, put, call, takeLatest, delay} from 'redux-saga/effects';
import axios from 'axios';
import {
	GET_USER_TICKET_REQUEST,
	GET_USER_TICKET_FAILURE,
	GET_USER_TICKET_SUCCESS,
	REFRESH_USER_TICKET_REQUEST,
	REFRESH_USER_TICKET_SUCCESS,
	REFRESH_USER_TICKET_FAILURE,
} from '../../reducers/auth/userTicket';

const querystring = require('query-string');

async function getUserTicketApi(params) {
	return await axios.post(
		'/oauth2/v1/token',

		querystring.stringify({
			grant_type: 'password',
			username: params.username, // client username 은 web이고 query parameter는 user 라서 직접입력함.
			password: params.password,
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
async function getUserInfoApi(params) {
	console.log(params);
	return await axios.get(
		`/open/api/v1/users/id/${params.user_id}@netand.co.kr`,
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
function* getUserTicket(action) {
	console.log(action);
	try {
		const res = yield call(getUserTicketApi, action.params);
		console.log(res);
		const user = yield call(getUserInfoApi, res.data);
		console.log(user);

		yield put({
			type: GET_USER_TICKET_SUCCESS,
			payload: {
				data: res.data,
				user: {
					id: user.data.id,
					email: user.data.email,
					name: user.data.name,
					uid: user.data.userUid,
				},
			},
		});
	} catch (err) {
		yield put({type: GET_USER_TICKET_FAILURE, data: err});
	}
}

function* refreshUserTicket(action) {
	try {
		const res = yield call(refreshUserTicketApi, action.params);
		console.log(res);

		yield put({type: REFRESH_USER_TICKET_SUCCESS, data: res.data});
	} catch (err) {
		yield put({type: REFRESH_USER_TICKET_FAILURE, data: err.response.data});
	}
}

function* watchGetUserTicket() {
	yield takeLatest(GET_USER_TICKET_REQUEST, getUserTicket);
}

function* watchRefreshUserTicket() {
	yield takeLatest(REFRESH_USER_TICKET_REQUEST, refreshUserTicket);
}

export default function* userTicketSaga() {
	yield all([fork(watchGetUserTicket), fork(watchRefreshUserTicket)]);
}
