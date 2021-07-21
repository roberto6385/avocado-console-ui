import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import createTransform from 'redux-persist/es/createTransform';
import storageSession from 'redux-persist/lib/storage/session';
import storage from 'redux-persist/lib/storage';
import {createWhitelistFilter} from 'redux-persist-transform-filter';
import {parse, stringify} from 'flatted';

import user from './user';
import common from './common';
import ssh from './ssh';
import sftp from './sftp';
import popup from './popup';
import clientTicket from './auth/clientTicket';
import modify from './auth/modify';
import verify from './auth/verify';
import find from './auth/find';
import userTicket, {REVOKE_USER_TICKET_SUCCESS} from './auth/userTicket';

// export const transformCircular = createTransform(
// 	(inboundState, key) => stringify(inboundState),
// 	(outboundState, key) => parse(outboundState),
// );

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
	verify,
	find,
});

const rootReducer = (state, action) => {
	if (action.type === REVOKE_USER_TICKET_SUCCESS) {
		state = undefined;
	}
	return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
