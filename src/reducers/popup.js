import produce from 'immer';

export const initialState = {
	alert_popup: {open: false},
};

export const OPEN_ALERT_POPUP = 'OPEN_ALERT_POPUP';
export const CLOSE_ALERT_POPUP = 'CLOSE_ALERT_POPUP';

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case OPEN_ALERT_POPUP:
				draft.alert_popup = {open: true, key: action.data};
				break;
			case CLOSE_ALERT_POPUP:
				draft.alert_popup = {open: false};
				break;
			default:
				break;
		}
	});
};

export default reducer;
