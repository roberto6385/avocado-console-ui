import produce from 'immer';

export const initialState = {
	currentType: [],

	currentMode: [],
	currentPath: [],

	// file list
	currentList: [],
	currentHighlight: [],
	currentText: [],
	currentCompareText: [],

	//history
	History: [],
	HISTORY_ID: 0,
};

export const SFTP_SAVE_CURRENT_TYPE = 'SFTP_SAVE_CURRENT_TYPE';

export const SFTP_SAVE_CURRENT_MODE = 'SFTP_SAVE_CURRENT_MODE';
export const SFTP_DELETE_CURRENT_MODE = 'SFTP_DELETE_CURRENT_MODE';

export const SFTP_SAVE_CURRENT_PATH = 'SFTP_SAVE_CURRENT_PATH';
export const SFTP_DELETE_CURRENT_PATH = 'SFTP_DELETE_CURRENT_PATH';

// file list
export const SFTP_SAVE_CURRENT_LIST = 'SFTP_SAVE_CURRENT_LIST';
export const SFTP_DELETE_CURRENT_LIST = 'SFTP_DELETE_CURRENT_LIST';
export const SFTP_SAVE_CURRENT_HIGHLIGHT = 'SFTP_SAVE_CURRENT_HIGHLIGHT';
export const SFTP_DELETE_CURRENT_HIGHLIGHT = 'SFTP_DELETE_CURRENT_HIGHLIGHT';

//text
export const SFTP_SAVE_CURRENT_TEXT = 'SFTP_SAVE_CURRENT_TEXT';
export const SFTP_SAVE_COMPARE_TEXT = 'SFTP_SAVE_COMPARE_TEXT';

// history
export const SFTP_SAVE_HISTORY = 'SFTP_SAVE_HISTORY';
export const SFTP_DELETE_HISTORY = 'SFTP_DELETE_HISTORY';

// 리듀서 findIndex 변수들
let currentType_index;
let currentMode_index;
let currentPath_index;
let currentList_index;
let currentHighlight_index;
let currentText_index;
let currentCompare_index;

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case SFTP_SAVE_CURRENT_TEXT:
				currentText_index = draft.currentText.findIndex(
					(item) => item.uuid === action.data.uuid,
				);

				if (currentText_index !== -1) {
					draft.currentText.splice(currentText_index, 1, {
						uuid: action.data.uuid,
						text: action.data.text,
						name: action.data.name,
					});
				} else {
					draft.currentText.push({
						uuid: action.data.uuid,
						text: action.data.text,
						name: action.data.name,
					});
				}
				break;

			case SFTP_SAVE_COMPARE_TEXT:
				currentCompare_index = draft.currentCompareText.findIndex(
					(item) => item.uuid === action.data.uuid,
				);

				if (currentCompare_index !== -1) {
					draft.currentCompareText.splice(currentCompare_index, 1, {
						uuid: action.data.uuid,
						text: action.data.text,
						name: action.data.name,
					});
				} else {
					draft.currentCompareText.push({
						uuid: action.data.uuid,
						text: action.data.text,
						name: action.data.name,
					});
				}
				break;

			case SFTP_SAVE_CURRENT_TYPE:
				console.log('type save execution');
				currentType_index = draft.currentType.findIndex(
					(item) => item.uuid === action.data.uuid,
				);

				if (currentType_index !== -1) {
					draft.currentType.splice(currentType_index, 1, {
						uuid: action.data.uuid,
						type: action.data.type,
					});
				} else {
					draft.currentType.push({
						uuid: action.data.uuid,
						type: action.data.type,
					});
				}
				break;

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

			case SFTP_SAVE_HISTORY:
				draft.History.unshift({
					id: draft.HISTORY_ID,
					uuid: action.data.uuid,
					name: action.data.name,
					path: action.data.path,
					size: action.data.size,
					todo: action.data.todo,
					progress: action.data.progress,
				});
				draft.HISTORY_ID++;
				break;

			case SFTP_DELETE_HISTORY:
				// 개별삭제
				if (action.data.id !== -1) {
					const tempA = draft.History;
					draft.History = tempA.filter(
						(it) => it.id !== action.data.id,
					);
				} else {
					//전체삭제
					const tempB = draft.History;
					draft.History = tempB.filter(
						(it) => it.uuid !== action.data.uuid,
					);
				}
				break;

			default:
				break;
		}
	});
};

export default reducer;
