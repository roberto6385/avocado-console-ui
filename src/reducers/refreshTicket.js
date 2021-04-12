import produce from 'immer';

// action types
export const GET_REFRESH_TICKET_REQUEST =
	'refreshTicket/GET_REFRESH_TICKET_REQUEST';
export const GET_REFRESH_TICKET_SUCCESS =
	'refreshTicket/GET_REFRESH_TICKET_SUCCESS';
export const GET_REFRESH_TICKET_FAILURE =
	'refreshTicket/GET_REFRESH_TICKET_FAILURE';

//  actions
export const getRefreshTicket = (params) => ({
	type: GET_REFRESH_TICKET_REQUEST,
	params,
});

// initial State
const initialState = {
	refreshTicket: null,
	loading: false,
};

// reducer
const refreshTicket = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case GET_REFRESH_TICKET_REQUEST:
				draft.loading = true;
				break;
			case GET_REFRESH_TICKET_SUCCESS:
				draft.refreshTicket = action.data;
				draft.loading = false;
				break;
			case GET_REFRESH_TICKET_FAILURE:
				draft.loading = false;
				break;
			default:
				return state;
		}
	});

export default refreshTicket;
