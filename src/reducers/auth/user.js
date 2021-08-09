import produce from 'immer';

// action types
export const CREATE_USER_ACCOUNT_REQUEST = 'create/CREATE_USER_ACCOUNT_REQUEST';
export const CREATE_USER_ACCOUNT_SUCCESS = 'create/CREATE_USER_ACCOUNT_SUCCESS';
export const CREATE_USER_ACCOUNT_FAILURE = 'create/CREATE_USER_ACCOUNT_FAILURE';
export const MODIFY_USER_ACCOUT_REQUEST = 'MODIFY_USER_ACCOUT_REQUEST';
export const MODIFY_USER_ACCOUT_SUCCESS = 'MODIFY_USER_ACCOUT_SUCCESS';
export const MODIFY_USER_ACCOUT_FAILURE = 'MODIFY_USER_ACCOUT_FAILURE';
export const DELETE_USER_ACCOUNT_REQUEST = 'DELETE_USER_ACCOUNT_REQUEST';
export const DELETE_USER_ACCOUNT_SUCCESS = 'DELETE_USER_ACCOUNT_SUCCESS';
export const DELETE_USER_ACCOUNT_FAILURE = 'DELETE_USER_ACCOUNT_FAILURE';

//  actions
export const putModifyUserAccout = (params) => ({
	type: MODIFY_USER_ACCOUT_REQUEST,
	params,
});

export const postDeleteUserAccount = (params) => ({
	type: DELETE_USER_ACCOUNT_REQUEST,
	params,
});

export const postCreateUserAccout = (params) => ({
	type: CREATE_USER_ACCOUNT_REQUEST,
	params,
});

// initial State
const initialState = {
	loading: false,
};

// reducer
const user = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case CREATE_USER_ACCOUNT_REQUEST:
				draft.loading = true;
				break;
			case CREATE_USER_ACCOUNT_SUCCESS:
				draft.user = action.payload;
				draft.loading = false;
				break;
			case CREATE_USER_ACCOUNT_FAILURE:
				draft.loading = false;
				break;
			case DELETE_USER_ACCOUNT_REQUEST:
				draft.loading = true;
				break;
			case DELETE_USER_ACCOUNT_SUCCESS:
				draft.loading = false;
				break;
			case DELETE_USER_ACCOUNT_FAILURE:
				draft.loading = false;
				break;
			case MODIFY_USER_ACCOUT_REQUEST:
				draft.loading = true;
				break;
			case MODIFY_USER_ACCOUT_SUCCESS:
				draft.loading = false;
				break;
			case MODIFY_USER_ACCOUT_FAILURE:
				draft.loading = false;
				break;
			default:
				return state;
		}
	});

export default user;
