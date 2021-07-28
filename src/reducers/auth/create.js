import produce from 'immer';
// action types
export const CREATE_USER_REQUEST = 'create/CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'create/CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'create/CREATE_USER_FAILURE';
//  actions
export const postCreateUser = (params) => ({
	type: CREATE_USER_REQUEST,
	params,
});

// initial State
const initialState = {
	user: null,
	loading: false,
};

// reducer
const create = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case CREATE_USER_REQUEST:
				draft.loading = true;
				break;
			case CREATE_USER_SUCCESS:
				draft.user = action.payload;
				draft.loading = false;
				break;
			case CREATE_USER_FAILURE:
				draft.loading = false;
				break;
			default:
				return state;
		}
	});

export default create;
