import produce from 'immer';

export const initialState = {
	current_tab: null,
	current_nav_tab: 0, // nav에서 자원, 즐겨찾기
	clicked_server: null,
	cols: 1,
	minimize: false,
	server_index: 4,
	folder_index: 2,
	favorites_folder_index: 0,
	account: {account: '', name: '', email: ''},
	rightSideKey: '',
	theme: 0, // light === 0  and dark === 1 우선 redux로 구현
	lang: 'ko-KR', // language ko-KR - korean, en-US - english
	favorites: [],
	tempFavorites: [],
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
					type: 'folder',
					id: 2,
					key: 'f_2',
					name: 'test servers',
					contain: [
						{
							type: 'server',
							id: 5,
							key: 's_5',
							name: 'Test API',
							icon: 'aws',
						},
					],
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
		{
			id: 5,
			key: 's_5',
			name: 'Open API',
			host: 'ip-172-31-7-236.ap-northeast-2.compute.internal',
			protocol: 'SSH2',
			port: 22,
			icon: 'aws',
		},
	],
	// resource identity key
	currentResourceListKey: null,
	identity_index: 10,
	identity: [
		{
			id: 0,
			identityName: 'root',
			user: 'root',
			password: 'Netand141)',
			checked: true,
			type: 'Password',
			key: 's_0',
		},
		{
			id: 1,
			identityName: 'root',
			user: 'root',
			password: 'Netand141)',
			checked: true,
			type: 'Password',
			key: 's_1',
		},
		{
			id: 2,
			identityName: 'home',
			user: 'home',
			password: 'Netand141)',
			checked: false,
			type: 'Password',
			key: 's_1',
		},
		{
			id: 3,
			identityName: 'root',
			user: 'root',
			password: 'Netand141)',
			checked: true,
			type: 'Password',
			key: 's_2',
		},
		{
			id: 4,
			identityName: 'root',
			user: 'root',
			password: 'Netand141)',
			checked: true,
			type: 'Password',
			key: 's_3',
		},
		{
			id: 5,
			identityName: 'user',
			user: 'user',
			password: 'Netand141)',
			checked: false,
			type: 'Password',
			key: 's_3',
		},
		{
			id: 6,
			identityName: 'main',
			user: 'main',
			password: 'Netand141)',
			checked: false,
			type: 'Password',
			key: 's_3',
		},
		{
			id: 7,
			identityName: 'home',
			user: 'home',
			password: 'Netand141)',
			checked: false,
			type: 'Password',
			key: 's_3',
		},
		{
			id: 8,
			identityName: 'root',
			user: 'root',
			password: 'Netand141)',
			checked: true,
			type: 'Password',
			key: 's_4',
		},
		{
			id: 8,
			identityName: 'root',
			user: 'root',
			password: 'Netand141)',
			checked: true,
			type: 'Password',
			key: 's_5',
		},
	],
	tab: [],
};

export const ADD_FOLDER = 'ADD_FOLDER';
export const ADD_FAVORITES_FOLDER = 'ADD_FAVORITES_FOLDER';
export const SAVE_SERVER = 'SAVE_SERVER';
export const DELETE_SERVER_FOLDER = 'DELETE_SERVER_FOLDER';
export const CHANGE_SERVER_FOLDER_NAME = 'CHANGE_SERVER_FOLDER_NAME';
export const CHANGE_FAVORITES_FOLDER_NAME = 'CHANGE_FAVORITES_FOLDER_NAME';
export const SET_CLICKED_SERVER = 'SET_CLICKED_SERVER';
export const OPEN_TAB = 'OPEN_TAB';
export const SORT_TAB = 'SORT_TAB';
export const SORT_SERVER_AND_FOLDER = 'SORT_SERVER_AND_FOLDER';
export const SORT_FAVORITES_SERVER_AND_FOLDER =
	'SORT_FAVORITES_SERVER_AND_FOLDER';
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
export const BOOKMARKING = 'common/BOOKMARKING';
export const SAVE_FAVORITES = 'common/SAVE_FAVORITES';
export const UNDO_FAVORITES = 'common/UNDO_FAVORITES';

const fillTabs = (tab, max_display_tab, current_tab) => {
	if (tab.length === 0) {
		current_tab = null;
	} else {
		let visible_tab_length = tab.filter((x) => x.display).length;

		for (let i = 0; i < tab.length; i++) {
			if (visible_tab_length === max_display_tab) break;
			else if (visible_tab_length > max_display_tab) {
				if (tab[i].display && tab[i].uuid !== current_tab) {
					tab[i].display = false;
					visible_tab_length--;
				}
			} else if (visible_tab_length < max_display_tab) {
				if (!tab[i].display) {
					tab[i].display = true;
					visible_tab_length++;
				}
			}
		}

		if (tab.find((v) => v.uuid === current_tab && v.display) === undefined)
			current_tab = tab.find((x) => x.display).uuid;
	}
	return current_tab;
};

function searchTreeNode(node, key) {
	if (node.key === key) {
		return node;
	} else if (node.contain && node.contain.length > 0) {
		let result = null;
		for (let i = 0; !result && i < node.contain.length; i++) {
			result = searchTreeNode(node.contain[i], key);
		}
		return result;
	}
	return null;
}

function searchTreeStart(root, key) {
	for (let x of root) {
		let result = searchTreeNode(x, key);
		if (result !== null) return result;
	}
	return root;
}

function searchParentTreeNode(parent, node, key) {
	if (node.key === key) {
		return parent;
	} else if (node.contain && node.contain.length > 0) {
		let result = null;
		for (let i = 0; !result && i < node.contain.length; i++) {
			result = searchParentTreeNode(node, node.contain[i], key);
		}
		return result;
	}
	return null;
}

function searchServerTreePath(parent, node, key) {
	if (node.key === key) {
		return parent;
	} else if (node.contain && node.contain.length > 0) {
		let result = null;
		for (let i = 0; !result && i < node.contain.length; i++) {
			result = searchServerTreePath(node, node.contain[i], key);
		}
		return result;
	}
	return null;
}

function searchParentTreeStart(root, key) {
	for (let x of root) {
		let result = searchParentTreeNode(root, x, key);
		if (result !== null) return result;
	}
	return root;
}

function deleteTreeNode(parent, node, key) {
	if (node.key === key) {
		let index = parent.contain.findIndex((v) => v.key === key);
		parent.contain.splice(index, 1);
	} else if (node.contain && node.contain.length > 0) {
		for (let i = 0; i < node.contain.length; i++)
			deleteTreeNode(node, node.contain[i], key);
	}
}

function deleteTreeStart(root, key) {
	for (let i = 0; i < root.length; i++) {
		if (root[i].key === key) {
			root.splice(i, 1);
		} else deleteTreeNode(root, root[i], key);
	}
}

function deleteServerUnderTree(node, server) {
	for (let i = 0; i < node.contain.length; i++) {
		if (node.contain[i].key[0] === 's')
			server.splice(
				server.findIndex((v) => v.id === node.contain[i].id),
				1,
			);
		else deleteServerUnderTree(node.contain[i], server);
	}
}

function addDataOnNode(nav, clicked_server, data) {
	let node = null;
	if (!clicked_server) node = nav;
	else if (clicked_server[0] === 's')
		node = searchParentTreeStart(nav, clicked_server);
	else node = searchTreeStart(nav, clicked_server);

	if (node.contain) node.contain.push(data);
	else node.push(data);
}

const isValidFolderName = (folderArray, name) => {
	let pass = true;

	for (let i of folderArray) {
		if (i.type === 'folder') {
			if (i.name === name) return false;
			else if (i.contain.length > 0) {
				// eslint-disable-next-line no-unused-vars
				pass = pass && isValidFolderName(i.contain, name);
			}
		}
	}
	return pass;
};

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case ADD_FOLDER: {
				const data = {
					type: 'folder',
					id: draft.folder_index,
					key: 'f_' + draft.folder_index.toString(),
					name: action.data,
					contain: [],
				};

				draft.createdFolderInfo = data;

				addDataOnNode(draft.nav, draft.clicked_server, data);

				draft.folder_index++;
				break;
			}

			case ADD_FAVORITES_FOLDER: {
				const data = {
					type: 'folder',
					id: draft.favorites_folder_index,
					key: 'f_' + draft.favorites_folder_index.toString(),
					name: action.data,
					contain: [],
				};

				addDataOnNode(draft.tempFavorites, draft.clicked_server, data);

				draft.favorites_folder_index++;
				break;
			}

			case SORT_SERVER_AND_FOLDER: {
				// 이동할 데이터의 부모
				const prevParent = searchParentTreeStart(
					draft.nav,
					draft.clicked_server,
				);
				// 이동할 데이터
				const prev = searchTreeStart(draft.nav, draft.clicked_server);

				// 이동시킬 위치의 부모
				let nextParent = searchParentTreeStart(
					draft.nav,
					action.data.next.key,
				);
				// 이동시킬 위치
				const node = searchTreeStart(draft.nav, action.data.next.key);

				if (
					prev === node ||
					(prevParent === draft.nav && action.data.next === 'toEdge')
				)
					return;

				let i = 1;
				while (nextParent !== draft.nav) {
					if (nextParent === prev) break;
					i = i + 1;
					nextParent = searchParentTreeStart(
						draft.nav,
						nextParent.key,
					);
				}

				if (action.data.next !== 'toEdge' && i !== action.data.indent)
					return;

				if (action.data.next === 'toEdge') {
					console.log('밖으로');
					// let i = 1;
					// while (nextParent !== draft.nav) {
					// 	nextParent = searchParentTreeNode(
					// 		draft.nav,
					// 		nextParent.key,
					// 	);
					// 	i = i + 1;
					// }
					// if (action.data.indent !== i) {
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

			case SAVE_FAVORITES: {
				draft.favorites = draft.tempFavorites;
				break;
			}
			case UNDO_FAVORITES: {
				draft.tempFavorites = draft.favorites;
				break;
			}
			case SORT_FAVORITES_SERVER_AND_FOLDER: {
				// 이동할 데이터의 부모
				const prevParent = searchParentTreeStart(
					draft.favorites,
					draft.clicked_server,
				);
				// 이동할 데이터
				const prev = searchTreeStart(
					draft.favorites,
					draft.clicked_server,
				);

				// 이동시킬 위치의 부모
				let nextParent = searchParentTreeStart(
					draft.favorites,
					action.data.next.key,
				);
				// 이동시킬 위치
				const node = searchTreeStart(
					draft.favorites,
					action.data.next.key,
				);
				console.log('favorites bookmark move');
				console.log(prevParent);
				console.log(prev);
				console.log(nextParent);
				console.log(node);

				if (
					prev === node ||
					(prevParent === draft.favorites &&
						action.data.next === 'toEdge')
				)
					return;

				let i = 1;
				while (nextParent !== draft.favorites) {
					if (nextParent === prev) break;
					i = i + 1;
					nextParent = searchParentTreeStart(
						draft.favorites,
						nextParent.key,
					);
				}

				if (action.data.next !== 'toEdge' && i !== action.data.indent)
					return;

				if (action.data.next === 'toEdge') {
					// let i = 1;
					// while (nextParent !== draft.favorites) {
					// 	nextParent = searchParentTreeNode(
					// 		draft.favorites,
					// 		nextParent.key,
					// 	);
					// 	i = i + 1;
					// }
					// if (action.data.indent !== i) {
					// 	return;
					// }

					// 가장자리로 보내는지 아닌지 체크
					// 가장 상위 위치에 데이터 추가
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

				break;
			}

			case BOOKMARKING: {
				const parent = searchParentTreeStart(
					state.nav,
					action.data.key,
				);
				const index = draft.favorites.findIndex(
					(v) => JSON.stringify(v) === JSON.stringify(action.data),
				);
				console.log(index);
				if (index === -1) {
					// not exist
					draft.favorites.push(action.data);
				} else {
					//
					draft.favorites = state.favorites.filter(
						(v) =>
							JSON.stringify(v) !== JSON.stringify(action.data),
					);
				}
				draft.tempFavorites = draft.favorites;
				break;
			}

			case CHANGE_SERVER_FOLDER_NAME: {
				console.log(action.data);
				if (action.data.key[0] === 's') {
					const keyIndex = draft.server.findIndex(
						(v) => v.key === action.data.key,
					);
					const newServer = {
						...state.server[keyIndex],
						name: action.data.name,
					};

					draft.server.splice(keyIndex, 1, newServer);
				}

				searchTreeStart(draft.nav, action.data.key).name =
					action.data.name;

				draft.tab = draft.tab.map((v) => {
					if (v.server.key === action.data.key)
						return {
							...v,
							server: {...v.server, name: action.data.name},
						};
					else return v;
				});
				break;
			}

			case CHANGE_FAVORITES_FOLDER_NAME: {
				searchTreeStart(draft.tempFavorites, action.data.key).name =
					action.data.name;

				draft.tab = draft.tab.map((v) => {
					if (v.server.key === action.data.key)
						return {
							...v,
							server: {...v.server, name: action.data.name},
						};
					else return v;
				});
				break;
			}

			case EDIT_SERVER: {
				const index = state.server.findIndex(
					(v) => v.id === action.data.id,
				);
				const newServer = {
					...state.server[index],
					...action.data.data,
				};

				draft.server.splice(index, 1, newServer);

				searchTreeStart(draft.nav, newServer.key).name = newServer.name;

				draft.tab = draft.tab.map((v) => {
					if (v.server.key === newServer.key)
						return {...v, server: {...v.server, name: action.data}};
					else return v;
				});
				break;
			}

			case SAVE_ACCOUT: {
				draft.account = action.payload;
				break;
			}

			case SAVE_SERVER: {
				const data = {
					type: 'server',
					id: draft.server_index,
					key: 's_' + draft.server_index.toString(),
					name: action.data.name,
				};

				const identity = {
					id: draft.identity_index,
					identityName: 'Temp Identity Name',
					user: action.data.user,
					password: action.data.password,
					checked: true,
					type: action.data.auth,
					key: 's_' + draft.server_index.toString(),
				};

				addDataOnNode(draft.nav, draft.clicked_server, data);

				draft.identity.push(identity);
				draft.server.push({
					id: draft.server_index,
					key: 's_' + draft.server_index.toString(),
					...action.data,
				});
				draft.server_index++;
				draft.identity_index++;
				break;
			}
			case DELETE_SERVER_FOLDER: {
				console.log(draft.clicked_server);
				if (draft.clicked_server[0] === 's')
					draft.server = draft.server.filter(
						(v) => v.key !== draft.clicked_server,
					);
				else
					deleteServerUnderTree(
						searchTreeStart(draft.nav, draft.clicked_server),
						draft.server,
					);

				deleteTreeStart(draft.nav, draft.clicked_server);
				break;
			}

			case SET_CLICKED_SERVER:
				draft.clicked_server = action.data;
				break;

			case CHANGE_SIDEBAR_DISPLAY:
				draft.minimize = action.data;
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
				break;

			// case SAVE_ACCOUT:
			// 	draft.account.push({
			// 		id: draft.identity_index,
			// 		name: action.payload.identity,
			// 		username: action.payload.username,
			// 		type: action.payload.type,
			// 		key: action.payload.key,
			// 	});
			// 	draft.identity_index++;
			// 	break;

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
				draft.currentResourceListKey = action.payload.key;
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
					uuid: action.data.uuid,
					type: action.data.type,
					display: true,
					server: action.data.server,
				};
				//save new tab info
				if (action.data.prevUuid) {
					const index = draft.tab.findIndex(
						(v) => v.uuid === action.data.prevUuid,
					);
					draft.tab.splice(index, 0, new_tab);
				} else {
					draft.tab.push(new_tab);
				}
				//set current tab
				draft.current_tab = action.data.uuid;
				draft.current_tab = fillTabs(
					draft.tab,
					draft.cols === 1 ? 1 : draft.cols * 3,
					draft.current_tab,
				);
				break;
			}

			case SORT_TAB: {
				draft.tab.splice(action.data.oldOrder, 1);
				draft.tab.splice(action.data.newOrder, 0, action.data.newTab);
				break;
			}

			case CLOSE_TAB: {
				draft.tab = draft.tab.filter((v) => v.uuid !== action.data);
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
					draft.tab.findIndex((v) => v.uuid === action.data) !== -1
				) {
					draft.tab[
						draft.tab.findIndex((v) => v.uuid === action.data)
					].display = true;

					draft.current_tab = action.data;
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
				draft.cols = action.data.cols;

				draft.current_tab = fillTabs(
					draft.tab,
					action.data.cols === 1 ? 1 : draft.cols * 3,
					draft.current_tab,
				);
				break;
			}
			case CHANGE_CURRENT_TAB:
				draft.current_tab = action.data;
				break;

			case RIGHT_SIDE_KEY:
				draft.rightSideKey = action.payload;
				break;
			default:
				break;
		}
	});
};

export default reducer;
