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

// mkdir
export const MKDIR_REQUEST = 'sftp/MKDIR_REQUEST';
export const MKDIR_SUCCESS = 'sftp/MKDIR_SUCCESS';
export const MKDIR_FAILURE = 'sftp/MKDIR_FAILURE';

// put
export const PUT_REQUEST = 'sftp/PUT_REQUEST';
export const PUT_SUCCESS = 'sftp/PUT_SUCCESS';
export const PUT_FAILURE = 'sftp/PUT_FAILURE';

// get
export const GET_REQUEST = 'sftp/GET_REQUEST';
export const GET_SUCCESS = 'sftp/GET_SUCCESS';
export const GET_FAILURE = 'sftp/GET_FAILURE';

// edit
export const EDIT_PUT_SUCCESS = 'sftp/EDIT_PUT_SUCCESS';
export const EDIT_GET_SUCCESS = 'sftp/EDIT_GET_SUCCESS';

// 에러

//etc
export const CHANGE_MODE = 'sftp/CHANGE_MODE';

export const SAVE_TEXT = 'sftp/SAVE_TEXT';
export const SAVE_FILE_FOR_EDIT = 'sftp/SAVE_FILE_FOR_EDIT';
export const SAVE_EDITTEXT = 'sftp/SAVE_EDITTEXT';
export const CLOSE_EDITOR = 'sftp/CLOSE_EDITOR';

export const ADD_HIGHLIGHT = 'sftp/ADD_HIGHLIGHT';
export const ADD_ONE_HIGHLIGHT = 'sftp/ADD_ONE_HIGHLIGHT';
export const INITIALIZING_HIGHLIGHT = 'sftp/INITIALIZING_HIGHLIGHT';
export const REMOVE_HIGHLIGHT = 'sftp/REMOVE_HIGHLIGHT';
export const TEMP_HIGHLIGHT = 'sftp/TEMP_HIGHLIGHT';
export const REMOVE_TEMP_HIGHLIGHT = 'sftp/REMOVE_TEMP_HIGHLIGHT';

export const ADD_HISTORY = 'sftp/ADD_HISTORY';
export const FIND_HISTORY = 'sftp/FIND_HISTORY';
export const REMOVE_HISTORY = 'sftp/REMOVE_HISTORY';

export const ADD_HISTORY_HI = 'sftp/ADD_HISTORY_HI';
export const INITIAL_HISTORY_HI = 'sftp/INITIAL_HISTORY_HI';

export const DELETE_WORK_LIST = 'sftp/DELETE_WORK_LIST';
export const INIT_DELETE_WORK_LIST = 'sftp/INIT_DELETE_WORK_LIST';

export const SAVE_TEMP_PATH = 'sftp/SAVE_TEMP_PATH';

export const CHANGE_SORT_KEYWORD = 'sftp/CHANGE_SORT_KEYWORD';

let HISTORY_ID = 0;

// actions

export const connectionAction = (payload) => ({
	type: CONNECTION_REQUEST,
	payload, // 웹 소켓 연결을 위한 정보
});

export const commandPutAction = (payload) => ({
	type: PUT_REQUEST,
	payload, // 웹 소켓 연결을 위한 정보
});

export const commandGetAction = (payload) => ({
	type: GET_REQUEST,
	payload, // 웹 소켓 연결을 위한 정보
});

export const disconnectAction = (payload) => ({
	type: DISCONNECTION_REQUEST,
	payload,
});

export const commandRmAction = (payload) => ({
	type: RM_REQUEST,
	payload,
});

export const commandPwdAction = (payload) => ({
	type: PWD_REQUEST,
	payload,
});

export const commandMkdirAction = (payload) => ({
	type: MKDIR_REQUEST,
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

// initial State
const initialState = {
	sftp: [],
	loading: false,
};

// etc function
const ObjFinder = (target, uuid) => {
	return target.find((it) => it.uuid === uuid);
};

const sftp = (state = initialState, action) =>
	produce(state, (draft) => {
		// 직접 변형 가능
		const target = ObjFinder(draft.sftp, action.payload?.uuid);
		// 직접 변경 불가능
		const plainTarget = ObjFinder(state.sftp, action.payload?.uuid);
		// target === plainTarget => false

		switch (action.type) {
			// 연결
			case CONNECTION_REQUEST:
				draft.loading = true;
				draft.status = 'connected';
				break;

			case CONNECTION_SUCCESS:
				draft.loading = false;
				draft.sftp.push({
					socket: action.payload.socket,
					status: 'none',
					errorMessage: '',
					uuid: action.payload.uuid,
					path: '',
					newPath: '',
					result: '',
					// cmdstatus: '',
					progress: 0,
					// getPath: '',
					// getFileName: '',
					getReceiveSum: 0,
					mode: 'list',
					prevMode: '',
					pathList: [],
					fileList: [],
					highlight: [],
					history: [],
					history_highlight: [],
					text: '',
					editText: '',
					editFile: {},
					tempPath: '',
					tempItem: null,
					deleteWorks: [],
					sortKeyword: 'name',
					toggle: true,
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
				draft.sftp = state.sftp.filter(
					(it) => it.uuid !== action.payload.uuid,
				);
				break;
			case DISCONNECTION_FAILURE:
				draft.loading = false;
				break;

			// 현재 경로 조회
			case PWD_REQUEST:
				draft.loading = true;
				target.pathList = [];
				target.deleteWorks = [];

				break;
			case PWD_SUCCESS:
				draft.loading = false;
				target.path = action.payload.path;
				target.pathList = action.payload.pathList;
				target.fileList = [];
				// target.highlight = [];

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
				target.highlight = [];

				break;
			case CD_FAILURE:
				draft.loading = false;
				break;

			// 모드변경
			case CHANGE_MODE:
				target.mode = action.payload.mode;
				target.highlight = [];
				target.prevMode = action.payload.currentMode;
				break;

			// 텍스트 저장
			case SAVE_TEXT:
				target.text = action.payload.text;
				break;

			case SAVE_FILE_FOR_EDIT:
				target.editFile = action.payload.editFile;
				break;

			// 텍스트 저장
			case SAVE_EDITTEXT:
				target.editText = action.payload.editText;
				break;

			case CLOSE_EDITOR:
				target.text = '';
				target.editText = '';
				target.editFile = {};
				break;
			// 정렬 키워드 변경
			case CHANGE_SORT_KEYWORD:
				target.sortKeyword = action.payload.keyword;
				target.toggle = !target.toggle;
				break;
			// 하이라이팅
			case ADD_HIGHLIGHT:
				target.highlight.push(action.payload.item);
				break;
			case TEMP_HIGHLIGHT:
				target.tempItem = {
					item: action.payload.item,
					path: action.payload.path,
				};
				break;
			case REMOVE_TEMP_HIGHLIGHT:
				target.tempItem = null;
				break;
			case INITIALIZING_HIGHLIGHT:
				target.highlight = [];
				break;
			case ADD_ONE_HIGHLIGHT:
				target.highlight.splice(
					0,
					Number.MAX_VALUE,
					action.payload.item,
				);
				break;
			case REMOVE_HIGHLIGHT:
				target.highlight = plainTarget.highlight.filter(
					(item) => item !== action.payload.item,
				);
				break;

			case ADD_HISTORY:
				target.history.unshift({...action.payload, HISTORY_ID});
				HISTORY_ID++;
				break;

			case FIND_HISTORY:
				// eslint-disable-next-line no-case-declarations
				const index = target.history.findIndex(
					(h) =>
						h.name === action.payload.name &&
						h.todo === action.payload.todo,
				);
				console.log(index);
				if (index !== -1) {
					target.history[index].progress = action.payload.progress;
				}
				break;

			case REMOVE_HISTORY:
				target.history = plainTarget.history.filter(
					(it) => it !== action.payload.history,
				);
				break;

			case ADD_HISTORY_HI:
				target.history_highlight = action.payload.history;
				break;

			case INITIAL_HISTORY_HI:
				target.history_highlight = [];
				break;

			case DELETE_WORK_LIST:
				target.deleteWorks.unshift({
					list: action.payload.list,
					path: action.payload.path,
				});
				break;
			case INIT_DELETE_WORK_LIST:
				target.deleteWorks = [];
				break;

			case SAVE_TEMP_PATH:
				target.tempPath = action.payload.path;
				break;

			default:
				return state;
		}
	});

export default sftp;
