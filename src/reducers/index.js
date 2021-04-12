import {combineReducers} from 'redux';

import user from './user';
import common from './common';
import sftp from './sftp';
import ssht from './ssht';
import clientTicket from './clientTicket';
import userTicket from './userTicket';

const rootReducer = combineReducers({
	user,
	common,
	sftp,
	ssht,
	clientTicket,
	userTicket,
});

export default rootReducer;
