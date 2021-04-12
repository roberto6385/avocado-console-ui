import produce from 'immer';

// action types
export const GET_CLIENT_TICKET_REQUEST = 'userTicket/GET_CLIENT_TICKET_REQUEST';
export const GET_CLIENT_TICKET_SUCCESS = 'userTicket/GET_CLIENT_TICKET_SUCCESS';
export const GET_CLIENT_TICKET_FAILURE = 'userTicket/GET_CLIENT_TICKET_FAILURE';

//  actions
export const getClientTicket = (params) => ({
	type: GET_CLIENT_TICKET_REQUEST,
	params,
});

// initial State
const initialState = {
	clientTicket: null,
	loading: false,
};

// reducer
const clientTicket = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case GET_CLIENT_TICKET_REQUEST:
				draft.loading = true;
				break;
			case GET_CLIENT_TICKET_SUCCESS:
				draft.clientTicket = action.data;
				draft.loading = false;
				break;
			case GET_CLIENT_TICKET_FAILURE:
				draft.loading = false;
				break;
			default:
				return state;
		}
	});

export default clientTicket;
