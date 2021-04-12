import produce from 'immer';

// action types
export const FIND_REQUEST = 'find/FIND_REQUEST';
export const FIND_SUCCESS = 'find/FIND_SUCCESS';
export const FIND_FAILURE = 'find/FIND_FAILURE';

//  actions
export const findToken = (params) => ({
	type: FIND_REQUEST,
	params,
});

// initial State
const initialState = {
	find: null,
	loading: false,
};

// reducer
const find = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case FIND_REQUEST:
				draft.loading = true;
				break;
			case FIND_SUCCESS:
				draft.find = action.data;
				draft.loading = false;
				break;
			case FIND_FAILURE:
				draft.loading = false;
				break;

			default:
				return state;
		}
	});

export default find;
