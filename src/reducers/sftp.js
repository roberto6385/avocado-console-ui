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
// rename
export const RENAME_REQUEST = 'sftp/RENAME_REQUEST';
export const RENAME_SUCCESS = 'sftp/RENAME_SUCCESS';
export const RENAME_FAILURE = 'sftp/RENAME_FAILURE';
// rm & rmdir
export const RM_REQUEST = 'sftp/RM_REQUEST';
export const RM_SUCCESS = 'sftp/RM_SUCCESS';
export const RM_FAILURE = 'sftp/RM_FAILURE';

// put
export const PUT_REQUEST = 'sftp/PUT_REQUEST';
export const PUT_SUCCESS = 'sftp/PUT_SUCCESS';
export const PUT_FAILURE = 'sftp/PUT_FAILURE';

// 에러
export const ERROR = 'sftp/ERROR';

//etc
export const CHANGE_MODE = 'sftp/CHANGE_MODE';
export const ADD_HIGHLIGHT = 'sftp/ADD_HIGHLIGHT';

export const ADD_ONE_HIGHLIGHT = 'sftp/ADD_ONE_HIGHLIGHT';
export const INITIALIZING_HIGHLIGHT = 'sftp/INITIALIZING_HIGHLIGHT';
export const REMOVE_HIGHLIGHT = 'sftp/REMOVE_HIGHLIGHT';

export const ADD_HISTORY = 'sftp/ADD_HISTORY';
export const REMOVE_HISTORY = 'sftp/REMOVE_HISTORY';

// actions

export const connectionAction = (payload) => ({
	type: CONNECTION_REQUEST,
	payload, // 웹 소켓 연결을 위한 정보
});

export const commandPutAction = (payload) => ({
	type: PUT_REQUEST,
	payload, // 웹 소켓 연결을 위한 정보
});

export const disconnectAction = (payload) => ({
	type: DISCONNECTION_REQUEST,
	payload,
});

export const commandRemoveAction = (payload) => ({
	type: RM_REQUEST,
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
export const commandRenameAction = (payload) => ({
	type: RENAME_REQUEST,
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

// etc function
const ObjFinder = (target, uuid) => {
	return target.find((it) => it.uuid === uuid);
};

const sftp = (state = initialState, action) =>
	produce(state, (draft) => {
		// 직접 변형 가능
		const target = ObjFinder(draft.server, action.payload?.uuid);
		// 직접 변경 불가능
		const plainTarget = ObjFinder(state.server, action.payload?.uuid);
		// target === plainTarget => false

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
					highlight: [],
					history: [],
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
				draft.server = state.server.filter(
					(it) => it.uuid !== action.payload.uuid,
				);
				break;
			case DISCONNECTION_FAILURE:
				draft.loading = false;
				break;

			// 현재 경로 조회
			case PWD_REQUEST:
				draft.loading = true;
				target.fileList = [];
				target.highlight = [];
				target.pathList = [];

				break;
			case PWD_SUCCESS:
				draft.loading = false;
				target.path = action.payload.path;
				target.pathList = action.payload.pathList;

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
				target.result = action.payload.result;
				target.fileList.push(action.payload.fileList);
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

				break;
			case CD_FAILURE:
				draft.loading = false;
				break;

			// 모드변경
			case CHANGE_MODE:
				target.mode = action.payload.mode;
				target.highlight = [];
				break;

			// 하이라이팅
			case ADD_HIGHLIGHT:
				target.mode === 'list'
					? target.highlight.push(action.payload.item)
					: target.highlight.push({
							item: action.payload.item,
							path: action.payload.path,
					  });
				break;
			case INITIALIZING_HIGHLIGHT:

				target.highlight = [];
				break;
			case ADD_ONE_HIGHLIGHT:
				target.highlight.splice(
					0,
					Number.MAX_VALUE,
					target.mode === 'list'
						? action.payload.item
						: {
								item: action.payload.item,
								path: action.payload.path,
						  },
				);
				break;
			case REMOVE_HIGHLIGHT:
				target.mode === 'list'
					? (target.highlight = plainTarget.highlight.filter(
							(item) => item !== action.payload.item,
					  ))
					: (target.highlight = plainTarget.highlight.filter(
							(it) =>
								it.item !== action.payload.item &&
								it.path !== action.payload.path,
					  ));
				break;

			case ADD_HISTORY:
				target.history.unshift(action.payload);
				break;
			case REMOVE_HISTORY:
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
