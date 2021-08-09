import produce from 'immer';

export const initialState = {
	confirm_dialog_box: {open: false},
	warning_dialog_box: {open: false},
	delete_dialog_box: {open: false},
	save_dialog_box: {open: false},
	input_dialog_box: {open: false},
	add_server_dialog_box: {open: false},
	add_favorites_dialog_box: {open: false},
	account_form_popup: {open: false},
	file_status_dialog_box: {open: false},
	chgrp_dialog_box: {open: false},
	chown_dialog_box: {open: false},
};

export const OPEN_CONFIRM_DIALOG_BOX = 'OPEN_CONFIRM_DIALOG_BOX';
export const CLOSE_CONFIRM_DIALOG_BOX = 'CLOSE_CONFIRM_DIALOG_BOX';

export const OPEN_WARNING_DIALOG_BOX = 'OPEN_WARNING_DIALOG_BOX';
export const CLOSE_WARNING_DIALOG_BOX = 'CLOSE_WARNING_DIALOG_BOX';

export const OPEN_DELETE_DIALOG_BOX = 'OPEN_DELETE_DIALOG_BOX';
export const CLOSE_DELETE_DIALOG_BOX = 'CLOSE_DELETE_DIALOG_BOX';

export const OPEN_SAVE_DIALOG_BOX = 'OPEN_SAVE_DIALOG_BOX';
export const CLOSE_SAVE_DIALOG_BOX = 'CLOSE_SAVE_DIALOG_BOX';

export const OPEN_INPUT_DIALOG_BOX = 'OPEN_INPUT_DIALOG_BOX';
export const CLOSE_INPUT_DIALOG_BOX = 'CLOSE_INPUT_DIALOG_BOX';

export const OPEN_ADD_SERVER_DIALOG_BOX = 'OPEN_ADD_SERVER_DIALOG_BOX';
export const CLOSE_ADD_SERVER_DIALOG_BOX = 'CLOSE_ADD_SERVER_DIALOG_BOX';

export const OPEN_ADD_FAVORITES_DIALOG_BOX = 'OPEN_ADD_FAVORITES_DIALOG_BOX';
export const CLOSE_ADD_FAVORITES_DIALOG_BOX = 'CLOSE_ADD_FAVORITES_DIALOG_BOX';

export const OPEN_ADD_ACCOUT_FORM_POPUP = 'OPEN_ADD_ACCOUT_FORM_POPUP';
export const CLOSE_ADD_ACCOUT_FORM_POPUP = 'CLOSE_ADD_ACCOUT_FORM_POPUP';

export const OPEN_FILE_STATUS_DIALOG_BOX = 'OPEN_FILE_STATUS_DIALOG_BOX';
export const CLOSE_FILE_STATUS_DIALOG_BOX = 'CLOSE_FILE_STATUS_DIALOG_BOX';

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case OPEN_CONFIRM_DIALOG_BOX:
				draft.confirm_dialog_box = {open: true, key: action.payload};
				break;
			case CLOSE_CONFIRM_DIALOG_BOX:
				draft.confirm_dialog_box = {open: false};
				break;

			case OPEN_WARNING_DIALOG_BOX:
				draft.warning_dialog_box = {open: true, key: action.payload};
				break;
			case CLOSE_WARNING_DIALOG_BOX:
				draft.warning_dialog_box = {open: false};
				break;

			case OPEN_DELETE_DIALOG_BOX: {
				draft.delete_dialog_box = {
					open: true,
					key: action.payload.key,
				};

				if (action.payload.uuid)
					draft.delete_dialog_box.uuid = action.payload.uuid;
				break;
			}
			case CLOSE_DELETE_DIALOG_BOX:
				draft.delete_dialog_box = {open: false};
				break;

			case OPEN_INPUT_DIALOG_BOX:
				draft.input_dialog_box = {open: true, key: action.payload.key};
				if (action.payload.uuid)
					draft.input_dialog_box.uuid = action.payload.uuid;
				break;
			case CLOSE_INPUT_DIALOG_BOX:
				draft.input_dialog_box = {open: false};
				break;

			case OPEN_SAVE_DIALOG_BOX:
				draft.save_dialog_box = {open: true, key: action.payload.key};
				if (action.payload.uuid)
					draft.save_dialog_box.uuid = action.payload.uuid;
				break;
			case CLOSE_SAVE_DIALOG_BOX:
				draft.save_dialog_box = {open: false};
				break;

			case OPEN_ADD_SERVER_DIALOG_BOX: {
				draft.add_server_dialog_box = {
					open: true,
					type: action.payload.type,
				};
				if (action.payload.type === 'edit')
					draft.add_server_dialog_box.id = action.payload.id;
				break;
			}
			case CLOSE_ADD_SERVER_DIALOG_BOX:
				draft.add_server_dialog_box = {open: false};
				break;

			case OPEN_ADD_FAVORITES_DIALOG_BOX: {
				draft.add_favorites_dialog_box = {
					open: true,
				};
				break;
			}
			case CLOSE_ADD_FAVORITES_DIALOG_BOX:
				draft.add_favorites_dialog_box = {open: false};
				break;

			case OPEN_ADD_ACCOUT_FORM_POPUP: {
				draft.account_form_popup = {
					open: true,
					key: action.payload.key,
				};
				if (action.payload.uuid)
					draft.account_form_popup.uuid = action.payload.uuid;
				break;
			}
			case CLOSE_ADD_ACCOUT_FORM_POPUP:
				draft.account_form_popup = {open: false};
				break;

			case OPEN_FILE_STATUS_DIALOG_BOX:
				draft.file_status_dialog_box = {
					open: true,
					key: action.payload.key,
					uuid: action.payload.uuid,
				};
				break;
			case CLOSE_FILE_STATUS_DIALOG_BOX:
				draft.file_status_dialog_box = {
					open: false,
				};
				break;

			default:
				break;
		}
	});
};

export default reducer;
