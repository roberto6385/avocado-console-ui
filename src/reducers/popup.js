import produce from 'immer';

export const initialState = {
	alert_popup: {open: false},
	refresh_popup: {open: false},
	warning_alert_popup: {open: false},
	input_popup: {open: false},
	save_popup: {open: false},
	add_server_form_popup: {open: false},
	account_form_popup: {open: false},
};

export const OPEN_ALERT_POPUP = 'OPEN_ALERT_POPUP';
export const CLOSE_ALERT_POPUP = 'CLOSE_ALERT_POPUP';

export const OPEN_REFRESH_POPUP = 'OPEN_REFRESH_POPUP';
export const CLOSE_REFRESH_POPUP = 'CLOSE_REFRESH_POPUP';

export const OPEN_WARNING_ALERT_POPUP = 'OPEN_WARNING_ALERT_POPUP';
export const CLOSE_WARNING_ALERT_POPUP = 'CLOSE_WARNING_ALERT_POPUP';

export const OPEN_INPUT_POPUP = 'OPEN_INPUT_POPUP';
export const CLOSE_INPUT_POPUP = 'CLOSE_INPUT_POPUP';

export const OPEN_SAVE_POPUP = 'OPEN_SAVE_POPUP';
export const CLOSE_SAVE_POPUP = 'CLOSE_SAVE_POPUP';

export const OPEN_ADD_SERVER_FORM_POPUP = 'OPEN_ADD_SERVER_FORM_POPUP';
export const CLOSE_ADD_SERVER_FORM_POPUP = 'CLOSE_ADD_SERVER_FORM_POPUP';

export const OPEN_ADD_ACCOUT_FORM_POPUP = 'OPEN_ADD_ACCOUT_FORM_POPUP';
export const CLOSE_ADD_ACCOUT_FORM_POPUP = 'CLOSE_ADD_ACCOUT_FORM_POPUP';

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case OPEN_ALERT_POPUP:
				console.log('OPEN ALERT POPUP');
				draft.alert_popup = {open: true, key: action.data};
				break;
			case CLOSE_ALERT_POPUP:
				console.log('CLOSE ALERT POPUP');
				draft.alert_popup = {open: false};
				break;

			case OPEN_REFRESH_POPUP:
				console.log('OPEN REFRESH POPUP');
				draft.refresh_popup = {open: true};
				break;
			case CLOSE_REFRESH_POPUP:
				console.log('CLOSE REFRESH POPUP');
				draft.refresh_popup = {open: false};
				break;

			case OPEN_WARNING_ALERT_POPUP: {
				draft.warning_alert_popup = {
					open: true,
					key: action.data.key,
				};

				if (action.data.uuid)
					draft.warning_alert_popup.uuid = action.data.uuid;
				break;
			}
			case CLOSE_WARNING_ALERT_POPUP:
				draft.warning_alert_popup = {open: false};
				break;

			case OPEN_INPUT_POPUP:
				draft.input_popup = {open: true, key: action.data.key};
				if (action.data.uuid) draft.input_popup.uuid = action.data.uuid;
				break;
			case CLOSE_INPUT_POPUP:
				draft.input_popup = {open: false};
				break;

			case OPEN_SAVE_POPUP:
				draft.save_popup = {open: true, key: action.data.key};
				if (action.data.uuid) draft.save_popup.uuid = action.data.uuid;
				break;
			case CLOSE_SAVE_POPUP:
				draft.save_popup = {open: false};
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

			case OPEN_ADD_ACCOUT_FORM_POPUP: {
				draft.account_form_popup = {
					open: true,
					key: action.data.key,
				};
				if (action.data.uuid)
					draft.account_form_popup.uuid = action.data.uuid;
				break;
			}
			case CLOSE_ADD_ACCOUT_FORM_POPUP:
				draft.account_form_popup = {open: false};
				break;

			default:
				break;
		}
	});
};

export default reducer;
