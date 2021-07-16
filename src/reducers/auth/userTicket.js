import produce from 'immer';
// action types
export const GET_USER_TICKET_REQUEST = 'userTicket/GET_USER_TICKET_REQUEST';
export const GET_USER_TICKET_SUCCESS = 'userTicket/GET_USER_TICKET_SUCCESS';
export const GET_USER_TICKET_FAILURE = 'userTicket/GET_USER_TICKET_FAILURE';

export const REFRESH_USER_TICKET_REQUEST =
	'userTicket/REFRESH_USER_TICKET_REQUEST';
export const REFRESH_USER_TICKET_SUCCESS =
	'userTicket/REFRESH_USER_TICKET_SUCCESS';
export const REFRESH_USER_TICKET_FAILURE =
	'userTicket/GET_REFRESH_TICKET_FAILURE';

export const REVOKE_USER_TICKET_REQUEST =
	'userTicket/REVOKE_USER_TICKET_REQUEST';
export const REVOKE_USER_TICKET_SUCCESS =
	'userTicket/REVOKE_USER_TICKET_SUCCESS';
export const REVOKE_USER_TICKET_FAILURE =
	'userTicket/GET_REVOKE_TICKET_FAILURE';

//  actions
export const getUserTicket = (params) => ({
	type: GET_USER_TICKET_REQUEST,
	params,
});

export const revokeUserTicket = (params) => ({
	type: REVOKE_USER_TICKET_REQUEST,
	params,
});

// initial State
const initialState = {
	userTicket: null,
	userInfo: null,
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
				draft.userTicket = action.payload.data;
				draft.userInfo = action.payload.user;
				draft.loading = false;
				break;
			case GET_USER_TICKET_FAILURE:
				draft.loading = false;
				break;

			case REFRESH_USER_TICKET_REQUEST:
				draft.loading = true;
				break;
			case REFRESH_USER_TICKET_SUCCESS:
				draft.userTicket = Object.assign(draft.userTicket, action.data);
				draft.loading = false;
				break;
			case REFRESH_USER_TICKET_FAILURE:
				draft.loading = false;
				break;

			case REVOKE_USER_TICKET_REQUEST:
				draft.loading = true;
				break;
			case REVOKE_USER_TICKET_SUCCESS:
				draft.loading = false;
				draft.userTicket = null;
				draft.userInfo = null;
				break;
			case REVOKE_USER_TICKET_FAILURE:
				draft.loading = false;
				break;

			default:
				return state;
		}
	});

export default userTicket;
// action types
