import produce from 'immer';
// action types
export const DELETE_ACCOUNT_REQUEST = 'create/DELETE_ACCOUNT_REQUEST';
export const DELETE_ACCOUNT_SUCCESS = 'create/DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAILURE = 'create/DELETE_ACCOUNT_FAILURE';
//  actions
export const postDeleteAccount = (params) => ({
	type: DELETE_ACCOUNT_REQUEST,
	params,
});

// initial State
const initialState = {
	loading: false,
};

// reducer
const deleteAccount = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case DELETE_ACCOUNT_REQUEST:
				draft.loading = true;
				break;
			case DELETE_ACCOUNT_SUCCESS:
				draft.loading = false;
				break;
			case DELETE_ACCOUNT_FAILURE:
				draft.loading = false;
				break;
			default:
				return state;
		}
	});

export default deleteAccount;
