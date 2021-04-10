import produce from 'immer';

export const initialState = {
	me: null,
	UI_theme: 'Light',
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_UI_Theme = 'SET_UI_Theme';

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case LOGIN:
				draft.me = action.data;
				break;

			case LOGOUT:
				draft.me = null;
				break;

			case SET_UI_Theme:
				draft.UI_theme = action.data;
				break;

			default:
				break;
		}
	});
};

export default reducer;
