import {all, fork, put, call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
	FIND_FAILURE,
	FIND_REQUEST,
	FIND_SUCCESS,
} from '../../reducers/auth/find';

function findTokenApi(params) {
	return axios.get(
		`/oauth2/v1/token?offset=${params.offset}&limit=${params.limit}`,
		{
			data: null,
			headers: {
				Authorization: params.Authorization,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			baseURL:
				'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
		},
	);
}

function* findToken(action) {
	try {
		const res = yield call(findTokenApi, action.params);
		yield put({type: FIND_SUCCESS, data: res.data});
	} catch (err) {
		yield put({type: FIND_FAILURE, data: err.response.data});
	}
}

function* watchFind() {
	yield takeLatest(FIND_REQUEST, findToken);
}

export default function* findSaga() {
	yield all([fork(watchFind)]);
}
