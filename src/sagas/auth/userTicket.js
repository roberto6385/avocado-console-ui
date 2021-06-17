import {all, fork, put, call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
	GET_USER_TICKET_REQUEST,
	GET_USER_TICKET_FAILURE,
	GET_USER_TICKET_SUCCESS,
} from '../../reducers/auth/userTicket';

const querystring = require('query-string');

function getUserTicketApi(params) {
	return axios.post(
		// 'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200/oauth2/v1/token',
		'/oauth2/v1/token',
		querystring.stringify({
			grant_type: 'password',
			// username: params.username,
			username: params.username, // client username 은 web이고 query parameter는 user 라서 직접입력함.
			password: params.password,
		}),
		{
			headers: {
				Authorization: params.Authorization,
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: 'application/json',
			},
		},
	);
}

function* getUserTicket(action) {
	console.log(action);
	try {
		const res = yield call(getUserTicketApi, action.params);
		console.log(res);
		yield put({
			type: GET_USER_TICKET_SUCCESS,
			payload: {
				data: res.data,
				//나중에 일반 로그인 유저 정보도 생기면 여기서 넣어주면 됨 지금은 user_id 뿐
				user: {
					id: 'user',
					email: res.data.user_id,
					name: '유저',
				},
			},
		});
	} catch (err) {
		yield put({type: GET_USER_TICKET_FAILURE, data: err});
	}
}

function* watchGetUserTicket() {
	yield takeLatest(GET_USER_TICKET_REQUEST, getUserTicket);
}

export default function* userTicketSaga() {
	yield all([fork(watchGetUserTicket)]);
}
