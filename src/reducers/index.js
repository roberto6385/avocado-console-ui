import {persistReducer} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';
import common from './common';
import ssh from './ssh';
import sftp from './sftp';
import {DIALOG_BOX, dialogBoxReducer} from './dialogBoxs';
import {USER_RESOURCE, userResourceReducer} from './api/userResource';
import {AUTH, authReducer} from './api/auth';
import {SETTING, settingReducer} from './setting';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import {createWhitelistFilter} from 'redux-persist-transform-filter';

export const authFilter = createWhitelistFilter(AUTH, ['userData']);
export const userResourceFilter = createWhitelistFilter(USER_RESOURCE, [
	'data',
]);

const persistConfig = {
	key: 'root',
	storage: storageSession,
	whitelist: [AUTH, USER_RESOURCE],
	transforms: [authFilter, userResourceFilter],
};

const commonLocalPersistConfig = {
	key: 'commonLocal',
	storage: storage,
	whitelist: ['favorites', 'favorites_folder_index'],
};

const settingPersistConfig = {
	key: 'setting',
	storage: storage,
	whitelist: ['theme', 'language'],
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
	[DIALOG_BOX]: dialogBoxReducer,
	[AUTH]: authReducer,
	[USER_RESOURCE]: userResourceReducer,
	[SETTING]: persistReducer(settingPersistConfig, settingReducer),
});

export default persistReducer(persistConfig, rootReducer);
