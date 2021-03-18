import {combineReducers} from 'redux';

import common from './common';

import sftp from './sftp';

import ssht from './ssht';

const rootReducer = combineReducers({
	common,
	sftp,
	ssht,
});

export default rootReducer;
