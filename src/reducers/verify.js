import produce from 'immer';

// action types
export const GET_VERIFY_REQUEST = 'verify/GET_VERIFY_REQUEST';
export const GET_VERIFY_SUCCESS = 'verify/GET_VERIFY_SUCCESS';
export const GET_VERIFY_FAILURE = 'verify/GET_VERIFY_FAILURE';

//  actions
export const getVerify = (params) => ({
	type: GET_VERIFY_REQUEST,
	params,
});

// initial State
const initialState = {
	verify: null,
	loading: false,
};

// reducer
const verify = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case GET_VERIFY_REQUEST:
				draft.loading = true;
				break;
			case GET_VERIFY_SUCCESS:
				draft.verify = action.data;
				draft.loading = false;
				break;
			case GET_VERIFY_FAILURE:
				draft.loading = false;
				break;

			default:
				return state;
		}
	});

export default verify;
