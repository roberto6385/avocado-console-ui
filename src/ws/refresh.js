import {REFRESH_USER_TICKET_REQUEST} from '../reducers/auth/userTicket';
import base64 from 'base-64';

export const checkToken = (dispatch) => {
	const token = localStorage.getItem('token');
	if (
		Date.now() - token.userTicket.expires_in * 1000 + 50 * 60 * 1000 >
		Date.parse(token.userTicket.create_date)
	) {
		const encodeData = base64.encode(`${'web'}:${'123456789'}`);

		dispatch({
			type: REFRESH_USER_TICKET_REQUEST,
			params: {
				refresh_token: token.userTicket.refresh_token,
				Authorization: 'Basic ' + encodeData,
			},
		});
	}
};
