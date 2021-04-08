import {combineReducers} from 'redux';

import user from './user';
import common from './common';
import sftp from './sftp';
import ssht from './ssht';

const rootReducer = combineReducers({
	user,
	common,
	sftp,
	ssht,
});

export default rootReducer;
