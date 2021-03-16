import produce from 'immer';

export const initialState = {
	current_tab: null,
	clicked_server: null,
	max_display_tab: 1,
	server_index: 3,
	server: [
		{
			id: 0,
			name: 'Server1',
			host: '211.253.10.9',
			user: 'root',
			password: 'Netand141)',
			port: 10021,
		},
		{
			id: 1,
			name: 'Server2',
			host: '211.253.10.9',
			user: 'root',
			password: 'Netand141)',
			port: 10022,
		},
		{
			id: 2,
			name: 'Server3',
			host: '211.253.10.9',
			user: 'root',
			password: 'Netand141)',
			port: 10031,
		},
	],

	tab_index: 0,
	tab: [],
};

export const SAVE_SERVER = 'SAVE_SERVER';
export const DELETE_SERVER = 'DELETE_SERVER';
export const SET_CLICKED_SERVER = 'SET_CLICKED_SERVER';
export const OPEN_TAB = 'OPEN_TAB';
export const CLOSE_TAB = 'CLOSE_TAB';
export const CHANGE_VISIBLE_TAB = 'CHANGE_VISIBLE_TAB';
export const CHANGE_NUMBER_OF_VISIBLE_TAB = 'CHANGE_NUMBER_OF_VISIBLE_TAB';

// const vis = (tab, max_display_tab, current_tab) => {
// 	let visible_tab_length = tab.filter((x) => x.display === true).length;
//
// 	for (let i = 0; i < tab.length; i++) {
// 		if (visible_tab_length === max_display_tab) break;
// 		if (tab[i].display === false) {
// 			tab[i].display = true;
// 			visible_tab_length++;
// 		}
// 	}
//
// 	if (visible_tab_length === 0) current_tab = null;
// 	else if (
// 		tab.filter((v) => v.id === current_tab && v.display === true).length ===
// 		0
// 	)
// 		current_tab = tab.find((x) => x.display === true).id;
// };

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case SAVE_SERVER:
				draft.server.push({id: draft.server_index, ...action.data});
				draft.server_index++;
				break;

			case DELETE_SERVER: {
				draft.tab = draft.tab.filter(
					(v) => v.socket.id !== draft.clicked_server,
				);

				draft.server = draft.server.filter(
					(v) => v.id !== draft.clicked_server,
				);

				let visible_tab_length = draft.tab.filter(
					(x) => x.display === true,
				).length;

				for (let i = 0; i < draft.tab.length; i++) {
					if (visible_tab_length === draft.max_display_tab) break;
					if (draft.tab[i].display === false) {
						draft.tab[i].display = true;
						visible_tab_length++;
					}
				}

				if (visible_tab_length === 0) draft.current_tab = null;
				else if (
					draft.tab.filter(
						(v) => v.id === draft.current_tab && v.display === true,
					).length === 0
				)
					draft.current_tab = draft.tab.find(
						(x) => x.display === true,
					).id;
				break;
			}

			case SET_CLICKED_SERVER:
				draft.clicked_server = action.data;
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

				let visible_tab_length = draft.tab.filter(
					(x) => x.display === true,
				).length;

				for (let i = 0; i < draft.tab.length; i++) {
					if (visible_tab_length === draft.max_display_tab) break;
					if (draft.tab[i].display === true) {
						draft.tab[i].display = false;
						visible_tab_length--;
					}
				}

				draft.current_tab = draft.tab_index;
				draft.tab_index++;
				break;
			}

			case CLOSE_TAB: {
				draft.tab = draft.tab.filter((v) => v.id !== action.data);

				let visible_tab_length = draft.tab.filter(
					(x) => x.display === true,
				).length;

				for (let i = 0; i < draft.tab.length; i++) {
					if (visible_tab_length === draft.max_display_tab) break;
					if (draft.tab[i].display === false) {
						draft.tab[i].display = true;
						visible_tab_length++;
					}
				}

				if (visible_tab_length === 0) draft.current_tab = null;
				else if (
					draft.tab.filter(
						(v) => v.id === draft.current_tab && v.display === true,
					).length === 0
				)
					draft.current_tab = draft.tab.find(
						(x) => x.display === true,
					).id;
				break;
			}

			// case CHANGE_VISIBLE_TAB:
			// 	draft.tab = draft.visible_tab.filter(
			// 		(v) => v.id !== action.data,
			// 	);
			//
			// 	while (draft.visible_tab.length >= draft.number_of_visible_tabs)
			// 		draft.visible_tab.shift();
			//
			// 	draft.visible_tab.push(
			// 		draft.tab.find((v) => v.id === action.data),
			// 	);
			//
			// 	draft.visible_tab.sort(sortArray);
			// 	draft.current_tab = action.data;
			// 	break;
			//
			// case CHANGE_NUMBER_OF_VISIBLE_TAB:
			// 	draft.cols_size = action.data.cols;
			// 	draft.number_of_visible_tabs = action.data.tabs;
			// 	while (draft.visible_tab.length > action.data.tabs)
			// 		draft.visible_tab.shift();
			//
			// 	if (draft.visible_tab.length < action.data.tabs) {
			// 		for (let i = 0; i < draft.tab.length; i++) {
			// 			if (draft.visible_tab.length === action.data.tabs)
			// 				break;
			// 			if (
			// 				draft.visible_tab.filter(
			// 					(v) => v.id === draft.tab[i].id,
			// 				).length === 0
			// 			)
			// 				draft.visible_tab.push(draft.tab[i]);
			// 		}
			// 	}
			// 	break;

			default:
				break;
		}
	});
};

export default reducer;
