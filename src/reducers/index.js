import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import createTransform from 'redux-persist/es/createTransform';
import storageSession from 'redux-persist/lib/storage/session';
import storage from 'redux-persist/lib/storage';

import {parse, stringify} from 'flatted';

import user from './user';
import common from './common';
import ssh from './ssh';
import sftp from './sftp';
import popup from './popup';
import clientTicket from './auth/clientTicket';
import userTicket from './auth/userTicket';
import modify from './auth/modify';
import refreshTicket from './auth/refreshTicket';
import verify from './auth/verify';
import revoke, {GET_REVOKE_SUCCESS} from './auth/revoke';
import find from './auth/find';
import {createWhitelistFilter} from 'redux-persist-transform-filter';

export const transformCircular = createTransform(
	(inboundState, key) => stringify(inboundState),
	(outboundState, key) => parse(outboundState),
);

//userTicket.accesstoken => 저장가능
export const userTicketFilter = createWhitelistFilter('userTicket', [
	'userTicket',
	'userInfo',
]);

const persistConfig = {
	key: 'root',
	storage: storageSession,
	whitelist: ['userTicket'],
	transforms: [userTicketFilter],
};

const commonLocalPersistConfig = {
	key: 'commonLocal',
	storage: storage,
	whitelist: ['theme'],
};

const sshLocalPersistConfig = {
	key: 'sshLocal',
	storage: storage,
	whitelist: ['ssh_history', 'snippets', 'snippents_index'],
};

const appReducer = combineReducers({
	user,
	common: persistReducer(commonLocalPersistConfig, common),
	sftp,
	ssh: persistReducer(sshLocalPersistConfig, ssh),
	popup,
	clientTicket,
	userTicket,
	modify,
	refreshTicket,
	verify,
	revoke,
	find,
});

const rootReducer = (state, action) => {
	// if (action.type === GET_REVOKE_SUCCESS) {
	// 	return appReducer(undefined, action);
	// }
	return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
