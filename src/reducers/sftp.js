import produce from 'immer';

export const initialState = {
	currentPath: [],
};

export const SFTP_SAVE_CURRENT_PATH = 'SFTP_SAVE_CURRENT_PATH';
export const SFTP_DELETE_CURRENT_PATH = 'SFTP_DELETE_CURRENT_PATH';

// 리듀서 findIndex 변수들
let currentPath_index;

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case SFTP_SAVE_CURRENT_PATH:
				currentPath_index = draft.currentPath.findIndex(
					(item) => item.uuid === action.data.uuid,
				);

				if (currentPath_index !== -1) {
					draft.currentPath.splice(currentPath_index, 1, {
						uuid: action.data.uuid,
						path: action.data.path,
					});
				} else {
					draft.currentPath.push({
						uuid: action.data.uuid,
						path: action.data.path,
					});
				}
				break;

			case SFTP_DELETE_CURRENT_PATH:
				currentPath_index = draft.currentPath.findIndex(
					(item) => item.uuid === action.data,
				);
				if (currentPath_index !== -1) {
					draft.currentPath.splice(currentPath_index, 1);
				}
				break;

			default:
				break;
		}
	});
};

export default reducer;
