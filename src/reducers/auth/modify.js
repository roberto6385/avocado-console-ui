import produce from 'immer';
// action types
export const PUT_MODIFY_REQUEST = 'userTicket/PUT_MODIFY_REQUEST';
export const PUT_MODIFY_SUCCESS = 'userTicket/PUT_MODIFY_SUCCESS';
export const PUT_MODIFY_FAILURE = 'userTicket/PUT_MODIFY_FAILURE';

//  actions
export const putModify = (params) => ({
	type: PUT_MODIFY_REQUEST,
	params,
});

// initial State
const initialState = {
	loading: false,
};

// reducer
const modify = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case PUT_MODIFY_REQUEST:
				draft.loading = true;
				break;
			case PUT_MODIFY_SUCCESS:
				draft.loading = false;
				break;
			case PUT_MODIFY_FAILURE:
				draft.loading = false;
				break;
			default:
				return state;
		}
	});

export default modify;
// action types
