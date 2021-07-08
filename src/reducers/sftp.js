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

// cd
export const CD_REQUEST = 'sftp/CD_REQUEST';
export const CD_SUCCESS = 'sftp/CD_SUCCESS';
export const CD_FAILURE = 'sftp/CD_FAILURE';
// rename
export const RENAME_REQUEST = 'sftp/RENAME_REQUEST';
export const RENAME_SUCCESS = 'sftp/RENAME_SUCCESS';
export const RENAME_FAILURE = 'sftp/RENAME_FAILURE';

// rm
export const RM_REQUEST = 'sftp/RM_REQUEST';
export const RM_SUCCESS = 'sftp/RM_SUCCESS';
export const RM_FAILURE = 'sftp/RM_FAILURE';

// mkdir
export const MKDIR_REQUEST = 'sftp/MKDIR_REQUEST';
export const MKDIR_SUCCESS = 'sftp/MKDIR_SUCCESS';
export const MKDIR_FAILURE = 'sftp/MKDIR_FAILURE';

// put
export const PUT_SUCCESS = 'sftp/PUT_SUCCESS';
// get
export const GET_SUCCESS = 'sftp/GET_SUCCESS';

// write
export const WRITE_REQUEST = 'sftp/WRITE_REQUEST';
export const WRITE_SUCCESS = 'sftp/WRITE_SUCCESS';
export const WRITE_FAILURE = 'sftp/WRITE_FAILURE';

// read
export const READ_REQUEST = 'sftp/READ_REQUEST';
export const READ_SUCCESS = 'sftp/READ_SUCCESS';
export const READ_FAILURE = 'sftp/READ_FAILURE';

// edit
export const EDIT_READ_SUCCESS = 'sftp/EDIT_READ_SUCCESS';
export const EDIT_WRITE_SUCCESS = 'sftp/EDIT_WRITE_SUCCESS';

// pwd
export const PWD_REQUEST = 'sftp/PWD_REQUEST';
export const PWD_SUCCESS = 'sftp/PWD_SUCCESS';
export const PWD_FAILURE = 'sftp/PWD_FAILURE';
// ls
export const LS_REQUEST = 'sftp/LS_REQUEST';
export const LS_SUCCESS = 'sftp/LS_SUCCESS';
export const LS_FAILURE = 'sftp/LS_FAILURE';
// etc
export const INIT_FILELIST = 'sftp/INIT_FILELIST';
export const READY_STATE = 'sftp/READY_STATE';

// 에러
export const ERROR = 'sftp/ERROR';

//etc

export const CREATE_NEW_WEBSOCKET_REQUEST = 'sftp/CREATE_NEW_WEBSOCKET_REQUEST';
export const CREATE_NEW_WEBSOCKET_SUCCESS = 'sftp/CREATE_NEW_WEBSOCKET_SUCCESS';
export const CREATE_NEW_WEBSOCKET_FAILURE = 'sftp/CREATE_NEW_WEBSOCKET_FAILURE';
export const REMOVE_NEW_WEBSOCKET_REQUEST = 'sftp/REMOVE_NEW_WEBSOCKET_REQUEST';
export const REMOVE_NEW_WEBSOCKET_SUCCESS = 'sftp/REMOVE_NEW_WEBSOCKET_SUCCESS';
export const REMOVE_NEW_WEBSOCKET_FAILURE = 'sftp/REMOVE_NEW_WEBSOCKET_FAILURE';
export const DELETE_WORK_LIST = 'sftp/DELETE_WORK_LIST';
export const SHIFT_INCINERATOR_LIST = 'sftp/SHIFT_INCINERATOR_LIST';
export const PUSH_READ_LIST = 'sftp/PUSH_READ_LIST';
export const SHIFT_READ_LIST = 'sftp/SHIFT_READ_LIST';
export const PUSH_WRITE_LIST = 'sftp/PUSH_WRITE_LIST';
export const SHIFT_SOCKETS = 'sftp/SHIFT_SOCKETS';
export const SHIFT_WRITE_LIST = 'sftp/SHIFT_WRITE_LIST';
export const DELETE_WORK_TRANSPORTER = 'sftp/DELETE_WORK_TRANSPORTER';
export const INIT_DELETE_WORK_LIST = 'sftp/INIT_DELETE_WORK_LIST';
export const LS_REQUEST_DELETE = 'sftp/LS_REQUEST_DELETE';
export const LS_SUCCESS_DELETE = 'sftp/LS_SUCCESS_DELETE';
export const LS_FAILURE_DELETE = 'sftp/LS_FAILURE_DELETE';

export const ADD_HISTORY = 'history/ADD_HISTORY';
export const FIND_HISTORY = 'history/FIND_HISTORY';
export const REMOVE_HISTORY = 'history/REMOVE_HISTORY';
export const ADD_HISTORY_HI = 'history/ADD_HISTORY_HI';
export const INITIAL_HISTORY_HI = 'history/INITIAL_HISTORY_HI';
export let HISTORY_ID = 0;

export const CHANGE_MODE = 'sftp/CHANGE_MODE';

export const SAVE_TEXT = 'sftp/SAVE_TEXT';
export const SAVE_FILE_FOR_EDIT = 'sftp/SAVE_FILE_FOR_EDIT';
export const SAVE_EDITTEXT = 'sftp/SAVE_EDITTEXT';
export const CLOSE_EDITOR = 'sftp/CLOSE_EDITOR';

export const ADD_HIGHLIGHT = 'sftp/ADD_HIGHLIGHT';
export const ADD_ONE_HIGHLIGHT = 'sftp/ADD_ONE_HIGHLIGHT';
export const INITIALIZING_HIGHLIGHT = 'sftp/INITIALIZING_HIGHLIGHT';
export const REMOVE_HIGHLIGHT = 'sftp/REMOVE_HIGHLIGHT';
export const CHANGE_SORT_KEYWORD = 'sftp/CHANGE_SORT_KEYWORD';

export const TEMP_HIGHLIGHT = 'sftp/TEMP_HIGHLIGHT';
export const REMOVE_TEMP_HIGHLIGHT = 'sftp/REMOVE_TEMP_HIGHLIGHT';

// actions

export const connectionAction = (payload) => ({
	type: CONNECTION_REQUEST,
	payload, // 웹 소켓 연결을 위한 정보
});

export const commandPwdAction = (payload) => ({
	type: PWD_REQUEST,
	payload,
});
export const commandLsAction = (payload) => ({
	type: LS_REQUEST,
	payload,
});

export const commandWriteAction = (payload) => ({
	type: WRITE_REQUEST,
	payload, // 웹 소켓 연결을 위한 정보
});

export const commandReadAction = (payload) => ({
	type: READ_REQUEST,
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

export const commandMkdirAction = (payload) => ({
	type: MKDIR_REQUEST,
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

export const createNewWebsocket = (payload) => ({
	type: CREATE_NEW_WEBSOCKET_REQUEST,
	payload,
});
export const searchDeleteListAction = (payload) => ({
	type: LS_REQUEST_DELETE,
	payload,
});
export const removeNewWebsocket = (payload) => ({
	type: REMOVE_NEW_WEBSOCKET_REQUEST,
	payload,
});

// initial State
const initialState = {
	sftp: [],
	loading: false,
	// uuid 공통
	socket: [],
	path: [],
	upload: [],
	download: [],
	delete: [],
	file: [],
	history: [],
	edit: [],
	etc: [],
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

		// new list
		const socket_target = ObjFinder(draft.socket, action.payload?.uuid);
		const path_target = ObjFinder(draft.path, action.payload?.uuid);
		const file_target = ObjFinder(draft.file, action.payload?.uuid);
		const history_target = ObjFinder(draft.history, action.payload?.uuid);
		const etc_target = ObjFinder(draft.etc, action.payload?.uuid);
		const edit_target = ObjFinder(draft.edit, action.payload?.uuid);

		const file_plain = ObjFinder(state.file, action.payload?.uuid);
		const history_plain = ObjFinder(state.history, action.payload?.uuid);

		switch (action.type) {
			// 연결
			case CONNECTION_REQUEST:
				draft.loading = true;
				break;

			case CONNECTION_SUCCESS:
				draft.loading = false;

				draft.socket.push({
					uuid: action.payload.uuid,
					socket: action.payload.socket,
					status: 'connect success',
					ready: 1,
				});
				draft.path.push({
					uuid: action.payload.uuid,
					path: '',
					pathList: [],
				});
				draft.file.push({
					uuid: action.payload.uuid,
					fileList: [],
					highlight: [],
				});
				draft.history.push({
					uuid: action.payload.uuid,
					history: [],
					history_highlight: [],
				});
				draft.upload.push({
					uuid: action.payload.uuid,
					writeSockets: [], // 경로, file 저장
					writeList: [], // 경로, file 저장
				});
				draft.download.push({
					uuid: action.payload.uuid,
					readSockets: [], // 경로, file 저장
					readList: [], // 경로, file 저장
				});
				draft.delete.push({
					uuid: action.payload.uuid,
					removeSockets: [],
					removeList: [],
					incinerator: [],
				});
				draft.edit.push({
					uuid: action.payload.uuid,
					text: '',
					editText: '',
					editFile: {},
				});
				draft.etc.push({
					uuid: action.payload.uuid,
					sortKeyword: 'name',
					toggle: true,
					mode: 'list',
					prevMode: '',
				});

				// -------------- //

				draft.sftp.push({
					tempPath: '',
					tempItem: null,

					socket: action.payload.socket, //V
					status: 'none', //V
					uuid: action.payload.uuid, //V
					path: '', // 현재 경로 ok//V
					pathList: [], //V
					socketStatus: 1, //V
					mode: 'list', // ok //V
					prevMode: '', // ok //V
					history: [], //V
					history_highlight: [], //V
					readSockets: [], // 경로, file 저장 //V
					writeSockets: [], // 경로, file 저장 //V
					removeSockets: [], //V
					readList: [], // 경로, file 저장 //V
					writeList: [], // 경로, file 저장 //V
					removeList: [], //V
					incinerator: [], //V
					text: '', //V
					editText: '', //V
					editFile: {}, //V
					sortKeyword: 'name', //V
					toggle: true, //V
				});
				break;
			case CONNECTION_FAILURE:
				draft.loading = false;
				break;

			// 해제

			case DISCONNECTION_REQUEST:
				// draft.loading = true;
				break;
			case DISCONNECTION_SUCCESS:
				// draft.loading = false;
				draft.socket = state.socket.filter(
					(it) => it.uuid !== action.payload.uuid,
				);
				break;
			case DISCONNECTION_FAILURE:
				// draft.loading = false;
				break;

			// 경로 변경
			case CD_REQUEST:
				// draft.loading = true;

				break;
			case CD_SUCCESS:
				// draft.loading = false;
				file_target.highlight = [];

				break;
			case CD_FAILURE:
				// draft.loading = false;
				break;

			// 모드변경
			case CHANGE_MODE:
				etc_target.mode = action.payload.mode;
				etc_target.prevMode = action.payload.currentMode;
				file_target.highlight = [];
				break;

			// 텍스트 저장
			case SAVE_TEXT:
				edit_target.text = action.payload.text;
				break;

			case SAVE_FILE_FOR_EDIT:
				edit_target.editFile = action.payload.editFile;
				break;

			// 텍스트 저장
			case SAVE_EDITTEXT:
				edit_target.editText = action.payload.editText;
				break;

			case CLOSE_EDITOR:
				edit_target.text = '';
				edit_target.editText = '';
				edit_target.editFile = {};
				break;
			// 정렬 키워드 변경
			case CHANGE_SORT_KEYWORD:
				etc_target.sortKeyword = action.payload.keyword;
				etc_target.toggle = !target.toggle;
				break;
			// 하이라이팅
			case ADD_HIGHLIGHT:
				file_target.highlight.push(action.payload.item);
				break;

			case TEMP_HIGHLIGHT: //O
				target.tempItem = {
					item: action.payload.item,
					path: action.payload.path,
				};
				break;
			case REMOVE_TEMP_HIGHLIGHT: //O
				target.tempItem = null;
				break;

			case INITIALIZING_HIGHLIGHT:
				file_target.highlight = [];
				break;

			case ADD_ONE_HIGHLIGHT:
				file_target.highlight?.splice(
					0,
					Number.MAX_VALUE,
					action.payload.item,
				);
				break;
			case REMOVE_HIGHLIGHT:
				file_target.highlight = file_plain.highlight.filter(
					(v) =>
						JSON.stringify(v) !==
						JSON.stringify(action.payload.item),
				);
				break;

			//--//

			case READY_STATE:
				socket_target.ready = 3;
				break;

			// 현재 경로 조회
			case PWD_REQUEST:
				// draft.loading = true;

				break;
			case PWD_SUCCESS: //V
				// draft.loading = false;
				path_target.path = action.payload.path;
				path_target.pathList = action.payload.pathList;
				if (action.payload.removeIndex) {
					for (let i = 0; i < action.payload.removeIndex; i++) {
						file_target.fileList.pop();
					}
				}

				break;
			case PWD_FAILURE: //V
				// draft.loading = false;
				break;

			// 현재 경로 조회
			case LS_REQUEST: //V
				break;
			case LS_SUCCESS: //V
				file_target.fileList.push(action.payload.fileList);
				break;
			case LS_FAILURE: //V
				// draft.loading = false;
				break;

			case INIT_FILELIST: //V
				file_target.fileList = [];
				break;

			//--//

			case ADD_HISTORY:
				history_target.history.unshift({...action.payload, HISTORY_ID});
				HISTORY_ID++;
				break;

			case FIND_HISTORY:
				// eslint-disable-next-line no-case-declarations
				const index = history_target.history.findIndex(
					(h) =>
						h.name === action.payload.name &&
						h.todo === action.payload.todo,
				);
				if (index !== -1) {
					history_target.history[index].progress =
						action.payload.progress;
				}
				break;
			case REMOVE_HISTORY:
				history_target.history = history_plain.history.filter(
					(it) => it !== action.payload.history,
				);
				break;

			case ADD_HISTORY_HI:
				history_target.history_highlight = action.payload.history;
				break;

			case INITIAL_HISTORY_HI:
				history_target.history_highlight = [];
				break;

			// -- // 여기부턴 나중에!!
			case CREATE_NEW_WEBSOCKET_SUCCESS:
				action.payload.todo === 'write' &&
					target.writeSockets.push(action.payload.socket);
				action.payload.todo === 'read' &&
					target.readSockets.push(action.payload.socket);
				action.payload.todo === 'remove' &&
					target.removeSockets.push(action.payload.socket);
				break;

			case SHIFT_SOCKETS:
				action.payload.todo === 'write' && target.writeSockets.shift();
				action.payload.todo === 'read' && target.readSockets.shift();
				action.payload.todo === 'remove' &&
					target.removeSockets.shift();
				break;
			// read, write, remove
			case PUSH_READ_LIST:
				target.readList = plainTarget.readList.concat(
					action.payload.array,
				);
				break;
			case SHIFT_READ_LIST:
				target.readList.shift();
				break;

			case PUSH_WRITE_LIST:
				target.writeList = plainTarget.writeList.concat(
					action.payload.array,
				);
				break;
			case SHIFT_WRITE_LIST:
				target.writeList.shift();
				break;

			case SHIFT_INCINERATOR_LIST:
				target.incinerator.shift();
				break;

			case DELETE_WORK_TRANSPORTER:
				target.incinerator = plainTarget.incinerator.concat(
					target.removeList.sort((a, b) => {
						return a.path < b.path ? 1 : a.path > b.path ? -1 : 0;
					}),
				);
				target.removeList = [];
				break;

			case DELETE_WORK_LIST:
				target.removeList = plainTarget.removeList.concat(
					action.payload.array,
				);
				break;
			case INIT_DELETE_WORK_LIST:
				target.removeList = [];
				break;

			default:
				return state;
		}
	});

export default sftp;
