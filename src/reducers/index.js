import {persistReducer} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';
import {SSH, sshReducer} from './ssh';
import sftp from './sftp';
import {DIALOG_BOX, dialogBoxReducer} from './dialogBoxs';
import {USER_RESOURCE, userResourceReducer} from './api/userResource';
import {AUTH, authAction, authReducer} from './api/auth';
import {SETTING, settingReducer} from './setting';
import {TAB_BAR, tabBarReducer} from './tabBar';
import {REMOTE_RESOURCE, remoteResourceReducer} from './remoteResource';
import {FAVORITES, favoritesReducer} from './favorites';
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

const favoritePersistConfig = {
	key: 'favorite',
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
const appReducer = combineReducers({
	sftp,
	[SSH]: persistReducer(sshLocalPersistConfig, sshReducer),
	[DIALOG_BOX]: dialogBoxReducer,
	[AUTH]: authReducer,
	[USER_RESOURCE]: userResourceReducer,
	[TAB_BAR]: tabBarReducer,
	[SETTING]: persistReducer(settingPersistConfig, settingReducer),
	[REMOTE_RESOURCE]: remoteResourceReducer,
	[FAVORITES]: persistReducer(favoritePersistConfig, favoritesReducer),
});

const rootReducer = (state, action) => {
	if (action.type === authAction.revokeTokenSuccess().type) {
		return appReducer(undefined, action);
	}
	return appReducer(state, action);
};
export default persistReducer(persistConfig, rootReducer);
