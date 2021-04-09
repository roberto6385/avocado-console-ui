import {combineReducers} from 'redux';

import user from './user';
import common from './common';
import sftp from './sftp';
import ssht from './ssht';
import popup from './popup';

const rootReducer = combineReducers({
	user,
	common,
	sftp,
	ssht,
	popup,
});

export default rootReducer;
