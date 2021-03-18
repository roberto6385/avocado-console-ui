import produce from 'immer';

export const initialState = {
	current_tab: null,
	clicked_server: null,
	max_display_tab: 1,
	cols: 1,
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
export const CHANGE_NUMBER_OF_COLUMNS = 'CHANGE_NUMBER_OF_COLUMNS';

const reducer = (state = initialState, action) => {
	const fillTabs = (tab, max_display_tab, current_tab) => {
		if (tab.length === 0) {
			current_tab = null;
		} else {
			let visible_tab_length = tab.filter((x) => x.display === true)
				.length;

			for (let i = 0; i < tab.length; i++) {
				if (visible_tab_length === max_display_tab) break;
				else if (visible_tab_length > max_display_tab) {
					if (tab[i].display === true && tab[i].id !== current_tab) {
						tab[i].display = false;
						visible_tab_length--;
					}
				} else if (visible_tab_length < max_display_tab) {
					if (tab[i].display === false) {
						tab[i].display = true;
						visible_tab_length++;
					}
				}
			}

			if (
				tab.filter((v) => v.id === current_tab && v.display === true)
					.length === 0
			)
				current_tab = tab.find((x) => x.display === true).id;
		}
	};

	return produce(state, (draft) => {
		switch (action.type) {
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

				fillTabs(draft.tab, draft.max_display_tab, draft.current_tab);
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
				draft.current_tab = draft.tab_index;

				fillTabs(draft.tab, draft.max_display_tab, draft.current_tab);
				draft.tab_index++;
				break;
			}

			case CLOSE_TAB: {
				draft.tab = draft.tab.filter((v) => v.id !== action.data);

				fillTabs(draft.tab, draft.max_display_tab, draft.current_tab);
				break;
			}

			case CHANGE_VISIBLE_TAB: {
				draft.tab[
					draft.tab.findIndex((v) => v.id == action.data)
				].display = true;
				draft.current_tab = action.data;

				fillTabs(draft.tab, draft.max_display_tab, draft.current_tab);
				break;
			}

			case CHANGE_NUMBER_OF_COLUMNS: {
				draft.cols = action.data.cols;
				draft.max_display_tab = action.data.max;

				fillTabs(draft.tab, draft.max_display_tab, draft.current_tab);
				break;
			}

			default:
				break;
		}
	});
};

export default reducer;
