import produce from 'immer';

// action types

// 연결
export const CONNECTION_REQUEST = 'sftp/CONNECTION_REQUEST';
export const CONNECTION_SUCCESS = 'sftp/CONNECTION_SUCCESS';
export const CONNECTION_FAILURE = 'sftp/CONNECTION_FAILURE';

// 해제
export const DISCONNECTION_REQUEST = 'sftp/DISCONNECTION_REQUEST';
export const DISCONNECTION_SUCCESS = 'sftp/DISCONNECTION_SUCCESS';
export const DISCONNECTION_FAILURE = 'sftp/DISCONNECTION_FAILURE';

// pwd
export const PWD_REQUEST = 'sftp/PWD_REQUEST';
export const PWD_SUCCESS = 'sftp/PWD_SUCCESS';
export const PWD_FAILURE = 'sftp/PWD_FAILURE';
// ls
export const LS_REQUEST = 'sftp/LS_REQUEST';
export const LS_SUCCESS = 'sftp/LS_SUCCESS';
export const LS_FAILURE = 'sftp/LS_FAILURE';
// cd
export const CD_REQUEST = 'sftp/CD_REQUEST';
export const CD_SUCCESS = 'sftp/CD_SUCCESS';
export const CD_FAILURE = 'sftp/CD_FAILURE';

// 에러
export const ERROR = 'sftp/ERROR';

//etc
export const CHANGE_MODE = 'sftp/CHANGE_MODE';

// actions

export const connectionAction = (payload) => ({
	type: CONNECTION_REQUEST,
	payload, // 웹 소켓 연결을 위한 정보
});

export const disconnectAction = (payload) => ({
	type: DISCONNECTION_REQUEST,
	payload,
});

export const commandPwdAction = (payload) => ({
	type: PWD_REQUEST,
	payload,
});

export const commandLsAction = (payload) => ({
	type: LS_REQUEST,
	payload,
});

export const commandCdAction = (payload) => ({
	type: CD_REQUEST,
	payload,
});

export const errorAction = (payload) => ({
	type: ERROR,
	payload,
});

// initial State
const initialState = {
	server: [],
	loading: false,
};

const sftp = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			// 연결
			case CONNECTION_REQUEST:
				draft.loading = true;
				draft.status = 'connected';
				break;

			case CONNECTION_SUCCESS:
				draft.loading = false;
				draft.server.push({
					socket: action.payload.socket,
					channel: action.payload.channel,
					status: 'none',
					responseStatus: action.payload.responseStatus,
					errorMessage: '',
					uuid: action.payload.uuid,
					path: '',
					newPath: '',
					result: '',
					cmdstatus: '',
					progress: 0,
					getPath: '',
					getFileName: '',
					getReceiveSum: 0,
					mode: 'list',
					pathList: [],
					fileList: [],
				});
				break;
			case CONNECTION_FAILURE:
				draft.loading = false;
				break;

			// 해제

			case DISCONNECTION_REQUEST:
				draft.loading = true;
				break;
			case DISCONNECTION_SUCCESS:
				draft.loading = false;
				// eslint-disable-next-line no-case-declarations
				const nextServer = [...draft.server];
				console.log(nextServer === draft.server);
				draft.server = nextServer.filter(
					(it) => it.uuid !== action.payload.uuid,
				);
				console.log(draft.server);
				break;
			case DISCONNECTION_FAILURE:
				draft.loading = false;
				break;

			// 현재 경로 조회
			case PWD_REQUEST:
				draft.loading = true;
				break;
			case PWD_SUCCESS:
				draft.loading = false;
				draft.server.find(
					(it) => it.uuid === action.payload.uuid,
				).path = action.payload.path;
				draft.server.find(
					(it) => it.uuid === action.payload.uuid,
				).pathList = action.payload.pathList;

				break;
			case PWD_FAILURE:
				draft.loading = false;
				break;

			// 현재 경로 조회
			case LS_REQUEST:
				draft.loading = true;
				break;
			case LS_SUCCESS:
				draft.loading = false;
				// 궅이 필요하지는 않음.
				draft.server.find(
					(it) => it.uuid === action.payload.uuid,
				).result = action.payload.result;
				draft.server
					.find((it) => it.uuid === action.payload.uuid)
					.fileList.push(action.payload.fileList);
				break;
			case LS_FAILURE:
				draft.loading = false;
				break;

			// 경로 변경
			case CD_REQUEST:
				draft.loading = true;
				break;
			case CD_SUCCESS:
				draft.loading = false;
				draft.server.find(
					(it) => it.uuid === action.payload.uuid,
				).fileList = [];
				break;
			case CD_FAILURE:
				draft.loading = false;
				break;

			// 모드변경
			case CHANGE_MODE:
				draft.server.find(
					(it) => it.uuid === action.payload.uuid,
				).mode = action.payload.mode;
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
