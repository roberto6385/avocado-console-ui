import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import createTransform from 'redux-persist/es/createTransform';
import storage from 'redux-persist/lib/storage/session';
import {parse, stringify} from 'flatted';

import user from './user';
import common from './common';
import ssht from './ssh';
import sftp from './sftp';
import popup from './popup';
import clientTicket from './auth/clientTicket';
import userTicket from './auth/userTicket';
import refreshTicket from './auth/refreshTicket';
import verify from './auth/verify';
import revoke from './auth/revoke';
import find from './auth/find';

export const transformCircular = createTransform(
	(inboundState, key) => stringify(inboundState),
	(outboundState, key) => parse(outboundState),
);

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['userTicket'],
	transforms: [transformCircular],
};

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
	find,
});

export default persistReducer(persistConfig, rootReducer);
