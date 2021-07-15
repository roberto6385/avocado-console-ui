import produce from 'immer';

export const CONNECTION_REQUEST = 'sftp/CONNECTION_REQUEST';
export const CONNECTION_SUCCESS = 'sftp/CONNECTION_SUCCESS';
export const CONNECTION_FAILURE = 'sftp/CONNECTION_FAILURE';

export const RECONNECTION_REQUEST = 'sftp/RECONNECTION_REQUEST';
export const RECONNECTION_SUCCESS = 'sftp/RECONNECTION_SUCCESS';
export const RECONNECTION_FAILURE = 'sftp/RECONNECTION_FAILURE';

export const DISCONNECTION_REQUEST = 'sftp/DISCONNECTION_REQUEST';
export const DISCONNECTION_SUCCESS = 'sftp/DISCONNECTION_SUCCESS';
export const DISCONNECTION_FAILURE = 'sftp/DISCONNECTION_FAILURE';

export const CD_REQUEST = 'sftp/CD_REQUEST';
export const CD_SUCCESS = 'sftp/CD_SUCCESS';
export const CD_FAILURE = 'sftp/CD_FAILURE';

export const RENAME_REQUEST = 'sftp/RENAME_REQUEST';
export const RENAME_SUCCESS = 'sftp/RENAME_SUCCESS';
export const RENAME_FAILURE = 'sftp/RENAME_FAILURE';

export const RM_REQUEST = 'sftp/RM_REQUEST';
export const RM_SUCCESS = 'sftp/RM_SUCCESS';
export const RM_FAILURE = 'sftp/RM_FAILURE';

export const MKDIR_REQUEST = 'sftp/MKDIR_REQUEST';
export const MKDIR_SUCCESS = 'sftp/MKDIR_SUCCESS';
export const MKDIR_FAILURE = 'sftp/MKDIR_FAILURE';

export const WRITE_REQUEST = 'sftp/WRITE_REQUEST';
export const WRITE_SUCCESS = 'sftp/WRITE_SUCCESS';
export const WRITE_PASS = 'sftp/WRITE_PASS';
export const WRITE_FAILURE = 'sftp/WRITE_FAILURE';

export const READ_REQUEST = 'sftp/READ_REQUEST';
export const READ_SUCCESS = 'sftp/READ_SUCCESS';
export const READ_FAILURE = 'sftp/READ_FAILURE';

export const EDIT_READ_SUCCESS = 'sftp/EDIT_READ_SUCCESS';
export const EDIT_WRITE_SUCCESS = 'sftp/EDIT_WRITE_SUCCESS';

export const PWD_REQUEST = 'sftp/PWD_REQUEST';
export const PWD_SUCCESS = 'sftp/PWD_SUCCESS';
export const PWD_FAILURE = 'sftp/PWD_FAILURE';

export const LS_REQUEST = 'sftp/LS_REQUEST';
export const LS_SUCCESS = 'sftp/LS_SUCCESS';
export const LS_FAILURE = 'sftp/LS_FAILURE';

export const CREATE_NEW_WEBSOCKET_REQUEST = 'sftp/CREATE_NEW_WEBSOCKET_REQUEST';
export const CREATE_NEW_WEBSOCKET_SUCCESS = 'sftp/CREATE_NEW_WEBSOCKET_SUCCESS';
export const CREATE_NEW_WEBSOCKET_FAILURE = 'sftp/CREATE_NEW_WEBSOCKET_FAILURE';

export const REMOVE_NEW_WEBSOCKET_REQUEST = 'sftp/REMOVE_NEW_WEBSOCKET_REQUEST';
export const REMOVE_NEW_WEBSOCKET_SUCCESS = 'sftp/REMOVE_NEW_WEBSOCKET_SUCCESS';
export const REMOVE_NEW_WEBSOCKET_FAILURE = 'sftp/REMOVE_NEW_WEBSOCKET_FAILURE';

export const LS_REQUEST_DELETE = 'sftp/LS_REQUEST_DELETE';
export const LS_SUCCESS_DELETE = 'sftp/LS_SUCCESS_DELETE';
export const LS_FAILURE_DELETE = 'sftp/LS_FAILURE_DELETE';

export const ERROR = 'sftp/ERROR';

//etc
export const INIT_FILELIST = 'sftp/INIT_FILELIST';
export const READY_STATE = 'sftp/READY_STATE';

export const DELETE_WORK_LIST = 'sftp/DELETE_WORK_LIST';
export const PUSH_INIT_DELETE_WORK_LIST = 'sftp/PUSH_INIT_DELETE_WORK_LIST';
export const SHIFT_INCINERATOR_LIST = 'sftp/SHIFT_INCINERATOR_LIST';
export const PUSH_READ_LIST = 'sftp/PUSH_READ_LIST';
export const SHIFT_READ_LIST = 'sftp/SHIFT_READ_LIST';
export const PUSH_WRITE_LIST = 'sftp/PUSH_WRITE_LIST';
export const PUSH_PAUSE_WRITE_LIST = 'sftp/PUSH_PAUSE_WRITE_LIST';
export const SHIFT_SOCKETS = 'sftp/SHIFT_SOCKETS';
export const SHIFT_WRITE_LIST = 'sftp/SHIFT_WRITE_LIST';
export const DELETE_WORK_TRANSPORTER = 'sftp/DELETE_WORK_TRANSPORTER';
export const INIT_DELETE_WORK_LIST = 'sftp/INIT_DELETE_WORK_LIST';

export const ADD_HISTORY = 'history/ADD_HISTORY';
export const FIND_HISTORY = 'history/FIND_HISTORY';
export const CHANGE_HISTORY_SOCKET = 'history/CHANGE_HISTORY_SOCKET';
export const REMOVE_HISTORY = 'history/REMOVE_HISTORY';
export const ADD_HISTORY_HI = 'history/ADD_HISTORY_HI';
export const INITIAL_HISTORY_HI = 'history/INITIAL_HISTORY_HI';
export const ADD_PAUSED_LIST = 'history/ADD_PAUSED_LIST';
export const EDIT_PAUSED_LIST = 'history/EDIT_PAUSED_LIST';
export const REMOVE_PAUSED_LIST = 'history/REMOVE_PAUSED_LIST';
export const HISTORY_READY = 'history/HISTORY_READY';

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

// 필요없음.
export const PUT_SUCCESS = 'sftp/PUT_SUCCESS';
export const GET_SUCCESS = 'sftp/GET_SUCCESS';

// actions

export const connectionAction = (payload) => ({
	type: CONNECTION_REQUEST,
	payload, // 웹 소켓 연결을 위한 정보
});

export const reconnectionAction = (payload) => ({
	type: RECONNECTION_REQUEST,
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

let HISTORY_ID = 0;

export const write_chunkSize = 1024 * 4;
export const read_chunkSize = 1024 * 56;
// initial State
const initialState = {
	loading: false,
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
		// new list
		const socket_target = ObjFinder(draft.socket, action.payload?.uuid);
		const path_target = ObjFinder(draft.path, action.payload?.uuid);
		const file_target = ObjFinder(draft.file, action.payload?.uuid);
		const history_target = ObjFinder(draft.history, action.payload?.uuid);
		const etc_target = ObjFinder(draft.etc, action.payload?.uuid);
		const edit_target = ObjFinder(draft.edit, action.payload?.uuid);

		const upload_target = ObjFinder(draft.upload, action.payload?.uuid);
		const download_target = ObjFinder(draft.download, action.payload?.uuid);
		const delete_target = ObjFinder(draft.delete, action.payload?.uuid);

		const file_plain = ObjFinder(state.file, action.payload?.uuid);
		const history_plain = ObjFinder(state.history, action.payload?.uuid);
		const upload_plain = ObjFinder(state.upload, action.payload?.uuid);
		const download_plain = ObjFinder(state.download, action.payload?.uuid);
		const delete_plain = ObjFinder(state.delete, action.payload?.uuid);

		switch (action.type) {
			// 연결
			case CONNECTION_REQUEST:
				draft.loading = true;
				break;

			case RECONNECTION_REQUEST:
				draft.loading = true;
				break;

			case RECONNECTION_SUCCESS:
				draft.loading = false;

				socket_target.uuid = action.payload.newUuid;
				socket_target.socket = action.payload.socket;
				socket_target.ready = 1;
				path_target.uuid = action.payload.newUuid;
				file_target.uuid = action.payload.newUuid;
				history_target.uuid = action.payload.newUuid;
				etc_target.uuid = action.payload.newUuid;
				edit_target.uuid = action.payload.newUuid;
				upload_target.uuid = action.payload.newUuid;
				download_target.uuid = action.payload.newUuid;
				delete_target.uuid = action.payload.newUuid;

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
					tempFile: null,
				});
				draft.history.push({
					uuid: action.payload.uuid,
					history: [],
					history_highlight: [],
					pause: [],
				});
				draft.upload.push({
					uuid: action.payload.uuid,
					writeSocket: null, // 경로, file 저장
					writeList: [], // 경로, file 저장
					pass: true,
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
					initList: [],
					initPath: '',
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

				break;
			case CONNECTION_FAILURE:
				draft.loading = false;
				break;

			case RECONNECTION_FAILURE:
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
				draft.path = state.path.filter(
					(it) => it.uuid !== action.payload.uuid,
				);
				draft.upload = state.upload.filter(
					(it) => it.uuid !== action.payload.uuid,
				);
				draft.download = state.download.filter(
					(it) => it.uuid !== action.payload.uuid,
				);
				draft.delete = state.delete.filter(
					(it) => it.uuid !== action.payload.uuid,
				);
				draft.file = state.file.filter(
					(it) => it.uuid !== action.payload.uuid,
				);
				draft.history = state.history.filter(
					(it) => it.uuid !== action.payload.uuid,
				);
				draft.edit = state.edit.filter(
					(it) => it.uuid !== action.payload.uuid,
				);
				draft.etc = state.etc.filter(
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
				etc_target.toggle = !etc_target.toggle;
				break;
			// 하이라이팅
			case ADD_HIGHLIGHT:
				file_target.highlight.push(action.payload.item);
				break;

			case TEMP_HIGHLIGHT: //O
				file_target.tempFile = {
					item: action.payload.item,
					path: action.payload.path,
				};
				break;
			case REMOVE_TEMP_HIGHLIGHT: //O
				file_target.tempFile = null;
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

			case ADD_PAUSED_LIST: {
				const index = history_plain.pause.findIndex(
					(v) =>
						v.file === action.payload.data.file &&
						v.path === action.payload.data.path &&
						v.todo === action.payload.data.todo,
				);
				if (index === -1) {
					history_target.pause.push({
						...action.payload.data,
					});
				} else {
					history_target.pause[index].offset =
						action.payload.data.offset;
				}
				break;
			}
			case EDIT_PAUSED_LIST: {
				const index = history_plain.pause.findIndex(
					(v) =>
						v.file === action.payload.data.file &&
						v.path === action.payload.data.path &&
						v.todo === action.payload.data.todo,
				);
				history_target.pause[index].offset =
					history_target.pause[index].offset +
					action.payload.newOffset;

				break;
			}

			case REMOVE_PAUSED_LIST: {
				history_target.pause = history_plain.pause.filter(
					(v) =>
						!(
							v.file === action.payload.data.file &&
							v.path === action.payload.data.path &&
							v.todo === action.payload.data.todo
						),
				);
				break;
			}

			case ADD_HISTORY:
				history_target.history.unshift({...action.payload, HISTORY_ID});
				HISTORY_ID++;
				break;

			case HISTORY_READY: {
				const index = history_plain.history.findIndex(
					(v) => v === action.payload.history,
				);
				history_target.history[index].ready = 3;
				break;
			}

			case CHANGE_HISTORY_SOCKET: {
				const index = history_target.history.findIndex(
					(v) => v.HISTORY_ID === action.payload.historyId,
				);
				history_target.history[index].socket = action.payload.socket;
				break;
			}

			case FIND_HISTORY: {
				const index = history_target.history
					.slice()
					.reverse()
					.findIndex(
						(h) =>
							h.name === action.payload.name &&
							h.todo === action.payload.todo &&
							h.progress !== 100,
					);
				if (index !== -1) {
					console.log(index);
					history_target.history[
						history_target.history.length - index - 1
					].ready = action.payload.ready;
					history_target.history[
						history_target.history.length - index - 1
					].progress = action.payload.progress;
				} else {
					console.log('없다!');
				}
				break;
			}
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
				if (action.payload.todo === 'write')
					upload_target.writeSocket = action.payload.socket;
				action.payload.todo === 'read' &&
					download_target.readSockets.push(action.payload.socket);
				action.payload.todo === 'remove' &&
					delete_target.removeSockets.push(action.payload.socket);
				break;

			case SHIFT_SOCKETS:
				if (action.payload.todo === 'write')
					upload_target.writeSocket = null;
				if (action.payload.todo === 'read')
					download_target.readSockets.shift();
				if (action.payload.todo === 'remove')
					delete_target.removeSockets.shift();
				break;
			// read, write, remove
			case PUSH_READ_LIST:
				download_target.readList = download_plain.readList.concat(
					action.payload.array,
				);
				break;
			case SHIFT_READ_LIST:
				download_target.readList.shift();
				break;

			case WRITE_PASS:
				upload_target.pass = false;
				break;

			case PUSH_WRITE_LIST:
				upload_target.writeList = upload_plain.writeList.concat(
					action.payload.array,
				);
				break;
			case PUSH_PAUSE_WRITE_LIST:
				upload_target.writeList.unshift(action.payload.array);
				break;
			case SHIFT_WRITE_LIST:
				upload_target.writeList.shift();
				upload_target.pass = true;
				break;

			case SHIFT_INCINERATOR_LIST:
				delete_target.incinerator.shift();
				break;

			case DELETE_WORK_TRANSPORTER:
				delete_target.incinerator = delete_plain.incinerator.concat(
					delete_target.removeList.sort((a, b) => {
						return a.path < b.path ? 1 : a.path > b.path ? -1 : 0;
					}),
				);
				delete_target.removeList = [];
				delete_target.initList = [];
				delete_target.initPath = '';
				break;

			case DELETE_WORK_LIST:
				delete_target.removeList = delete_plain.removeList.concat(
					action.payload.array,
				);
				break;

			case PUSH_INIT_DELETE_WORK_LIST:
				delete_target.initList = action.payload.list;
				delete_target.initPath = action.payload.path;
				break;

			case INIT_DELETE_WORK_LIST:
				delete_target.removeList = [];
				break;

			default:
				return state;
		}
	});

export default sftp;
