import produce from 'immer';

export const FILELIST_CONNECTION_SUCCESS =
	'history/FILELIST_CONNECTION_SUCCESS';

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

const initialState = {
	listState: [],
};

export const commandPwdAction = (payload) => ({
	type: PWD_REQUEST,
	payload,
});
export const commandLsAction = (payload) => ({
	type: LS_REQUEST,
	payload,
});

const ObjFinder = (target, uuid) => {
	return target.find((it) => it.uuid === uuid);
};

const list = (state = initialState, action) =>
	produce(state, (draft) => {
		// 직접 변형 가능
		const target = ObjFinder(draft.listState, action.payload?.uuid);
		// 직접 변경 불가능
		// const plainTarget = ObjFinder(state.listState, action.payload?.uuid);
		switch (action.type) {
			case FILELIST_CONNECTION_SUCCESS:
				draft.listState.push({
					uuid: action.payload.uuid,
					path: '', // 현재 경로 ok
					fileList: [],
					pathList: [],
				});
				break;

			// 현재 경로 조회
			case PWD_REQUEST:
				// draft.loading = true;

				break;
			case PWD_SUCCESS:
				// draft.loading = false;
				target.path = action.payload.path;
				target.pathList = action.payload.pathList;
				if (action.payload.removeIndex) {
					for (let i = 0; i < action.payload.removeIndex; i++) {
						target.fileList.pop();
					}
				}

				break;
			case PWD_FAILURE:
				// draft.loading = false;
				break;

			// 현재 경로 조회
			case LS_REQUEST:
				break;
			case LS_SUCCESS:
				target.fileList.push(action.payload.fileList);
				break;
			case LS_FAILURE:
				// draft.loading = false;
				break;

			case INIT_FILELIST:
				target.fileList = [];
				break;
			default:
				break;
		}
	});

export default list;
