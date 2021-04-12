import {combineReducers} from 'redux';

import user from './user';
import common from './common';
import sftp from './sftp';
import ssht from './ssht';
import popup from './popup';

import clientTicket from './auth/clientTicket';
import userTicket from './auth/userTicket';
import refreshTicket from './auth/refreshTicket';
import verify from './auth/verify';
import revoke from './auth/revoke';

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
});

export default rootReducer;
