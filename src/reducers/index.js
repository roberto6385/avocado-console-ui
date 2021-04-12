import {combineReducers} from 'redux';

import user from './user';
import common from './common';
import sftp from './sftp';
import ssht from './ssht';
import popup from './popup';

import clientTicket from './clientTicket';
import userTicket from './userTicket';
import refreshTicket from './refreshTicket';
import verify from './verify';

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
});

export default rootReducer;
