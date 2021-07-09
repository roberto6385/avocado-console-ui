import produce from 'immer';
import {REFRESH_USER_TICKET_REQUEST} from './userTicket';

//  actions
export const getRefreshTicket = (params) => ({
	type: REFRESH_USER_TICKET_REQUEST,
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
			default:
				return state;
		}
	});

export default refreshTicket;
