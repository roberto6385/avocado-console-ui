import {all, fork, put, call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
	GET_VERIFY_FAILURE,
	GET_VERIFY_REQUEST,
	GET_VERIFY_SUCCESS,
} from '../../reducers/auth/verify';

function getVerifyApi(params) {
	return axios.post(
		'/oauth2/v1/verify/',
		{},
		{
			headers: {
				Authorization: params.Authorization,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
	);
}

function* getVerify(action) {
	try {
		const res = yield call(getVerifyApi, action.params);
		yield put({type: GET_VERIFY_SUCCESS, data: res.data});
	} catch (err) {
		yield put({type: GET_VERIFY_FAILURE, data: err.response.data});
	}
}

function* watchGetVerify() {
	yield takeLatest(GET_VERIFY_REQUEST, getVerify);
}

export default function* verifySaga() {
	yield all([fork(watchGetVerify)]);
}