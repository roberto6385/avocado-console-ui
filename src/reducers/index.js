import {combineReducers} from 'redux';

import user from './user';
import common from './common';

import 'bootstrap/dist/css/bootstrap.min.css';

const rootReducer = combineReducers({
	user,
	common,
});

export default rootReducer;
