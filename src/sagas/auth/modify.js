import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {
	PUT_MODIFY_FAILURE,
	PUT_MODIFY_REQUEST,
} from '../../reducers/auth/modify';
import axios from 'axios';
const querystring = require('query-string');

async function putModifyApi(params) {
	console.log(params);
	return await axios.get(
		`/open/api/v1/users/id/${params.id}@netand.co.kr`,
		// querystring.stringify({
		// 	// name: params.name,
		// 	// password: params.password,
		// }),
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
function* putModify(action) {
	try {
		const res = yield call(putModifyApi, action.params);
		console.log(res);
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
