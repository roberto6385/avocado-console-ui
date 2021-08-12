import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import common from './common';
import ssh from './ssh';
import sftp from './sftp';
import dialogBoxs from './dialogBoxs';
import {USER_RESOURCE, userResourceReducer} from './api/userResource';
import {AUTH, authReducer} from './api/auth';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import {createWhitelistFilter} from 'redux-persist-transform-filter';

export const authFilter = createWhitelistFilter(AUTH, [AUTH]);

const persistConfig = {
	key: 'root',
	storage: storageSession,
	whitelist: [AUTH],
	transforms: [authFilter],
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
	[AUTH]: authReducer,
	[USER_RESOURCE]: userResourceReducer,
});

export default persistReducer(persistConfig, rootReducer);
