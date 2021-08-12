import produce from 'immer';
import {
	addDataOnNode,
	fillTabs,
	startDeleteingTree,
	startSearchingNode,
	startSearchingParentNode,
} from '../utils/redux';

export const initialState = {
	current_tab: null,
	current_nav_tab: 0, // nav에서 자원, 즐겨찾기
	clicked_server: null,
	cols: 1,
	minimize: false,
	server_index: 4,
	folder_index: 2,
	account: {account: '', name: '', email: ''},
	side_key: '',
	theme: 'light',
	lang: 'ko-KR', // language ko-KR - korean, en-US - english

	favorites: [],
	favorites_folder_index: 0,
	favoriteFolderRenamingKey: null,

	tempFavorites: [],
	selectedFavoriteItemOnDialogBox: null,
	tempFavoriteFolderIndex: null,
	tempFavoriteFolderRenamingKey: null,

	nav: [
		{
			type: 'folder',
			id: 0,
			key: 'f_0',
			name: 'aws servers',
			contain: [
				{
					type: 'server',
					id: 0,
					key: 's_0',
					name: 'Open API',
					icon: 'aws',
				},
				{
					type: 'server',
					id: 1,
					key: 's_1',
					name: 'IAM',
					icon: 'aws',
				},
				{
					type: 'server',
					id: 2,
					key: 's_2',
					name: 'Authorization',
					icon: 'aws',
				},
				{
					type: 'server',
					id: 3,
					key: 's_3',
					name: 'Bastion',
					icon: 'aws',
				},
			],
		},
		{
			type: 'folder',
			id: 1,
			key: 'f_1',
			name: 'kt servers',
			contain: [
				{
					type: 'server',
					id: 4,
					key: 's_4',
					name: 'kt pilot',
					icon: 'linux',
				},
			],
		},
	],
	// TODO : id, name, icon 제거
	server: [
		{
			id: 0,
			key: 's_0',
			name: 'Open API',
			host: 'ip-172-31-7-236.ap-northeast-2.compute.internal',
			protocol: 'SSH2',
			port: 22,
			icon: 'aws',
		},
		{
			id: 1,
			key: 's_1',
			name: 'IAM',
			host: 'ip-172-31-8-134.ap-northeast-2.compute.internal',
			protocol: 'SSH2',
			port: 22,
			icon: 'aws',
		},
		{
			id: 2,
			key: 's_2',
			name: 'Authorization',
			host: 'ip-172-31-5-58.ap-northeast-2.compute.internal',
			protocol: 'SSH2',
			port: 22,
			icon: 'aws',
		},
		{
			id: 3,
			key: 's_3',
			name: 'Bastion',
			host: 'ip-172-31-1-65.ap-northeast-2.compute.internal',
			protocol: 'SSH2',
			port: 22,
			icon: 'aws',
		},
		{
			id: 4,
			key: 's_4',
			name: 'kt pilot',
			host: '211.253.10.9',
			protocol: 'SSH2',
			port: 10022,
			icon: 'linux',
		},
	],
	// resource identity key
	current_resource_key: null,
	identity_index: 10,
	identity: [
		{
			id: 0,
			identity_name: 'root',
			user: 'root',
			password: 'Netand141)',
			checked: true,
			type: 'Password',
			key: 's_0',
		},
		{
			id: 1,
			identity_name: 'root',
			user: 'root',
			password: 'Netand141)',
			checked: true,
			type: 'Password',
			key: 's_1',
		},
		{
			id: 2,
			identity_name: 'home',
			user: 'home',
			password: 'Netand141)',
			checked: false,
			type: 'Password',
			key: 's_1',
		},
		{
			id: 3,
			identity_name: 'root',
			user: 'root',
			password: 'Netand141)',
			checked: true,
			type: 'Password',
			key: 's_2',
		},
		{
			id: 4,
			identity_name: 'root',
			user: 'root',
			password: 'Netand141)',
			checked: true,
			type: 'Password',
			key: 's_3',
		},
		{
			id: 5,
			identity_name: 'user',
			user: 'user',
			password: 'Netand141)',
			checked: false,
			type: 'Password',
			key: 's_3',
		},
		{
			id: 6,
			identity_name: 'main',
			user: 'main',
			password: 'Netand141)',
			checked: false,
			type: 'Password',
			key: 's_3',
		},
		{
			id: 7,
			identity_name: 'home',
			user: 'home',
			password: 'Netand141)',
			checked: false,
			type: 'Password',
			key: 's_3',
		},
		{
			id: 8,
			identity_name: 'root',
			user: 'root',
			password: 'Netand141)',
			checked: true,
			type: 'Password',
			key: 's_4',
		},
	],
	tab: [],
};

export const ADD_FOLDER = 'ADD_FOLDER';
export const ADD_SERVER = 'ADD_SERVER';
export const DELETE_SERVER_FOLDER = 'DELETE_SERVER_FOLDER';
export const CHANGE_SERVER_FOLDER_NAME = 'CHANGE_SERVER_FOLDER_NAME';
export const SET_CLICKED_SERVER = 'SET_CLICKED_SERVER';
export const OPEN_TAB = 'OPEN_TAB';
export const SORT_TAB = 'SORT_TAB';
export const SORT_SERVER_AND_FOLDER = 'SORT_SERVER_AND_FOLDER';
export const CLOSE_TAB = 'CLOSE_TAB';
export const CHANGE_VISIBLE_TAB = 'CHANGE_VISIBLE_TAB';
export const CHANGE_NUMBER_OF_COLUMNS = 'CHANGE_NUMBER_OF_COLUMNS';
export const CHANGE_CURRENT_TAB = 'CHANGE_CURRENT_TAB';
export const CHANGE_SIDEBAR_DISPLAY = 'CHANGE_SIDEBAR_DISPLAY';
export const EDIT_SERVER = 'EDIT_SERVER';

export const RIGHT_SIDE_KEY = 'common/RIGHT_SIDE_KEY';
export const DELETE_ACCOUT = 'common/DELETE_ACCOUT';
export const ACCOUT_CONTROL_ID = 'common/ACCOUT_CONTROL_ID';
export const CHANGE_CURRENT_RESOURCE_KEY = 'common/CHANGE_CURRENT_RESOURCE_KEY';
export const CHANGE_GENERAL_THEME = 'common/CHANGE_GENERAL_THEME';
export const CHANGE_LANGUAGE = 'common/CHANGE_LANGUAGE';
export const CHANGE_IDENTITY_CHECKED = 'common/CHANGE_IDENTITY_CHECKED';
export const CHANGE_PROTOCOL = 'common/CHANGE_PROTOCOL';
export const SAVE_ACCOUT = 'common/SAVE_ACCOUT';

export const CHANGE_NAVTAB = 'common/CHANGE_NAVTAB';

export const ADD_FAVORITE_SERVER = 'ADD_FAVORITE_SERVER';
export const DELETE_FAVORITE_SERVER = 'DELETE_FAVORITE_SERVER';

export const ADD_FOLDER_ON_FAVORITES = 'ADD_FOLDER_ON_FAVORITES';
export const CHANGE_FOLDER_NAME_ON_FAVORITES =
	'CHANGE_FOLDER_NAME_ON_FAVORITES';
export const CHANGE_FAVORITE_FOLDER_RENMAING_KEY =
	'CHANGE_FAVORITE_FOLDER_RENMAING_KEY';
export const SORT_FAVORITE_RESOURCES = 'SORT_FAVORITE_RESOURCES';

export const INIT_TEMP_FAVORITES = 'INIT_TEMP_FAVORITES';
export const SET_TEMP_FAVORITES = 'SET_TEMP_FAVORITES';
export const CHANGE_SELEECTED_TEMP_FAVORITE = 'CHANGE_SELEECTED_TEMP_FAVORITE';
export const ADD_TEMP_FOLDER_ON_FAVORITES = 'ADD_TEMP_FOLDER_ON_FAVORITES';
export const CHANGE_TEMP_FOLDER_NAME_ON_FAVORITES =
	'CHANGE_TEMP_FOLDER_NAME_ON_FAVORITES';
export const DELETE_TEMP_FOLDER_ON_FAVORITES =
	'DELETE_TEMP_FOLDER_ON_FAVORITES';
export const SAVE_CHANGES_ON_FAVORITES = 'SAVE_CHANGES_ON_FAVORITES';
export const CHANGE_TEMP_FAVORITE_FOLDER_RENMAING_KEY =
	'CHANGE_TEMP_FAVORITE_FOLDER_RENMAING_KEY';
export const SORT_TEMP_FAVORITE_RESOURCES = 'SORT_TEMP_FAVORITE_RESOURCES';

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case ADD_FOLDER: {
				const data = {
					type: 'folder',
					id: draft.folder_index,
					key: 'f_' + draft.folder_index.toString(),
					name: action.payload,
					contain: [],
				};

				addDataOnNode(draft.nav, draft.clicked_server, data);

				draft.folder_index++;
				break;
			}

			case ADD_FOLDER_ON_FAVORITES: {
				const data = {
					type: 'folder',
					id: draft.favorites_folder_index,
					key: 'f_' + draft.favorites_folder_index.toString(),
					name: action.payload.name,
					contain: [],
				};

				if (action.payload.key === 'favorites')
					addDataOnNode(draft.favorites, draft.clicked_server, data);

				draft.favoriteFolderRenamingKey = data.key;
				draft.favorites_folder_index++;
				break;
			}

			case SORT_SERVER_AND_FOLDER: {
				// 이동할 데이터의 부모
				const prevParent = startSearchingParentNode(
					draft.nav,
					draft.clicked_server,
				);
				// 이동할 데이터
				const prev = startSearchingNode(
					draft.nav,
					draft.clicked_server,
				);

				// 이동시킬 위치의 부모
				let nextParent = startSearchingParentNode(
					draft.nav,
					action.payload.next.key,
				);
				// 이동시킬 위치
				const node = startSearchingNode(
					draft.nav,
					action.payload.next.key,
				);

				if (
					prev === node ||
					(prevParent === draft.nav &&
						action.payload.next === 'toEdge')
				)
					return;

				let i = 1;
				while (nextParent !== draft.nav) {
					if (nextParent === prev) break;
					i = i + 1;
					nextParent = startSearchingParentNode(
						draft.nav,
						nextParent.key,
					);
				}

				if (
					action.payload.next !== 'toEdge' &&
					i !== action.payload.indent
				)
					return;

				if (action.payload.next === 'toEdge') {
					console.log('밖으로');
					// let i = 1;
					// while (nextParent !== draft.nav) {
					// 	nextParent = searchParentNode(
					// 		draft.nav,
					// 		nextParent.key,
					// 	);
					// 	i = i + 1;
					// }
					// if (action.payload.indent !== i) {
					// 	return;
					// }

					// 가장자리로 보내는지 아닌지 체크
					// 가장 상위 위치에 데이터 추가
					draft.nav.push(prev);

					// 부모에서 이동시킨 데이터 삭제
					const index = prevParent.contain.indexOf(prev);
					prevParent.contain.splice(index, 1);
				} else {
					// 이동시킬 위치에 삭제한 데이터 추가
					if (node.contain) node.contain.push(prev);
					else node.push(prev);

					// 부모에서 이동시킨 데이터 삭제
					if (draft.nav.includes(prev)) {
						const index = draft.nav.indexOf(prev);
						draft.nav.splice(index, 1);
					} else {
						const index = prevParent.contain.indexOf(prev);
						prevParent.contain.splice(index, 1);
					}
				}

				break;
			}

			case SAVE_CHANGES_ON_FAVORITES: {
				draft.favorites = draft.tempFavorites;
				draft.favorites_folder_index = draft.tempFavoriteFolderIndex;
				break;
			}

			case SORT_FAVORITE_RESOURCES: {
				// 이동할 데이터의 부모
				const prevParent = startSearchingParentNode(
					draft.favorites,
					draft.clicked_server,
				);
				// 이동할 데이터
				const prev = startSearchingNode(
					draft.favorites,
					draft.clicked_server,
				);

				// 이동시킬 위치의 부모
				let nextParent = startSearchingParentNode(
					draft.favorites,
					action.payload.next.key,
				);
				// 이동시킬 위치
				const node = startSearchingNode(
					draft.favorites,
					action.payload.next.key,
				);

				if (
					prev === node ||
					(prevParent === draft.favorites &&
						action.payload.next === 'toEdge')
				)
					return;

				let i = 1;
				while (nextParent !== draft.favorites) {
					if (nextParent === prev) break;
					i = i + 1;
					nextParent = startSearchingParentNode(
						draft.favorites,
						nextParent.key,
					);
				}

				if (
					action.payload.next !== 'toEdge' &&
					i !== action.payload.indent
				)
					return;

				if (action.payload.next === 'toEdge') {
					draft.favorites.push(prev);

					// 부모에서 이동시킨 데이터 삭제
					const index = prevParent.contain.indexOf(prev);
					prevParent.contain.splice(index, 1);
				} else {
					// 이동시킬 위치에 삭제한 데이터 추가
					if (node.contain) node.contain.push(prev);
					else node.push(prev);

					// 부모에서 이동시킨 데이터 삭제
					if (draft.favorites.includes(prev)) {
						const index = draft.favorites.indexOf(prev);
						draft.favorites.splice(index, 1);
					} else {
						const index = prevParent.contain.indexOf(prev);
						prevParent.contain.splice(index, 1);
					}
				}

				draft.temp_favorites = draft.favorites;

				break;
			}

			case ADD_FAVORITE_SERVER: {
				const index = draft.server.findIndex(
					(x) => x.key === action.payload,
				);

				draft.favorites.push({
					type: 'server',
					id: draft.server[index].id,
					key: draft.server[index].key,
					name: draft.server[index].name,
					icon: draft.server[index].icon,
				});
				break;
			}

			case DELETE_FAVORITE_SERVER:
				startDeleteingTree(draft.favorites, action.payload);
				break;

			case CHANGE_SERVER_FOLDER_NAME: {
				console.log(action.payload);
				if (action.payload.key[0] === 's') {
					const keyIndex = draft.server.findIndex(
						(v) => v.key === action.payload.key,
					);
					const newServer = {
						...state.server[keyIndex],
						name: action.payload.name,
					};

					draft.server.splice(keyIndex, 1, newServer);
				}

				startSearchingNode(draft.nav, action.payload.key).name =
					action.payload.name;

				draft.tab = draft.tab.map((v) => {
					if (v.server.key === action.payload.key)
						return {
							...v,
							server: {...v.server, name: action.payload.name},
						};
					else return v;
				});
				break;
			}

			case CHANGE_FOLDER_NAME_ON_FAVORITES: {
				startSearchingNode(draft.favorites, action.payload.key).name =
					action.payload.name;

				draft.favoriteFolderRenamingKey = null;
				break;
			}

			case EDIT_SERVER: {
				const index = state.server.findIndex(
					(v) => v.id === action.payload.id,
				);
				const newServer = {
					...state.server[index],
					...action.payload.data,
				};

				draft.server.splice(index, 1, newServer);

				startSearchingNode(draft.nav, newServer.key).name =
					newServer.name;

				draft.tab = draft.tab.map((v) => {
					if (v.server.key === newServer.key)
						return {
							...v,
							server: {...v.server, name: action.payload},
						};
					else return v;
				});
				break;
			}

			case SAVE_ACCOUT: {
				draft.account = action.payload;
				break;
			}

			case ADD_SERVER: {
				const data = {
					type: 'server',
					id: draft.server_index,
					key: 's_' + draft.server_index.toString(),
					name: action.payload.name,
				};

				const identity = {
					id: draft.identity_index,
					identity_name: 'Temp Identity Name',
					user: action.payload.user,
					password: action.payload.password,
					checked: true,
					type: action.payload.auth,
					key: 's_' + draft.server_index.toString(),
				};

				addDataOnNode(draft.nav, draft.clicked_server, data);

				draft.identity.push(identity);
				draft.server.push({
					id: draft.server_index,
					key: 's_' + draft.server_index.toString(),
					...action.payload,
				});
				draft.server_index++;
				draft.identity_index++;
				break;
			}
			case DELETE_SERVER_FOLDER: {
				if (draft.clicked_server[0] === 's') {
					draft.server = draft.server.filter(
						(v) => v.key !== draft.clicked_server,
					);
				}

				startDeleteingTree(draft.server, draft.clicked_server);
				startDeleteingTree(draft.favorites, draft.clicked_server);
				break;
			}

			case SET_CLICKED_SERVER:
				draft.clicked_server = action.payload;
				break;

			case CHANGE_SIDEBAR_DISPLAY:
				draft.minimize = action.payload;
				break;

			case CHANGE_PROTOCOL:
				draft.server.find(
					(v) => v.key === action.payload.key,
				).protocol = action.payload.protocol;
				break;

			case CHANGE_IDENTITY_CHECKED:
				draft.identity = [
					...state.identity.filter(
						(v) =>
							v !== action.payload.prev &&
							v !== action.payload.next,
					),
					{...action.payload.prev, checked: false},
					{...action.payload.next, checked: true},
				].sort(function (a, b) {
					return a['id'] - b['id'];
				});

				break;

			case CHANGE_NAVTAB:
				draft.current_nav_tab = action.payload;
				draft.clicked_server = null;
				break;

			// case DELETE_ACCOUT:
			// 	draft.account = draft.account
			// 		.slice()
			// 		.filter((it) => it.id !== action.payload.id);
			//
			// 	break;

			// case ACCOUT_CONTROL_ID:
			// 	draft.accountListControlId = action.payload.id;
			// 	break;

			case CHANGE_CURRENT_RESOURCE_KEY:
				draft.current_resource_key = action.payload.key;
				break;

			// case ACCOUT_CHECKLIST:
			// 	draft.accountCheckList = action.payload.check;
			// 	break;

			case CHANGE_GENERAL_THEME:
				draft.theme = action.payload.theme;
				break;

			case CHANGE_LANGUAGE:
				draft.lang = action.payload.language;
				break;

			case OPEN_TAB: {
				//fill in new tab info
				const new_tab = {
					uuid: action.payload.uuid,
					type: action.payload.type,
					display: true,
					server: action.payload.server,
				};
				//save new tab info
				if (action.payload.prevUuid) {
					if (action.payload.prevIndex > draft.tab.length) {
						draft.tab.push(new_tab);
					} else {
						draft.tab.splice(action.payload.prevIndex, 0, new_tab);
					}
				} else {
					draft.tab.push(new_tab);
				}
				//set current tab
				draft.current_tab = action.payload.uuid;
				draft.current_tab = fillTabs(
					draft.tab,
					draft.cols === 1 ? 1 : draft.cols * 3,
					draft.current_tab,
				);
				break;
			}

			case SORT_TAB: {
				draft.tab.splice(action.payload.oldOrder, 1);
				draft.tab.splice(
					action.payload.newOrder,
					0,
					action.payload.newTab,
				);
				break;
			}

			case CLOSE_TAB: {
				draft.tab = draft.tab.filter((v) => v.uuid !== action.payload);
				//set current tab
				draft.current_tab = fillTabs(
					draft.tab,
					draft.cols === 1 ? 1 : draft.cols * 3,
					draft.current_tab,
				);
				break;
			}

			case CHANGE_VISIBLE_TAB: {
				if (
					draft.tab.length > 0 &&
					draft.tab.findIndex((v) => v.uuid === action.payload) !== -1
				) {
					draft.tab[
						draft.tab.findIndex((v) => v.uuid === action.payload)
					].display = true;

					draft.current_tab = action.payload;
					draft.current_tab = fillTabs(
						draft.tab,
						draft.cols === 1 ? 1 : draft.cols * 3,
						draft.current_tab,
					);
				} else {
					draft.current_tab = null;
				}

				break;
			}

			case CHANGE_NUMBER_OF_COLUMNS: {
				draft.cols = action.payload.cols;

				draft.current_tab = fillTabs(
					draft.tab,
					action.payload.cols === 1 ? 1 : draft.cols * 3,
					draft.current_tab,
				);
				break;
			}
			case CHANGE_CURRENT_TAB:
				draft.current_tab = action.payload;
				break;

			case RIGHT_SIDE_KEY:
				draft.side_key = action.payload;
				break;

			case CHANGE_SELEECTED_TEMP_FAVORITE:
				draft.selectedFavoriteItemOnDialogBox = action.payload;
				break;

			case ADD_TEMP_FOLDER_ON_FAVORITES: {
				const data = {
					type: 'folder',
					id: draft.tempFavoriteFolderIndex,
					key: 'f_' + draft.tempFavoriteFolderIndex.toString(),
					name: action.payload.name,
					contain: [],
				};

				addDataOnNode(
					draft.tempFavorites,
					draft.selectedFavoriteItemOnDialogBox,
					data,
				);

				draft.tempFavoriteFolderRenamingKey = data.key;
				draft.tempFavoriteFolderIndex++;
				break;
			}

			case SET_TEMP_FAVORITES:
				draft.tempFavoriteFolderIndex = null;
				draft.tempFavorites = null;
				draft.tempFavoriteFolderRenamingKey = null;
				draft.selectedFavoriteItemOnDialogBox = null;
				break;

			case INIT_TEMP_FAVORITES:
				draft.tempFavoriteFolderIndex = draft.favorites_folder_index;
				draft.tempFavorites = draft.favorites;
				break;

			case CHANGE_FAVORITE_FOLDER_RENMAING_KEY:
				if (action.payload) {
					draft.favoriteFolderRenamingKey = action.payload;
					draft.clicked_server = action.payload;
				} else {
					draft.favoriteFolderRenamingKey = null;
					draft.clicked_server = null;
				}
				break;

			case CHANGE_TEMP_FAVORITE_FOLDER_RENMAING_KEY:
				if (action.payload) {
					draft.tempFavoriteFolderRenamingKey = action.payload;
					draft.selectedFavoriteItemOnDialogBox = action.payload;
				} else {
					draft.tempFavoriteFolderRenamingKey = null;
					draft.selectedFavoriteItemOnDialogBox = null;
				}
				break;

			case CHANGE_TEMP_FOLDER_NAME_ON_FAVORITES:
				{
					startSearchingNode(
						draft.tempFavorites,
						action.payload.key,
					).name = action.payload.name;

					draft.tempFavoriteFolderRenamingKey = null;
				}
				break;

			case DELETE_TEMP_FOLDER_ON_FAVORITES:
				startDeleteingTree(draft.tempFavorites, action.payload);
				break;

			default:
				break;
		}
	});
};

export default reducer;

//사용되지 않는 기능들
/** Notification
 notification_index: 3,
 notification: [
 {
			id: 0,
			message: 'ssh connection',
			date: 'Mon Jul 19 2021 17:10:23 GMT+0900 (일본 표준시)',
			confirm: true,
		},
 {
			id: 1,
			message: 'ssh connection',
			date: 'Mon Jul 19 2021 17:10:23 GMT+0900 (일본 표준시)',
			confirm: false,
		},
 {
			id: 2,
			message: 'sftp connection',
			date: 'Mon Jul 23 2021 18:06:00 GMT+0900 (일본 표준시)',
			confirm: false,
		},
 ],

 case ADD_NOTIFICATION:
	if (draft.notification.length > 30) draft.notification.shift();
draft.notification.push({
	id: draft.notification_index++,
	message: action.payload,
	date: Date.now(),
	confirm: false,
});
break;
**/
