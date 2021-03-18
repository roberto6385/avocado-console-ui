import {combineReducers} from 'redux';

import common from './common';
import ssht from './ssht';

const rootReducer = combineReducers({
	common,
	ssht,
});

export default rootReducer;
