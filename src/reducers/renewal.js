import {createSelector, createSlice} from '@reduxjs/toolkit';

export const write_chunkSize = 1024 * 4;
export const read_chunkSize = 1024 * 56; // 56
let HID = 0;

const slice = createSlice({
	name: 'sftp',
	initialState: {
		data: [],
		loading: false, // 전체적으로 사용하는 loading data내부에서 각각 loading 갖고있음
		error: null,
	},
	reducers: {
		//CONNECTION_REQUEST
		// todo => 나중에 tab 오픈할때는
		//  tabBarAction.addTab({
		// 	uuid: uuid,
		// 	type: 'SSH',
		// 	resourceKey: action.payload.key,
		//  }),
		//  이렇게 resourceKey만 넘겨주세요

		connect: (state) => {
			state.loading = true;
		},
		//CONNECTION_SUCCESS
		connectDone: (state, action) => {
			state.loading = false;
			state.data.push({
				loading: false,
				uuid: action.payload.uuid,
				socket: action.payload.socket,
				ready: 1, // 네이밍 수정하면 좋을 듯
				mode: 'list', //bool로 할까 고민중
				sort: {
					keyword: 'name',
					asc: true,
				},
				path: null,
				files: {}, // 경로명(key) : [{파일들}] fileList
				history: [],
				edit: {
					state: false,
					original: null, //비교용
				},
				selected: {
					// 구 하이라이트
					file: [],
					history: [],
				},
				pause: {state: false, file: null, offset: null},
				upload: {
					socket: null,
					list: [],
				},
				download: {
					socket: null,
					list: [],
				},
				delete: {
					//useEffect 방식에서 수정해야 할 듯...
					socket: null,
					list: [], // searching이 종료되면 list로 이동
					search: [], // search가 비어야 다음 삭제가 가능
					// {초기경로 : [삭제할 아이템...]} 형태로 저장하고
					// 삭제할 아이템 searching이 끝나면 해당 경로값만 list로 이동하는 방식
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
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].uuid = action.payload.newUuid;
			state.data[index].socket = action.payload.socket;
			state.data[index].ready = 1;
		},
		//RECONNECTION_FAILURE
		reconnectFail: (state) => {
			state.loading = false;
		},
		//DISCONNECTION_REQUEST
		disconnect: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].loading = true;
		},
		//DISCONNECTION_SUCCESS
		disconnectDone: (state, action) => {
			state.data = state.data.filter(
				(v) => v.uuid !== action.payload.uuid,
			);
		},
		//DISCONNECTION_FAILURE
		disconnectFail: (state, action) => {
			state.data = state.data.filter(
				(v) => v.uuid !== action.payload.uuid,
			);
			console.log('에러 핸들링 : 정상적으로 종료되지 않았습니다.');
		},
		//CD_REQUEST
		commandCd: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].loading = true;
		},
		//CD_SUCCESS
		commandCdDone: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			console.log(
				'여기서 path 추가 안해도 pwd에서 추가함 다른 처리 생각...',
			);
			state.data[index].path = action.payload.path;
			state.data[index].loading = false;
		},
		//CD_FAILURE
		commandCdFail: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].loading = false;
		},
		//PWD_REQUEST
		commandPwd: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].loading = true;
		},
		//PWD_SUCCESS
		commandPwdDone: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].path = action.payload.path;
			//todo => deleteList는 삭제할 경로명의 배열이다 isRequired
			if (action.payload.deleteList === null) {
				// 초기화
				state.data[index].files = {};
			} else {
				action.payload.deleteList.forEach((v) => {
					delete state.data[index].files[v];
				});
			}
			state.data[index].loading = false;
		},
		commandPwdFail: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].loading = false;
		},

		//LS_REQUEST
		commandLs: () => {},
		//LS_SUCCESS
		commandLsDone: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].files[action.payload.path] = action.payload.files;
		},
		//LS_FAILURE
		commandLsFail: (state, action) => {
			console.log('에러 핸들링이 필요한데, 에러에 따라 처리는 나중에');
		},

		// TODO : ETC line ETC line ETC line ETC line ETC line

		//READY_STATE
		setReady: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].ready = 3;
		},
		//CHANGE_MODE
		setMode: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].mode = action.payload.mode;
		},
		// 타입 있는지 모르겠다
		openEditor: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].edit.state = true;
		},
		//CLOSE_EDITOR
		closeEditor: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].edit.state = false;
			state.data[index].edit.original = null;
		},
		// 초기 내용 저장시 사용
		//SAVE_TEXT
		setEditor: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].edit.original = action.payload.text;
		},
		//CHANGE_SORT_KEYWORD
		setSort: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].sort.keyword = action.payload.keyword;
			state.data[index].sort.asc = !state.data[index].sort.asc;
		},
		//ADD_HIGHLIGHT, INITIALIZING_HIGHLIGHT, ADD_ONE_HIGHLIGHT, REMOVE_HIGHLIGHT
		setSelectedFile: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].selected.file = action.payload.result;
		},
		// 	업로드, 다운로드 삭제가 하나의 pause controller를 공유하는게 좋을거 같다
		//ADD_PAUSED_LIST ? EDIT_PAUSED_LIST, REMOVE_PAUSED_LIST
		setPause: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			if (!state.data[index].pause.state) {
				state.data[index].pause.file = action.payload.file;
				state.data[index].pause.offset = action.payload.offset;
			} else {
				console.log(
					'필요시 upload, download, delete에 따라서 file, offset 적용',
				);
			}
			state.data[index].pause.state = !state.data[index].pause.state;
		},

		//ADD_HISTORY
		addHistory: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].history.unshift({
				...action.payload.history,
				id: HID++,
			});
			//write, read, edit, delete 설정은 나중에 생성하자
		},
		//REMOVE_HISTORY
		deleteHistory: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].history = state.data[index].history.filter(
				(v) => v.id !== action.payload.id,
			);
		},
		//FIND_HISTORY
		setHistoryProgress: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			// id:HID로 객체찾기
			state.data[index].history.find(
				(v) => v.id === action.payload.id,
			).progress = action.payload.progress;
		},
		// ADD_HISTORY_HI, INITIAL_HISTORY_HI
		setSelectedHistory: (state, action) => {
			const index = state.data.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			state.data[index].selected.history = action.payload.result;
		},
	},
});

const selectAllState = createSelector();
export const remoteResourceSelector = {
	all: (state) => selectAllState(state[SFTP]),
};
export const SFTP = slice.name;
export const sftpReducer = slice.reducer;
export const sftpAction = slice.actions;
