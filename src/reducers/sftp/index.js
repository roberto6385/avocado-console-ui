import produce from 'immer';

// action types

// 웹소켓 send Message

// 연결
export const CONNECTION_REQUEST = 'sftp/CONNECTION_REQUEST';
export const CONNECTION_SUCCESS = 'sftp/CONNECTION_SUCCESS';
export const CONNECTION_FAILURE = 'sftp/CONNECTION_FAILURE';

// 해제
export const DISCONNECTION_REQUEST = 'sftp/DISCONNECTION_REQUEST';
export const DISCONNECTION_SUCCESS = 'sftp/DISCONNECTION_SUCCESS';
export const DISCONNECTION_FAILURE = 'sftp/DISCONNECTION_FAILURE';

// 에러
export const ERROR = 'sftp/ERROR';

// actions

export const connectionAction = (payload) => ({
	type: CONNECTION_REQUEST,
	payload, // 웹 소켓 연결을 위한 정보
});

export const disconnectAction = (payload) => ({
	type: DISCONNECTION_REQUEST,
	payload,
});

export const errorAction = (payload) => ({
	type: ERROR,
	payload,
});

// initial State
const initialState = {
	ws: null,
	// token:'',
	status: 'none',
	responseStatus: '',
	errorMessage: '',
	uuid: '',
	path: '',
	newPath: '',
	result: '',
	cmdstatus: '',
	progress: 0,
	getPath: '',
	getFileName: '',
	getReceiveSum: 0,
};

const sftp = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			// 연결
			case CONNECTION_REQUEST:
				draft.status = 'connected';
				break;

			case CONNECTION_SUCCESS:
				draft.uuid = action.payload;
				// 웹소켓 정보는 common tab에 넣어준다
				break;

			// 해제
			case DISCONNECTION_SUCCESS:
				draft.uuid = '';
				draft.result = '';
				draft.cmdstatus = '';
				break;

			//에러
			case ERROR:
				draft.errorMessage = action.payload;
				break;

			default:
				return state;
		}
	});

export default sftp;
