import produce from 'immer';

export const initialState = {
	font: 'Arial, sans-serif',
	font_size: 15,
	search_mode: false,
};

export const SSHT_SET_FONT = 'SSHT_SET_FONT';
export const SSHT_INCREASE_FONT_SIZE = 'SSHT_INCREASE_FONT_SIZE';
export const SSHT_DECREASE_FONT_SIZE = 'SSHT_DECREASE_FONT_SIZE';
export const SET_SEARCH_MODE = 'SET_SEARCH_MODE';

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case SSHT_SET_FONT:
				draft.font = action.data;
				break;

			case SSHT_INCREASE_FONT_SIZE:
				draft.font_size++;
				break;

			case SSHT_DECREASE_FONT_SIZE:
				draft.font_size--;
				break;

			case SET_SEARCH_MODE:
				draft.search_mode = !draft.search_mode;
				break;

			default:
				break;
		}
	});
};

export default reducer;
