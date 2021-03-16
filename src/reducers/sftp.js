import produce from 'immer';

export const initialState = {
	sftp_file: [],
	sftp_selected_file: [],
	sftp_save_text: [],
	sftp_text_store: [],
	sftp_editMode: [],
	sftp_history: [],
	sftp_selected_history: [],
	sftp_historyID: 0,
};

// sftp actions
export const SFTP_SAVE_FILE = 'sftp/SAVE_FILE';
export const SFTP_SELECT_FILE = 'sftp/SELECT_FILE';
export const SFTP_SAVE_TEXT = 'sftp/SAVE_TEXT';
export const SFTP_TEXT_STORE = 'sftp/TEXT_STORE';
export const SFTP_CHANGE_MODE = 'sftp/CHANGE_MODE';
export const SFTP_SAVE_HISTORY = 'sftp/SAVE_HISTORY';
export const SFTP_SELECT_HISTORY = 'sftp/SELECT_HISTORY';
export const SFTP_DELETE_HISTORY = 'sftp/DELETE_HISTORY';

// sftp reducer

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case SFTP_SAVE_FILE:
				// eslint-disable-next-line no-case-declarations
				const saveFile_index = draft.sftp_file.findIndex(
					(item) => item.uuid === action.data.uuid,
				);
				if (saveFile_index !== -1) {
					//uuid 아이디가 존재하는 경우
					draft.sftp_file.splice(saveFile_index, 1, {
						uuid: action.data.uuid,
						file: action.data.files,
						path: action.data.path,
					});
				} else {
					draft.sftp_file.push({
						uuid: action.data.uuid,
						file: action.data.files,
						path: action.data.path,
					});
				}
				break;

			case SFTP_SAVE_TEXT:
				// eslint-disable-next-line no-case-declarations
				const saveText_index = draft.sftp_save_text.findIndex(
					(item) => item.uuid === action.data.uuid,
				);
				if (saveText_index !== -1) {
					//uuid 아이디가 존재하는 경우
					draft.sftp_save_text.splice(saveText_index, 1, {
						uuid: action.data.uuid,
						text: action.data.text,
						name: action.data.name,
					});
				} else {
					draft.sftp_save_text.push({
						uuid: action.data.uuid,
						text: action.data.text,
						name: action.data.name,
					});
				}
				break;

			case SFTP_TEXT_STORE:
				// eslint-disable-next-line no-case-declarations
				const textStore_index = draft.sftp_text_store.findIndex(
					(item) => item.uuid === action.data.uuid,
				);
				if (textStore_index !== -1) {
					//uuid 아이디가 존재하는 경우
					draft.sftp_text_store.splice(textStore_index, 1, {
						uuid: action.data.uuid,
						text: action.data.text,
						name: action.data.name,
					});
				} else {
					draft.sftp_text_store.push({
						uuid: action.data.uuid,
						text: action.data.text,
						name: action.data.name,
					});
				}
				break;

			case SFTP_SELECT_FILE:
				// eslint-disable-next-line no-case-declarations
				const selectedFile_index = draft.sftp_selected_file.findIndex(
					(item) => item.uuid === action.data.uuid,
				);
				if (selectedFile_index !== -1) {
					//uuid 아이디가 존재하는 경우
					draft.sftp_selected_file.splice(selectedFile_index, 1, {
						uuid: action.data.uuid,
						file: action.data.files,
					});
				} else {
					draft.sftp_selected_file.push({
						uuid: action.data.uuid,
						file: action.data.files,
					});
				}
				break;

			case SFTP_SELECT_HISTORY:
				// eslint-disable-next-line no-case-declarations
				const selectedHistory_index = draft.sftp_selected_history.findIndex(
					(item) => item.uuid === action.data.uuid,
				);
				if (selectedHistory_index !== -1) {
					//uuid 아이디가 존재하는 경우
					draft.sftp_selected_history.splice(
						selectedHistory_index,
						1,
						{
							uuid: action.data.uuid,
							history: action.data.history,
						},
					);
				} else {
					draft.sftp_selected_history.push({
						uuid: action.data.uuid,
						history: action.data.history,
					});
				}
				break;

			case SFTP_CHANGE_MODE:
				// eslint-disable-next-line no-case-declarations
				const editMode_index = draft.sftp_editMode.findIndex(
					(item) => item.uuid === action.data.uuid,
				);
				if (editMode_index !== -1) {
					//uuid 아이디가 존재하는 경우
					draft.sftp_editMode.splice(editMode_index, 1, {
						uuid: action.data.uuid,
						mode: action.data.mode,
					});
				} else {
					draft.sftp_editMode.push({
						uuid: action.data.uuid,
						mode: action.data.mode,
					});
				}
				break;

			case SFTP_SAVE_HISTORY:
				draft.sftp_history.unshift({
					id: draft.sftp_historyID,
					uuid: action.data.uuid,
					name: action.data.name,
					path: action.data.path,
					size: action.data.size,
					todo: action.data.todo,
					status: action.data.status,
				});
				draft.sftp_historyID++;
				break;

			case SFTP_DELETE_HISTORY:
				// eslint-disable-next-line no-case-declarations
				const temp_history = draft.sftp_history;
				if (action.data.id !== -1) {
					const story = temp_history.filter(
						(it) => it.id !== action.data.id,
					);
					draft.sftp_history = story;
				} else {
					draft.sftp_history = [];
				}
				break;

			default:
				break;
		}
	});
};

export default reducer;
