import {combineReducers} from 'redux';

import user from './user';
import common from './common';
import sftp from './sftp';
import ssht from './ssht';
import userTicket from './userTicket';

const rootReducer = combineReducers({
	user,
	common,
	sftp,
	ssht,
	userTicket,
});

export default rootReducer;
