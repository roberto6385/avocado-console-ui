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
import refreshTicket from './auth/refreshTicket';
import verify from './auth/verify';
import revoke from './auth/revoke';
import find from './auth/find';
import {createWhitelistFilter} from 'redux-persist-transform-filter';

export const transformCircular = createTransform(
	(inboundState, key) => stringify(inboundState),
	(outboundState, key) => parse(outboundState),
);

//userTicket.accesstoken => 저장가능
export const userTicketFilter = createWhitelistFilter('userTicket', [
	'userTicket',
]);

const persistConfig = {
	key: 'root',
	storage: storageSession,
	whitelist: ['userTicket'],
	transforms: [
		userTicketFilter,
		// createTransform(
		// 	(state) =>
		// 		Object.assign({}, state, {
		// 			userTicket: state.userTicket,
		// 		}),
		// 	{
		// 		whitelist: 'userTicket',
		// 	},
		// ),
	],
};

const sshLocalPersistConfig = {
	key: 'sshLocal',
	storage: storage,
	whitelist: ['ssh_history'],
	transforms: [],
};

const rootReducer = combineReducers({
	user,
	common,
	sftp,
	ssh: persistReducer(sshLocalPersistConfig, ssh),
	popup,
	clientTicket,
	userTicket,
	refreshTicket,
	verify,
	revoke,
	find,
});

export default persistReducer(persistConfig, rootReducer);
