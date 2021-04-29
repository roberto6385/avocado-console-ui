import {combineReducers} from 'redux';

import user from './user';
import common from './common';
import ssht from './ssht';
import sftp from './sftp';
import popup from './popup';

import clientTicket from './auth/clientTicket';
import userTicket from './auth/userTicket';
import refreshTicket from './auth/refreshTicket';
import verify from './auth/verify';
import revoke from './auth/revoke';
import find from './auth/find';

const rootReducer = combineReducers({
	user,
	common,
	sftp,
	ssht,
	popup,
	clientTicket,
	userTicket,
	refreshTicket,
	verify,
	revoke,
	find,
});

export default rootReducer;
