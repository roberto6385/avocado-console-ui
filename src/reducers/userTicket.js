import produce from 'immer';

// action types
export const GET_USER_TICKET_REQUEST = 'userTicket/GET_USER_TICKET_REQUEST';
export const GET_USER_TICKET_SUCCESS = 'userTicket/GET_USER_TICKET_SUCCESS';
export const GET_USER_TICKET_FAILURE = 'userTicket/GET_USER_TICKET_FAILURE';

//  actions
export const getUserTicket = (params) => ({
	type: GET_USER_TICKET_REQUEST,
	params,
});

// initial State
const initialState = {
	userTicket: null,
	loading: false,
};

// reducer
const userTicket = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case GET_USER_TICKET_REQUEST:
				draft.loading = true;
				break;
			case GET_USER_TICKET_SUCCESS:
				draft.userTicket = action.data;
				draft.loading = false;
				break;
			case GET_USER_TICKET_FAILURE:
				draft.loading = false;
				break;
			default:
				return state;
		}
	});

export default userTicket;
