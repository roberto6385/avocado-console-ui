import produce from 'immer';

// action types
export const GET_REVOKE_REQUEST = 'revoke/GET_REVOKE_REQUEST';
export const GET_REVOKE_SUCCESS = 'revoke/GET_REVOKE_SUCCESS';
export const GET_REVOKE_FAILURE = 'revoke/GET_REVOKE_FAILURE';

//  actions
export const getRevoke = (params) => ({
	type: GET_REVOKE_REQUEST,
	params,
});

// initial State
const initialState = {
	revoke: null,
	loading: false,
};

// reducer
const revoke = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case GET_REVOKE_REQUEST:
				draft.loading = true;
				break;
			case GET_REVOKE_SUCCESS:
				draft.revoke = action.data;
				draft.loading = false;
				break;
			case GET_REVOKE_FAILURE:
				draft.loading = false;
				break;

			default:
				return state;
		}
	});

export default revoke;
