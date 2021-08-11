import produce from 'immer';

// action types
export const CREATE_USER_ACCOUNT_REQUEST = 'CREATE_USER_ACCOUNT_REQUEST';
export const CREATE_USER_ACCOUNT_SUCCESS = 'CREATE_USER_ACCOUNT_SUCCESS';
export const CREATE_USER_ACCOUNT_FAILURE = 'CREATE_USER_ACCOUNT_FAILURE';

export const MODIFY_USER_ACCOUT_REQUEST = 'MODIFY_USER_ACCOUT_REQUEST';
export const MODIFY_USER_ACCOUT_SUCCESS = 'MODIFY_USER_ACCOUT_SUCCESS';
export const MODIFY_USER_ACCOUT_FAILURE = 'MODIFY_USER_ACCOUT_FAILURE';

export const DELETE_USER_ACCOUNT_REQUEST = 'DELETE_USER_ACCOUNT_REQUEST';
export const DELETE_USER_ACCOUNT_SUCCESS = 'DELETE_USER_ACCOUNT_SUCCESS';
export const DELETE_USER_ACCOUNT_FAILURE = 'DELETE_USER_ACCOUNT_FAILURE';

export const FIND_USER_BY_ID_REQUEST = 'FIND_USER_BY_ID_REQUEST';
export const FIND_USER_BY_ID_SUCCESS = 'FIND_USER_BY_ID_SUCCESS';
export const FIND_USER_BY_ID_FAILURE = 'FIND_USER_BY_ID_FAILURE';

export const FIND_USER_BY_UID_REQUEST = 'FIND_USER_BY_UID_REQUEST';
export const FIND_USER_BY_UID_SUCCESS = 'FIND_USER_BY_UID_SUCCESS';
export const FIND_USER_BY_UID_FAILURE = 'FIND_USER_BY_UID_FAILURE';

// initial State
const initialState = {
	user: null, //revoke success, get user success
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

			case FIND_USER_BY_ID_REQUEST:
				draft.loading = true;
				break;
			case FIND_USER_BY_ID_SUCCESS:
				draft.user = action.payload;
				draft.loading = false;
				break;
			case FIND_USER_BY_ID_FAILURE:
				draft.loading = false;
				break;

			default:
				return state;
		}
	});

export default user;
