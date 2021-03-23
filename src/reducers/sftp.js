import produce from 'immer';

export const initialState = {
	currentMode: [],
	currentPath: [],
	currentList: [],
	currentHighlight: [],
};

export const SFTP_SAVE_CURRENT_MODE = 'SFTP_SAVE_CURRENT_MODE';
export const SFTP_DELETE_CURRENT_MODE = 'SFTP_DELETE_CURRENT_MODE';

export const SFTP_SAVE_CURRENT_PATH = 'SFTP_SAVE_CURRENT_PATH';
export const SFTP_DELETE_CURRENT_PATH = 'SFTP_DELETE_CURRENT_PATH';

export const SFTP_SAVE_CURRENT_LIST = 'SFTP_SAVE_CURRENT_LIST';
export const SFTP_DELETE_CURRENT_LIST = 'SFTP_DELETE_CURRENT_LIST';

export const SFTP_SAVE_CURRENT_HIGHLIGHT = 'SFTP_SAVE_CURRENT_HIGHLIGHT';
export const SFTP_DELETE_CURRENT_HIGHLIGHT = 'SFTP_DELETE_CURRENT_HIGHLIGHT';

// 리듀서 findIndex 변수들
let currentMode_index;
let currentPath_index;
let currentList_index;
let currentHighlight_index;

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case SFTP_SAVE_CURRENT_MODE:
				currentMode_index = draft.currentMode.findIndex(
					(item) => item.uuid === action.data.uuid,
				);

				if (currentMode_index !== -1) {
					draft.currentMode.splice(currentMode_index, 1, {
						uuid: action.data.uuid,
						mode: action.data.mode,
					});
				} else {
					draft.currentMode.push({
						uuid: action.data.uuid,
						mode: action.data.mode,
					});
				}
				break;

			case SFTP_DELETE_CURRENT_MODE:
				currentMode_index = draft.currentMode.findIndex(
					(item) => item.uuid === action.data,
				);
				if (currentMode_index !== -1) {
					draft.currentMode.splice(currentMode_index, 1);
				}
				break;

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

			case SFTP_SAVE_CURRENT_LIST:
				currentList_index = draft.currentList.findIndex(
					(item) => item.uuid === action.data.uuid,
				);

				if (currentList_index !== -1) {
					draft.currentList.splice(currentList_index, 1, {
						uuid: action.data.uuid,
						list: action.data.list,
					});
				} else {
					draft.currentList.push({
						uuid: action.data.uuid,
						list: action.data.list,
					});
				}
				break;

			case SFTP_DELETE_CURRENT_LIST:
				currentList_index = draft.currentList.findIndex(
					(item) => item.uuid === action.data,
				);
				if (currentList_index !== -1) {
					draft.currentList.splice(currentList_index, 1);
				}
				break;

			case SFTP_SAVE_CURRENT_HIGHLIGHT:
				currentHighlight_index = draft.currentHighlight.findIndex(
					(item) => item.uuid === action.data.uuid,
				);

				if (currentHighlight_index !== -1) {
					draft.currentHighlight.splice(currentHighlight_index, 1, {
						uuid: action.data.uuid,
						list: action.data.list,
					});
				} else {
					draft.currentHighlight.push({
						uuid: action.data.uuid,
						list: action.data.list,
					});
				}
				break;

			case SFTP_DELETE_CURRENT_HIGHLIGHT:
				currentHighlight_index = draft.currentHighlight.findIndex(
					(item) => item.uuid === action.data,
				);
				if (currentHighlight_index !== -1) {
					draft.currentHighlight.splice(currentHighlight_index, 1);
				}
				break;

			default:
				break;
		}
	});
};

export default reducer;
