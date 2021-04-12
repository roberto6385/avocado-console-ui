import {all, fork, put, call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
	GET_ACTIVE_TOKEN_LIST_FAILURE,
	GET_ACTIVE_TOKEN_LIST_REQUEST,
	GET_ACTIVE_TOKEN_LIST_SUCCESS,
} from '../../reducers/auth/find';
const querystring = require('query-string');

function getAccessTokenApi(params) {
	return axios.get(
		`/oauth2/v1/token?offset=${params.offset}&limit=${params.limit}`,
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
	);
}

function* getAccessToken(action) {
	try {
		const res = yield call(getAccessTokenApi, action.params);
		yield put({type: GET_ACTIVE_TOKEN_LIST_SUCCESS, data: res.data});
	} catch (err) {
		yield put({
			type: GET_ACTIVE_TOKEN_LIST_FAILURE,
			data: err.response.data,
		});
	}
}

function* watchGetAccessToken() {
	yield takeLatest(GET_ACTIVE_TOKEN_LIST_REQUEST, getAccessToken);
}

export default function* findSaga() {
	yield all([fork(watchGetAccessToken)]);
}
