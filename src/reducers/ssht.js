import produce from 'immer';

export const initialState = {
	font_size: 15,
};

export const SSHT_INCREASE_FONT_SIZE = 'SSHT_INCREASE_FONT_SIZE';
export const SSHT_DECREASE_FONT_SIZE = 'SSHT_DECREASE_FONT_SIZE';

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case SSHT_INCREASE_FONT_SIZE:
				draft.font_size++;
				break;

			case SSHT_DECREASE_FONT_SIZE:
				draft.font_size--;
				break;

			default:
				break;
		}
	});
};

export default reducer;
