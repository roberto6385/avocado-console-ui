import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import common from './common';
import ssh from './ssh';
import sftp from './sftp';
import dialogBoxs from './dialogBoxs';
import user from './auth/user';
import userTicket from './auth/userTicket';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import {createWhitelistFilter} from 'redux-persist-transform-filter';

export const userTicketFilter = createWhitelistFilter('userTicket', [
	'userTicket',
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

const rootReducer = combineReducers({
	common: persistReducer(commonLocalPersistConfig, common),
	sftp,
	ssh: persistReducer(sshLocalPersistConfig, ssh),
	dialogBoxs,
	userTicket,
	user,
});

export default persistReducer(persistConfig, rootReducer);
