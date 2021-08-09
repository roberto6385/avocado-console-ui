import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import storage from 'redux-persist/lib/storage';
import {createWhitelistFilter} from 'redux-persist-transform-filter';

import common from './common';
import ssh from './ssh';
import sftp from './sftp';
import dialogBoxs from './dialogBoxs';
import clientTicket from './auth/clientTicket';
import user from './auth/user';
import userTicket, {REVOKE_USER_TICKET_SUCCESS} from './auth/userTicket';

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
	common: persistReducer(commonLocalPersistConfig, common),
	sftp,
	ssh: persistReducer(sshLocalPersistConfig, ssh),
	dialogBoxs,
	clientTicket,
	userTicket,
	user,
});

const rootReducer = (state, action) => {
	if (action.type === REVOKE_USER_TICKET_SUCCESS) {
		state = undefined;
	}
	return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
