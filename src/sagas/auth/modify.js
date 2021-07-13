import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {
	PUT_MODIFY_FAILURE,
	PUT_MODIFY_REQUEST,
} from '../../reducers/auth/modify';
import axios from 'axios';
import {GET_USER_TICKET_SUCCESS} from '../../reducers/auth/userTicket';

async function putModifyApi(params) {
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

// userTicket은 user_id로 조회 modify는 userUid로 조회
function getUserInfoApi(params) {
	console.log(params);
	return axios.get(`/open/api/v1/users/${params.userUid}`, {
		headers: {
			Authorization: `Bearer ${params.access_token}`,
			'Content-Type': 'application/json',
		},
		baseURL:
			'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
	});
}

function* putModify(action) {
	try {
		const res = yield call(putModifyApi, action.params);
		console.log(res);
		const user = yield call(getUserInfoApi, action.params);
		yield put({
			type: GET_USER_TICKET_SUCCESS,
			payload: {
				data: res.data,
				user: {
					id: user.data.id,
					email: user.data.email,
					name: user.data.name,
					userUid: user.data.userUid,
				},
			},
		});
	} catch (err) {
		console.log(err);
		yield put({type: PUT_MODIFY_FAILURE, data: err});
	}
}

function* watchPutModify() {
	yield takeLatest(PUT_MODIFY_REQUEST, putModify);
}

export default function* putModifySaga() {
	yield all([fork(watchPutModify)]);
}
