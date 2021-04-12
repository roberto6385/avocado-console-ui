import produce from 'immer';

// action types
export const GET_ACTIVE_TOKEN_LIST_REQUEST =
	'activeToken/GET_ACTIVE_TOKEN_LIST_REQUEST';
export const GET_ACTIVE_TOKEN_LIST_SUCCESS =
	'activeToken/GET_ACTIVE_TOKEN_LIST_SUCCESS';
export const GET_ACTIVE_TOKEN_LIST_FAILURE =
	'activeToken/GET_ACTIVE_TOKEN_LIST_FAILURE';

//  actions
export const getActiveToken = (params) => ({
	type: GET_ACTIVE_TOKEN_LIST_REQUEST,
	params,
});

// initial State
const initialState = {
	activeToken: null,
	loading: false,
};

// reducer
const find = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case GET_ACTIVE_TOKEN_LIST_REQUEST:
				draft.loading = true;
				break;
			case GET_ACTIVE_TOKEN_LIST_SUCCESS:
				draft.activeToken = action.data;
				draft.loading = false;
				break;
			case GET_ACTIVE_TOKEN_LIST_FAILURE:
				draft.loading = false;
				break;

			default:
				return state;
		}
	});

export default find;
