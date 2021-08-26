import produce from 'immer';

export const STAT_REQUEST = 'sftp/STAT_REQUEST';
export const STAT_SUCCESS = 'sftp/STAT_SUCCESS';
export const STAT_FAILURE = 'sftp/STAT_FAILURE';

export const CHMOD_REQUEST = 'sftp/CHMOD_REQUEST';
export const CHMOD_SUCCESS = 'sftp/CHMOD_SUCCESS';
export const CHMOD_FAILURE = 'sftp/CHMOD_FAILURE';

export const CREATE_NEW_WEBSOCKET_REQUEST = 'sftp/CREATE_NEW_WEBSOCKET_REQUEST';
export const CREATE_NEW_WEBSOCKET_SUCCESS = 'sftp/CREATE_NEW_WEBSOCKET_SUCCESS';

export const ERROR = 'sftp/ERROR';

//etc
export const READY_STATE = 'sftp/READY_STATE';

export const PUSH_PAUSE_READ_LIST = 'sftp/PUSH_PAUSE_READ_LIST';
export const SHIFT_READ_LIST = 'sftp/SHIFT_READ_LIST';
export const PUSH_PAUSE_WRITE_LIST = 'sftp/PUSH_PAUSE_WRITE_LIST';
export const SHIFT_SOCKETS = 'sftp/SHIFT_SOCKETS';
export const SHIFT_WRITE_LIST = 'sftp/SHIFT_WRITE_LIST';
export const DELETE_WORK_TRANSPORTER = 'sftp/DELETE_WORK_TRANSPORTER';
export const INIT_DELETE_WORK_LIST = 'sftp/INIT_DELETE_WORK_LIST';
export const SHIFT_TOTAL = 'sftp/SHIFT_TOTAL';

export const ADD_HISTORY = 'history/ADD_HISTORY';
export const REMOVE_HISTORY = 'history/REMOVE_HISTORY';
export const ADD_HISTORY_HI = 'history/ADD_HISTORY_HI';
export const INITIAL_HISTORY_HI = 'history/INITIAL_HISTORY_HI';
export const ADD_PAUSED_LIST = 'history/ADD_PAUSED_LIST';
export const EDIT_PAUSED_LIST = 'history/EDIT_PAUSED_LIST';
export const REMOVE_PAUSED_LIST = 'history/REMOVE_PAUSED_LIST';
export const REMOVE_READ_WRITE_LIST = 'history/REMOVE_READ_WRITE_LIST';

export const CHANGE_MODE = 'sftp/CHANGE_MODE';
export const CD_REQUEST = 'CD_REQUEST';
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

let HISTORY_ID = 0;

// initial State
const initialState = {
	loading: false,
	sockets: [],
	paths: [],
	uploads: [],
	downloads: [],
	deletes: [],
	files: [],
	historys: [],
	edits: [],
	etcs: [],
	highlights: [],
	status: null,
};

// etc function
const ObjFinder = (target, uuid) => {
	return target.find((it) => it.uuid === uuid);
};

const sftp = (state = initialState, action) =>
	produce(state, (draft) => {
		// new list
		const socket_target = ObjFinder(draft.sockets, action.payload?.uuid);
		const path_target = ObjFinder(draft.paths, action.payload?.uuid);
		const file_target = ObjFinder(draft.files, action.payload?.uuid);
		const history_target = ObjFinder(draft.historys, action.payload?.uuid);
		const etc_target = ObjFinder(draft.etcs, action.payload?.uuid);
		const edit_target = ObjFinder(draft.edits, action.payload?.uuid);
		const high_target = ObjFinder(draft.highlights, action.payload?.uuid);

		const upload_target = ObjFinder(draft.uploads, action.payload?.uuid);
		const download_target = ObjFinder(
			draft.downloads,
			action.payload?.uuid,
		);
		const delete_target = ObjFinder(draft.deletes, action.payload?.uuid);

		const history_plain = ObjFinder(state.historys, action.payload?.uuid);
		const upload_plain = ObjFinder(state.uploads, action.payload?.uuid);
		const download_plain = ObjFinder(state.downloads, action.payload?.uuid);
		const delete_plain = ObjFinder(state.deletes, action.payload?.uuid);

		switch (action.type) {
			// 연결

			// 해제

			// 모드변경
			case CHANGE_MODE:
				etc_target.mode = action.payload.mode;
				etc_target.prevMode = action.payload.currentMode;
				high_target.highlight = [];
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
				high_target.highlight.push(action.payload.item);
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
				if (high_target.highlight.length !== 0)
					high_target.highlight = [];
				break;

			case ADD_ONE_HIGHLIGHT:
				high_target.highlight?.splice(
					0,
					Number.MAX_VALUE,
					action.payload.item,
				);
				break;
			case REMOVE_HIGHLIGHT:
				high_target.highlight = high_target.highlight
					.slice()
					.filter(
						(v) =>
							JSON.stringify(v) !==
							JSON.stringify(action.payload.item),
					);
				break;

			//--//

			case READY_STATE: {
				const index = draft.sockets.findIndex(
					(v) => v.uuid === action.payload.uuid,
				);
				if (index === -1) return;
				socket_target.ready = 3;
				break;
			}

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

			case REMOVE_READ_WRITE_LIST: {
				upload_target.writeList = upload_plain.writeList.filter(
					(v) => v.HISTORY_ID !== action.payload.history.HISTORY_ID,
				);
				download_target.readList = download_plain.readList.filter(
					(v) => v.HISTORY_ID !== action.payload.history.HISTORY_ID,
				);

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

			case ADD_HISTORY: {
				history_target.history.unshift({...action.payload, HISTORY_ID});
				const item = {
					path: action.payload.path,
					file: action.payload.file,
					todo: action.payload.todo,
					HISTORY_ID,
				};
				if (action.payload.todo === 'write') {
					upload_target.writeList.push(item);
				} else if (action.payload.todo === 'read') {
					download_target.readList.push(item);
				} else if (action.payload.todo === 'edit') {
					if (action.payload.key === 'read') {
						download_target.readList.splice(1, 0, item);
					} else {
						upload_target.writeList.splice(1, 0, item);
					}
				}
				HISTORY_ID++;
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
				if (history_target.history_highlight.length !== 0)
					history_target.history_highlight = [];
				break;

			//todo ------------------------
			case CREATE_NEW_WEBSOCKET_SUCCESS:
				if (action.payload.todo === 'write')
					upload_target.writeSocket = action.payload.socket;
				if (action.payload.todo === 'read')
					download_target.readSocket = action.payload.socket;
				if (action.payload.todo === 'edit') {
					if (action.payload.key === 'write')
						upload_target.writeSocket = action.payload.socket;
					if (action.payload.key === 'read')
						download_target.readSocket = action.payload.socket;
				}
				if (action.payload.todo === 'remove')
					delete_target.removeSocket = action.payload.socket;
				break;

			case SHIFT_SOCKETS:
				console.log(action.payload.todo);
				if (action.payload.todo === 'write')
					upload_target.writeSocket = null;
				if (action.payload.todo === 'read')
					download_target.readSocket = null;
				if (action.payload.todo === 'edit') {
					if (action.payload.key === 'write')
						upload_target.writeSocket = null;
					if (action.payload.key === 'read')
						download_target.readSocket = null;
				}
				if (action.payload.todo === 'remove')
					delete_target.removeSocket = null;
				break;

			case SHIFT_READ_LIST:
				download_target.readList.shift();
				download_target.pass = true;
				break;

			case PUSH_PAUSE_WRITE_LIST:
				upload_target.writeList.unshift(action.payload.array);
				break;
			case PUSH_PAUSE_READ_LIST:
				download_target.readList.unshift(action.payload.array);
				break;
			case SHIFT_WRITE_LIST:
				upload_target.writeList.shift();
				upload_target.pass = true;
				break;

			case SHIFT_TOTAL: {
				delete_target.total.shift();
				break;
			}

			case DELETE_WORK_TRANSPORTER: {
				console.log(delete_plain.removeList);
				const arr = [];
				for (let v of delete_plain.removeList) {
					console.log(v.list);
					delete_target.total.push(v.list);

					for (let x of v.list) {
						arr.push(x);
					}
				}
				console.log(arr);

				delete_target.incinerator =
					delete_plain.incinerator.concat(arr);
				console.log(delete_target.incinerator);
				// delete_target.incinerator.push(arr);
				// delete_target.incinerator = delete_plain.incinerator.concat(
				// 	delete_target.removeList.sort((a, b) => {
				// 		return a.path < b.path ? 1 : a.path > b.path ? -1 : 0;
				// 	}),
				// );
				delete_target.removeList = [];
				delete_target.initList = [];
				delete_target.initPath = '';
				break;
			}

			case INIT_DELETE_WORK_LIST:
				delete_target.removeList = [];
				break;

			case STAT_REQUEST:
				draft.status = null;
				break;
			case STAT_SUCCESS:
				draft.status = {
					data: action.payload.data,
					path: action.payload.path,
				};
				break;
			case STAT_FAILURE:
				break;

			default:
				return state;
		}
	});

export default sftp;
