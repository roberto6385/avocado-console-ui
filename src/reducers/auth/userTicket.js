import produce from 'immer';

//Authorization Client 인증
export const GET_CLIENT_TICKET_REQUEST = 'GET_CLIENT_TICKET_REQUEST';
export const GET_CLIENT_TICKET_SUCCESS = 'GET_CLIENT_TICKET_SUCCESS';
export const GET_CLIENT_TICKET_FAILURE = 'GET_CLIENT_TICKET_FAILURE';

//Authorization User 인증
export const GET_USER_TICKET_REQUEST = 'GET_USER_TICKET_REQUEST';
export const GET_USER_TICKET_SUCCESS = 'GET_USER_TICKET_SUCCESS';
export const GET_USER_TICKET_FAILURE = 'GET_USER_TICKET_FAILURE';

//Authorization Refresh Token
export const REFRESH_USER_TICKET_REQUEST = 'REFRESH_USER_TICKET_REQUEST';
export const REFRESH_USER_TICKET_SUCCESS = 'REFRESH_USER_TICKET_SUCCESS';
export const REFRESH_USER_TICKET_FAILURE = 'REFRESH_USER_TICKET_FAILURE';

//Authorization Revoke
export const REVOKE_USER_TICKET_REQUEST = 'REVOKE_USER_TICKET_REQUEST';
export const REVOKE_USER_TICKET_SUCCESS = 'REVOKE_USER_TICKET_SUCCESS';
export const REVOKE_USER_TICKET_FAILURE = 'REVOKE_USER_TICKET_FAILURE';

//Authorization Verify
export const VARIFY_USER_TICKET_REQUEST = 'VARIFY_USER_TICKET_REQUEST';
export const VARIFY_USER_TICKET_SUCCESS = 'VARIFY_USER_TICKET_SUCCESS';
export const VARIFY_USER_TICKET_FAILURE = 'VARIFY_USER_TICKET_FAILURE';

//Authorization Find
export const FIND_VALID_USER_TICKET_REQUEST = 'FIND_VALID_USER_TICKET_REQUEST';
export const FIND_VALID_USER_TICKET_SUCCESS = 'FIND_VALID_USER_TICKET_SUCCESS';
export const FIND_VALID_USER_TICKET_FAILURE = 'FIND_VALID_USER_TICKET_FAILURE';

//Authorization Alternative
export const ALTERNATIVE_TICKET_REQUEST = 'ALTERNATIVE_TICKET_REQUEST';
export const ALTERNATIVE_TICKET_SUCCESS = 'ALTERNATIVE_TICKET_SUCCESS';
export const ALTERNATIVE_TICKET_FAILURE = 'ALTERNATIVE_TICKET_FAILURE';

// alternative with google
export const AUTH_WITH_GOOGLE_REQUEST = 'AUTH_WITH_GOOGLE_REQUEST';
export const AUTH_WITH_GOOGLE_SUCCESS = 'AUTH_WITH_GOOGLE_SUCCESS';
export const AUTH_WITH_GOOGLE_FAILURE = 'AUTH_WITH_GOOGLE_FAILURE';

// initial State
const initialState = {
	clientTicket: null,
	userTicket: null,
	loading: false,
	alternative: null,
};

// reducer
const userTicket = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case GET_CLIENT_TICKET_REQUEST:
				draft.loading = true;
				break;
			case GET_CLIENT_TICKET_SUCCESS:
				draft.clientTicket = action.payload;
				draft.loading = false;
				break;
			case GET_CLIENT_TICKET_FAILURE:
				draft.loading = false;
				break;

			case GET_USER_TICKET_REQUEST:
				draft.loading = true;
				break;
			case GET_USER_TICKET_SUCCESS:
				draft.userTicket = action.payload;
				draft.loading = false;
				break;
			case GET_USER_TICKET_FAILURE:
				draft.loading = false;
				break;

			case REFRESH_USER_TICKET_REQUEST:
				draft.loading = true;
				break;
			case REFRESH_USER_TICKET_SUCCESS:
				draft.userTicket = Object.assign(
					draft.userTicket,
					action.payload,
				);
				draft.loading = false;
				break;
			case REFRESH_USER_TICKET_FAILURE:
				draft.loading = false;
				break;

			case VARIFY_USER_TICKET_REQUEST:
				draft.loading = true;
				break;
			case VARIFY_USER_TICKET_SUCCESS:
				draft.loading = false;
				break;
			case VARIFY_USER_TICKET_FAILURE:
				draft.loading = false;
				break;

			case REVOKE_USER_TICKET_REQUEST:
				draft.loading = true;
				break;
			case REVOKE_USER_TICKET_SUCCESS:
				draft.loading = false;
				draft.userTicket = null;
				break;
			case REVOKE_USER_TICKET_FAILURE:
				draft.loading = false;
				break;

			case FIND_VALID_USER_TICKET_REQUEST:
				draft.loading = true;
				break;
			case FIND_VALID_USER_TICKET_SUCCESS:
				draft.loading = false;
				break;
			case FIND_VALID_USER_TICKET_FAILURE:
				draft.loading = false;
				break;

			case ALTERNATIVE_TICKET_REQUEST:
				draft.loading = true;
				break;
			case ALTERNATIVE_TICKET_SUCCESS:
				draft.loading = false;
				break;
			case ALTERNATIVE_TICKET_FAILURE:
				draft.loading = false;
				break;

			case AUTH_WITH_GOOGLE_REQUEST:
				draft.loading = true;
				break;
			case AUTH_WITH_GOOGLE_SUCCESS:
				draft.alternative = action.payload;
				draft.loading = false;
				break;
			case AUTH_WITH_GOOGLE_FAILURE:
				draft.loading = false;
				break;

			default:
				return state;
		}
	});

export default userTicket;
// action types
