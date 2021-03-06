import {createSelector, createSlice} from '@reduxjs/toolkit';

let HID = 0;
let LINK = 0; //memo : relationship between list and history
export const types = {
	pause: 'pause',
	search: 'search',
	edit: 'edit',
	delete: 'delete',
	upload: 'upload',
	download: 'download',
};

const slice = createSlice({
	name: 'sftp',
	initialState: {
		sftp: [],
		loading: false, // 전체적으로 사용하는 loading sftp내부에서 각각 loading 갖고있음
		error: null,
	},
	reducers: {
		//CONNECTION_REQUEST
		// todo => 나중에 tab 오픈할때는
		//  tabBarAction.addTab({
		// 	uuid: uuid,
		// 	type: 'SSH',
		// 	resourceId: action.payload.key,
		//  }),
		//  이렇게 resourceKey만 넘겨주세요

		connect: (state) => {
			state.loading = true;
		},
		//CONNECTION_SUCCESS
		connectDone: (state, action) => {
			state.loading = false;
			state.sftp.push({
				loading: false,
				uuid: action.payload.uuid,
				socket: action.payload.socket,
				readyState: 1, // 네이밍 수정하면 좋을 듯
				mode: 'list', //bool로 할까 고민중
				sort: {
					type: 'name',
					asc: true,
				},
				path: '',
				files: {}, // 경로명(key) : [{파일들}] fileList
				history: [],
				edit: {
					state: false,
					original: null, //비교용
				},
				selected: {
					// 구 하이라이트
					files: [],
					historys: [],
				},
				pause: {
					state: false,
				},
				upload: {
					on: false,
					socket: null,
					list: [],
				},
				download: {
					on: false,
					socket: null,
					list: [],
				},
				delete: {
					//useEffect 방식에서 수정해야 할 듯...
					on: false,
					socket: null,
					list: [], // searching이 종료되면 list로 이동
					// {초기경로 : [삭제할 아이템...]} 형태로 저장하고
					// 삭제할 아이템 searching이 끝나면 해당 경로값만 list로 이동하는 방식
				},
				search: {
					on: false, // 모든 준비가 ok 되었을때 on off (최종버튼)
					socket: null,
					list: [],
				},
			});
		},
		//CONNECTION_FAILURE
		connectFail: (state) => {
			state.loading = false;
		},

		//RECONNECTION_REQUEST
		reconnect: (state) => {
			state.loading = true;
		},
		//RECONNECTION_SUCCESS
		reconnectDone: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].uuid = action.payload.newUuid;
			state.sftp[index].socket = action.payload.socket;
			state.sftp[index].readyState = action.payload.readyState;
		},
		//RECONNECTION_FAILURE
		reconnectFail: (state) => {
			state.loading = false;
		},
		//DISCONNECTION_REQUEST
		disconnect: (state, action) => {},
		//DISCONNECTION_SUCCESS
		disconnectDone: (state, action) => {
			state.sftp = state.sftp.filter(
				(v) => v.uuid !== action.payload.uuid,
			);
		},
		//DISCONNECTION_FAILURE
		disconnectFail: (state, action) => {
			state.sftp = state.sftp.filter(
				(v) => v.uuid !== action.payload.uuid,
			);
			console.log('에러 핸들링 : 정상적으로 종료되지 않았습니다.');
		},
		//CD_REQUEST
		commandCd: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].selected.files = [];
		},
		//CD_SUCCESS
		commandCdDone: (state, action) => {},
		//CD_FAILURE
		commandCdFail: (state, action) => {},
		//PWD_REQUEST
		commandPwd: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].loading = true;
		},
		//PWD_SUCCESS
		commandPwdDone: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].path = action.payload.path;
			//todo => deleteList는 삭제할 경로명의 배열이다 isRequired
			if (action.payload.deleteList === null) {
				// 초기화
				state.sftp[index].files = {};
			} else {
				action.payload.deleteList.forEach((v) => {
					delete state.sftp[index].files[v];
				});
			}
			state.sftp[index].loading = false;
		},
		commandPwdFail: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].loading = false;
		},

		//LS_REQUEST
		commandLs: () => {},
		//LS_SUCCESS
		commandLsDone: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].files[action.payload.path] = action.payload.files;
		},
		//LS_FAILURE
		commandLsFail: (state, action) => {
			console.log('에러 핸들링이 필요한데, 에러에 따라 처리는 나중에');
		},

		//STAT_REQUEST
		commandStatus: (state, action) => {},
		commandStatusDone: (state, action) => {},
		commandStatusFail: (state, action) => {},

		//RENAME_REQUEST
		commandRename: (state, action) => {},
		commandRenameDone: (state, action) => {},
		commandRenameFail: (state, action) => {},

		//RM_REQUEST RMDIR_REQUEST
		commandRemove: (state, action) => {},
		commandRemoveDone: (state, action) => {},
		commandRemoveFail: (state, action) => {},

		//MKDIR_REQUEST
		commandMkdir: (state, action) => {},
		commandMkdirDone: (state, action) => {},
		commandMkdirFail: (state, action) => {},

		//WRITE_REQUEST
		commandWrite: (state, action) => {},
		commandWriteDone: (state, action) => {},
		commandWriteFail: (state, action) => {},

		//READ_REQUEST
		commandRead: (state, action) => {},
		commandReadDone: (state, action) => {},
		commandReadFail: (state, action) => {},

		//CHMOD_REQUEST
		commandChmod: (state, action) => {},
		commandChmodDone: (state, action) => {},
		commandChmodFail: (state, action) => {},

		searchDirectory: (state, action) => {},
		searchDirectoryDone: (state, action) => {},
		searchDirectoryFail: (state, action) => {},

		//CREATE_NEW_WEBSOCKET_REQUEST
		createSocket: (state, action) => {},
		createSocketAll: (state, action) => {},
		createSocketDone: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			// type 값으로 upload, download, delete 를 보내줘야함.
			state.sftp[index][action.payload.type].socket =
				action.payload.socket;
		},
		createSocketFail: (state, action) => {},

		//REMOVE_NEW_WEBSOCKET_REQUEST
		deleteSocket: (state, action) => {},
		deleteSocketDone: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			// type 값으로 upload, download, delete 를 보내줘야함.
			state.sftp[index][action.payload.type].socket = null;
		},
		deleteSocketFail: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			// type 값으로 upload, download, delete 를 보내줘야함.
			state.sftp[index][action.payload.type].socket = null;
		},

		// TODO : ETC line ============================================

		setOn: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index][action.payload.type].on =
				!state.sftp[index][action.payload.type].on;
		},

		restart: (state, action) => {},
		// upload, downoad, delete List 추가
		addList: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			if (action.payload.type === 'delete') {
				state.sftp[index][action.payload.type].list.unshift({
					...action.payload.value,
				});
			} else {
				state.sftp[index][action.payload.type].list.push({
					...action.payload.value,
					link: ++LINK,
				});
			}
		},
		deleteList: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index][action.payload.type].list.shift();
		},

		//READY_STATE
		setReady: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].readyState = action.payload.readyState;
		},
		//CHANGE_MODE
		setMode: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].mode = action.payload.mode;
		},
		// 타입 있는지 모르겠다
		openEditor: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].edit.state = true;
		},
		//CLOSE_EDITOR
		closeEditor: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].edit.state = false;
			state.sftp[index].edit.original = null;
		},
		// 초기 내용 저장시 사용
		//SAVE_TEXT
		setEditor: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].edit.original = action.payload.text;
		},
		//CHANGE_SORT_KEYWORD
		setSort: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			if (state.sftp[index].sort.type === action.payload.type) {
				state.sftp[index].sort.asc = !state.sftp[index].sort.asc;
			} else {
				state.sftp[index].sort.asc = true;
			}
			state.sftp[index].sort.type = action.payload.type;
		},
		//ADD_HIGHLIGHT, INITIALIZING_HIGHLIGHT, ADD_ONE_HIGHLIGHT, REMOVE_HIGHLIGHT
		setSelectedFile: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].selected.files = action.payload.result
				.slice()
				.filter((v) => v.name !== '..');
		},
		//PUSH_INIT_DELETE_WORK_LIST
		getSelectedFile: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index][action.payload.type].list =
				state.sftp[index].selected.files;
		},
		// 	업로드, 다운로드 삭제가 하나의 pause controller를 공유하는게 좋을거 같다
		setLeftover: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index][action.payload.type].list.unshift(
				action.payload.item,
			);
		},
		setPause: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].pause.state = !state.sftp[index].pause.state;
		},
		//ADD_HISTORY
		addHistory: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].history.unshift({
				...action.payload.history,
				id: HID++,
				link: LINK,
				progress: 0,
			});
		},
		//REMOVE_HISTORY
		deleteHistory: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].history = state.sftp[index].history.filter(
				(v) => v.id !== action.payload.id,
			);
		},
		//FIND_HISTORY
		setHistoryProgress: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			// link id로 객체찾기
			const target = state.sftp[index].history.find(
				(v) => v.link === action.payload.link,
			);
			if (target) target.progress = action.payload.progress;
		},
		// ADD_HISTORY_HI, INITIAL_HISTORY_HI
		setSelectedHistory: (state, action) => {
			const index = state.sftp.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.sftp[index].selected.historys = action.payload.result;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.sftp,
	(state) => state.loading,
	(state) => state.error,
	(sftp, error, loading) => {
		return {
			sftp,
			error,
			loading,
		};
	},
);
export const sftpSelector = {
	all: (state) => selectAllState(state[SFTP]),
};
export const SFTP = slice.name;
export const sftpReducer = slice.reducer;
export const sftpAction = slice.actions;
