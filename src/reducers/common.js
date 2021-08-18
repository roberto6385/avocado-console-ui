import produce from 'immer';

//TODO:
// delete _
// clicked_server => selected
// minimize => is hide sidebar
// server => remote resources
// folder => remote resource groups
// account => user
// side_key => selected side bar key
// nav=> remote resources tree
// identity => accounts
// tab => terminal tabs
import {
	addDataOnNode,
	startDeleteingTree,
	startSearchingNode,
} from '../utils/redux';

export const initialState = {
	clicked_server: null,
	server_index: 4,
	folder_index: 2,

	current_nav_tab: 0,
	favorites: [],
	favorites_folder_index: 0,
	favoriteFolderRenamingKey: null,

	tempFavorites: [],
	selectedFavoriteItemOnDialogBox: null,
	tempFavoriteFolderIndex: 0,
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
};

export const ADD_FOLDER = 'ADD_FOLDER';
export const DELETE_SERVER_FOLDER = 'DELETE_SERVER_FOLDER';
export const SET_CLICKED_SERVER = 'SET_CLICKED_SERVER';

export const CHANGE_CURRENT_RESOURCE_KEY = 'common/CHANGE_CURRENT_RESOURCE_KEY';
export const CHANGE_IDENTITY_CHECKED = 'common/CHANGE_IDENTITY_CHECKED';
export const CHANGE_PROTOCOL = 'common/CHANGE_PROTOCOL';

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
const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			// case ADD_FOLDER: {
			// 	const data = {
			// 		type: 'folder',
			// 		id: draft.folder_index,
			// 		key: 'f_' + draft.folder_index.toString(),
			// 		name: action.payload,
			// 		contain: [],
			// 	};
			//
			// 	addDataOnNode(draft.nav, draft.clicked_server, data);
			//
			// 	draft.folder_index++;
			// 	break;
			// }

			// case ADD_FOLDER_ON_FAVORITES: {
			// 	const data = {
			// 		type: 'folder',
			// 		id: draft.favorites_folder_index,
			// 		key: 'f_' + draft.favorites_folder_index.toString(),
			// 		name: action.payload.name,
			// 		contain: [],
			// 	};
			//
			// 	if (action.payload.key === 'favorites')
			// 		addDataOnNode(draft.favorites, draft.clicked_server, data);
			//
			// 	draft.favoriteFolderRenamingKey = data.key;
			// 	draft.favorites_folder_index++;
			// 	break;
			// }

			// case SORT_SERVER_AND_FOLDER: {
			// 	// 이동할 데이터의 부모
			// 	const prevParent = startSearchingParentNode(
			// 		draft.nav,
			// 		draft.clicked_server,
			// 	);
			// 	// 이동할 데이터
			// 	const prev = startSearchingNode(
			// 		draft.nav,
			// 		draft.clicked_server,
			// 	);
			//
			// 	// 이동시킬 위치의 부모
			// 	let nextParent = startSearchingParentNode(
			// 		draft.nav,
			// 		action.payload.next.key,
			// 	);
			// 	// 이동시킬 위치
			// 	const node = startSearchingNode(
			// 		draft.nav,
			// 		action.payload.next.key,
			// 	);
			//
			// 	if (
			// 		prev === node ||
			// 		(prevParent === draft.nav &&
			// 			action.payload.next === 'toEdge')
			// 	)
			// 		return;
			//
			// 	let i = 1;
			// 	while (nextParent !== draft.nav) {
			// 		if (nextParent === prev) break;
			// 		i = i + 1;
			// 		nextParent = startSearchingParentNode(
			// 			draft.nav,
			// 			nextParent.key,
			// 		);
			// 	}
			//
			// 	if (
			// 		action.payload.next !== 'toEdge' &&
			// 		i !== action.payload.indent
			// 	)
			// 		return;
			//
			// 	if (action.payload.next === 'toEdge') {
			// 		// 가장 상위 위치에 데이터 추가
			// 		draft.nav.push(prev);
			//
			// 		// 부모에서 이동시킨 데이터 삭제
			// 		const index = prevParent.contain.indexOf(prev);
			// 		prevParent.contain.splice(index, 1);
			// 	} else {
			// 		// 이동시킬 위치에 삭제한 데이터 추가
			// 		if (node.contain) node.contain.push(prev);
			// 		else node.push(prev);
			//
			// 		// 부모에서 이동시킨 데이터 삭제
			// 		if (draft.nav.includes(prev)) {
			// 			const index = draft.nav.indexOf(prev);
			// 			draft.nav.splice(index, 1);
			// 		} else {
			// 			const index = prevParent.contain.indexOf(prev);
			// 			prevParent.contain.splice(index, 1);
			// 		}
			// 	}
			//
			// 	break;
			// }

			// case SAVE_CHANGES_ON_FAVORITES: {
			// 	draft.favorites = draft.tempFavorites;
			// 	draft.favorites_folder_index = draft.tempFavoriteFolderIndex;
			// 	break;
			// }

			// case CHANGE_NAVTAB:
			// 	draft.current_nav_tab = action.payload;
			// 	draft.clicked_server = null;
			// 	break;

			// case SORT_FAVORITE_RESOURCES: {
			// 	// 이동할 데이터의 부모
			// 	const prevParent = startSearchingParentNode(
			// 		draft.favorites,
			// 		draft.clicked_server,
			// 	);
			// 	// 이동할 데이터
			// 	const prev = startSearchingNode(
			// 		draft.favorites,
			// 		draft.clicked_server,
			// 	);
			//
			// 	// 이동시킬 위치의 부모
			// 	let nextParent = startSearchingParentNode(
			// 		draft.favorites,
			// 		action.payload.next.key,
			// 	);
			// 	// 이동시킬 위치
			// 	const node = startSearchingNode(
			// 		draft.favorites,
			// 		action.payload.next.key,
			// 	);
			//
			// 	if (
			// 		prev === node ||
			// 		(prevParent === draft.favorites &&
			// 			action.payload.next === 'toEdge')
			// 	)
			// 		return;
			//
			// 	let i = 1;
			// 	while (nextParent !== draft.favorites) {
			// 		if (nextParent === prev) break;
			// 		i = i + 1;
			// 		nextParent = startSearchingParentNode(
			// 			draft.favorites,
			// 			nextParent.key,
			// 		);
			// 	}
			//
			// 	if (
			// 		action.payload.next !== 'toEdge' &&
			// 		i !== action.payload.indent
			// 	)
			// 		return;
			//
			// 	if (action.payload.next === 'toEdge') {
			// 		draft.favorites.push(prev);
			//
			// 		// 부모에서 이동시킨 데이터 삭제
			// 		const index = prevParent.contain.indexOf(prev);
			// 		prevParent.contain.splice(index, 1);
			// 	} else {
			// 		// 이동시킬 위치에 삭제한 데이터 추가
			// 		if (node.contain) node.contain.push(prev);
			// 		else node.push(prev);
			//
			// 		// 부모에서 이동시킨 데이터 삭제
			// 		if (draft.favorites.includes(prev)) {
			// 			const index = draft.favorites.indexOf(prev);
			// 			draft.favorites.splice(index, 1);
			// 		} else {
			// 			const index = prevParent.contain.indexOf(prev);
			// 			prevParent.contain.splice(index, 1);
			// 		}
			// 	}
			//
			// 	draft.temp_favorites = draft.favorites;
			//
			// 	break;
			// }

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

			case CHANGE_FOLDER_NAME_ON_FAVORITES: {
				startSearchingNode(draft.favorites, action.payload.key).name =
					action.payload.name;

				draft.favoriteFolderRenamingKey = null;
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

			case CHANGE_CURRENT_RESOURCE_KEY:
				draft.current_resource_key = action.payload.key;
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

			// case DELETE_TEMP_FOLDER_ON_FAVORITES:
			// 	startDeleteingTree(draft.tempFavorites, action.payload);
			// 	break;

			default:
				break;
		}
	});
};

export default reducer;
