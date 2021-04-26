import produce from 'immer';

export const initialState = {
	alert_popup: {open: false},
	add_server_form_popup: {open: false},
	confirm_popup: {open: false},
};

export const OPEN_ALERT_POPUP = 'OPEN_ALERT_POPUP';
export const CLOSE_ALERT_POPUP = 'CLOSE_ALERT_POPUP';
export const OPEN_ADD_SERVER_FORM_POPUP = 'OPEN_ADD_SERVER_FORM_POPUP';
export const CLOSE_ADD_SERVER_FORM_POPUP = 'CLOSE_ADD_SERVER_FORM_POPUP';
export const OPEN_CONFIRM_POPUP = 'OPEN_CONFIRM_POPUP';
export const CLOSE_CONFIRM_POPUP = 'CLOSE_CONFIRM_POPUP';

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case OPEN_ALERT_POPUP:
				draft.alert_popup = {open: true, key: action.data};
				break;

			case CLOSE_ALERT_POPUP:
				draft.alert_popup = {open: false};
				break;

			case OPEN_ADD_SERVER_FORM_POPUP: {
				draft.add_server_form_popup = {
					open: true,
					type: action.data.type,
				};
				if (action.data.type === 'edit')
					draft.add_server_form_popup.id = action.data.id;
				break;
			}
			case CLOSE_ADD_SERVER_FORM_POPUP:
				draft.add_server_form_popup = {open: false};
				break;

			case OPEN_CONFIRM_POPUP: {
				draft.confirm_popup = {
					open: true,
					key: action.data.key,
				};

				if (action.data.uuid) {
					draft.confirm_popup.uuid = action.data.uuid;
				}
				break;
			}
			case CLOSE_CONFIRM_POPUP:
				draft.confirm_popup = {open: false};
				break;

			default:
				break;
		}
	});
};

export default reducer;
