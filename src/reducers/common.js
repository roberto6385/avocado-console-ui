import produce from 'immer';

export const initialState = {
	me: null,
	current_tab: null,
	clicked_server: null,
	max_display_tab: 1,
	cols: 1,
	minimize: false,

	server_index: 4,
	folder_index: 5,
	nav: [
		{
			type: 'folder',
			id: 0,
			key: 'f_0',
			name: 'Folder1',
			contain: [
				{
					type: 'server',
					id: 0,
					key: 's_0',
					name: 'Server1',
				},
				{
					type: 'server',
					id: 1,
					key: 's_1',
					name: 'Server2',
				},
			],
		},
		{
			type: 'folder',
			id: 1,
			key: 'f_1',
			name: 'Folder2',
			contain: [
				{
					type: 'server',
					id: 2,
					key: 's_2',
					name: 'Server3',
				},
			],
		},
		{
			type: 'folder',
			id: 2,
			key: 'f_2',
			name: 'Folder3',
			contain: [
				{
					type: 'folder',
					id: 3,
					key: 'f_3',
					name: 'Folder4',
					contain: [],
				},
				{
					type: 'folder',
					id: 4,
					key: 'f_4',
					name: 'Folder5',
					contain: [
						{
							type: 'server',
							id: 3,
							key: 's_3',
							name: 'Server4',
						},
					],
				},
			],
		},
	],

	server: [
		{
			id: 0,
			key: 's_0',
			name: 'Server1',
			host: '211.253.10.9',
			user: 'root',
			password: 'Netand141)',
			port: 10021,
		},
		{
			id: 1,
			key: 's_1',
			name: 'Server2',
			host: '211.253.10.9',
			user: 'root',
			password: 'Netand141)',
			port: 10022,
		},
		{
			id: 2,
			key: 's_2',
			name: 'Server3',
			host: '211.253.10.9',
			user: 'root',
			password: 'Netand141)',
			port: 10023,
		},
		{
			id: 3,
			key: 's_3',
			name: 'Server4',
			host: '211.253.10.9',
			user: 'root',
			password: 'Netand141)',
			port: 10024,
		},
	],

	tab_index: 0,
	tab: [],
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ADD_FOLDER = 'ADD_FOLDER';
export const SAVE_SERVER = 'SAVE_SERVER';
export const DELETE_SERVER = 'DELETE_SERVER';
export const SET_CLICKED_SERVER = 'SET_CLICKED_SERVER';
export const OPEN_TAB = 'OPEN_TAB';
export const SORT_TAB = 'SORT_TAB';
export const CLOSE_TAB = 'CLOSE_TAB';
export const CHANGE_VISIBLE_TAB = 'CHANGE_VISIBLE_TAB';
export const CHANGE_NUMBER_OF_COLUMNS = 'CHANGE_NUMBER_OF_COLUMNS';
export const CHANGE_CURRENT_TAB = 'CHANGE_CURRENT_TAB';
export const CHANGE_SIDEBAR_DISPLAY = 'CHANGE_SIDEBAR_DISPLAY';

const reducer = (state = initialState, action) => {
	const fillTabs = (tab, max_display_tab, current_tab) => {
		if (tab.length === 0) {
			current_tab = null;
		} else {
			let visible_tab_length = tab.filter((x) => x.display).length;

			for (let i = 0; i < tab.length; i++) {
				if (visible_tab_length === max_display_tab) break;
				else if (visible_tab_length > max_display_tab) {
					if (tab[i].display && tab[i].id !== current_tab) {
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

			if (
				tab.find((v) => v.id === current_tab && v.display) === undefined
			)
				current_tab = tab.find((x) => x.display).id;
		}
		return current_tab;
	};

	return produce(state, (draft) => {
		switch (action.type) {
			case LOGIN:
				draft.me = action.data;
				break;
			case LOGOUT:
				draft.me = null;
				break;

			case ADD_FOLDER: {
				if (draft.clicked_server === null) {
					draft.nav.push({
						type: 'folder',
						id: draft.folder_index,
						key: 'f_' + draft.folder_index.toString(),
						name: 'Folder' + (draft.folder_index + 1).toString(),
						contain: [],
					});
				}
				break;
			}

			case SAVE_SERVER:
				draft.server.push({id: draft.server_index, ...action.data});
				draft.server_index++;
				break;

			case DELETE_SERVER: {
				draft.tab = draft.tab.filter(
					(v) => v.server.id !== draft.clicked_server,
				);

				draft.server = draft.server.filter(
					(v) => v.id !== draft.clicked_server,
				);

				draft.current_tab = fillTabs(
					draft.tab,
					draft.max_display_tab,
					draft.current_tab,
				);
				draft.clicked_server = null;
				break;
			}

			case SET_CLICKED_SERVER:
				draft.clicked_server = action.data;
				break;

			case CHANGE_SIDEBAR_DISPLAY:
				draft.minimize = action.data;
				break;

			case OPEN_TAB: {
				draft.tab.push({
					id: draft.tab_index,
					type: action.data.type,
					display: true,
					server: {
						id: action.data.id,
						name: draft.server.find((v) => v.id === action.data.id)
							.name,
					},
					socket: {
						ws: action.data.ws,
						uuid: action.data.uuid,
					},
				});
				draft.current_tab = draft.tab_index;

				draft.current_tab = fillTabs(
					draft.tab,
					draft.max_display_tab,
					draft.current_tab,
				);
				draft.tab_index++;
				break;
			}

			case SORT_TAB: {
				draft.tab.splice(action.data.oldOrder, 1);
				draft.tab.splice(action.data.newOrder, 0, action.data.newTab);
				break;
			}

			case CLOSE_TAB: {
				draft.tab = draft.tab.filter((v) => v.id !== action.data);

				draft.current_tab = fillTabs(
					draft.tab,
					draft.max_display_tab,
					draft.current_tab,
				);
				break;
			}

			case CHANGE_VISIBLE_TAB: {
				draft.tab[
					draft.tab.findIndex((v) => v.id == action.data)
				].display = true;
				draft.current_tab = action.data;

				draft.current_tab = fillTabs(
					draft.tab,
					draft.max_display_tab,
					draft.current_tab,
				);
				break;
			}

			case CHANGE_NUMBER_OF_COLUMNS: {
				draft.cols = action.data.cols;
				draft.max_display_tab = action.data.max;

				draft.current_tab = fillTabs(
					draft.tab,
					draft.max_display_tab,
					draft.current_tab,
				);
				break;
			}
			case CHANGE_CURRENT_TAB:
				draft.current_tab = action.data;
				break;

			default:
				break;
		}
	});
};

export default reducer;
