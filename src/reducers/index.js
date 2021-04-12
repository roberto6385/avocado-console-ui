import {combineReducers} from 'redux';

import user from './user';
import common from './common';
import sftp from './sftp';
import ssht from './ssht';
import clientTicket from './clientTicket';

const rootReducer = combineReducers({
	user,
	common,
	sftp,
	ssht,
	clientTicket,
});

export default rootReducer;
