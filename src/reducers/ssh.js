import produce from 'immer';
import {Terminal} from 'xterm';
import {ROBOTO_MONO} from '../styles/components/font';
import {createSelector, createSlice} from '@reduxjs/toolkit';

// export const initialState = {
// 	font: ROBOTO_MONO,
// 	font_size: 14,
// 	search_mode: false,
// 	autoCompleteMode: true,
// 	ssh: [],
// 	ssh_history: [],
// 	snippets: [
// 		{id: 0, name: 'File List', content: 'ls'},
// 		{id: 1, name: 'Current Path', content: 'pwd'},
// 	],
// 	snippetIndex: 2,
// 	tab: false,
// 	loading: false,
// };
//
export const SSH_CHANGE_AUTO_COMPLETION_MODE =
	'SSH_CHANGE_AUTO_COMPLETION_MODE';
export const SSH_INCREASE_FONT_SIZE = 'SSH_INCREASE_FONT_SIZE';
export const SSH_DECREASE_FONT_SIZE = 'SSH_DECREASE_FONT_SIZE';
export const SSH_SET_SEARCH_MODE = 'SSH_SET_SEARCH_MODE';

export const SSH_SET_FONT_REQUEST = 'SSH_SET_FONT_REQUEST';
export const SSH_SET_FONT_SUCCESS = 'SSH_SET_FONT_SUCCESS';
export const SSH_SET_FONT_FAILURE = 'SSH_SET_FONT_FAILURE';

export const SSH_SEND_RECONNECTION_REQUEST = 'SSH_SEND_RECONNECTION_REQUEST';
export const SSH_SEND_RECONNECTION_SUCCESS = 'SSH_SEND_RECONNECTION_SUCCESS';
export const SSH_SEND_RECONNECTION_FAILURE = 'SSH_SEND_RECONNECTION_FAILURE';

export const SSH_SEND_CONNECTION_REQUEST = 'SSH_SEND_CONNECTION_REQUEST';
export const SSH_SEND_CONNECTION_SUCCESS = 'SSH_SEND_CONNECTION_SUCCESS';
export const SSH_SEND_CONNECTION_FAILURE = 'SSH_SEND_CONNECTION_FAILURE';

export const SSH_SEND_DISCONNECTION_REQUEST = 'SSH_SEND_DISCONNECTION_REQUEST';
export const SSH_SEND_DISCONNECTION_SUCCESS = 'SSH_SEND_DISCONNECTION_SUCCESS';
export const SSH_SEND_DISCONNECTION_FAILURE = 'SSH_SEND_DISCONNECTION_FAILURE';

export const SSH_SEND_COMMAND_REQUEST = 'SSH_SEND_COMMAND_REQUEST';
export const SSH_SEND_COMMAND_SUCCESS = 'SSH_SEND_COMMAND_SUCCESS';
export const SSH_SEND_COMMAND_FAILURE = 'SSH_SEND_COMMAND_FAILURE';

export const SSH_SEND_WINDOW_CHANGE_REQUEST = 'SSH_SEND_WINDOW_CHANGE_REQUEST';
export const SSH_SEND_WINDOW_CHANGE_SUCCESS = 'SSH_SEND_WINDOW_CHANGE_SUCCESS';
export const SSH_SEND_WINDOW_CHANGE_FAILURE = 'SSH_SEND_WINDOW_CHANGE_FAILURE';

export const SSH_ADD_SNIPPET_REQUEST = 'SSH_ADD_SNIPPET_REQUEST';
export const SSH_ADD_SNIPPET_SUCCESS = 'SSH_ADD_SNIPPET_SUCCESS';
export const SSH_ADD_SNIPPET_FAILURE = 'SSH_ADD_SNIPPET_FAILURE';

export const SSH_DELETE_SNIPPET_REQUEST = 'SSH_DELETE_SNIPPET_REQUEST';
export const SSH_DELETE_SNIPPET_SUCCESS = 'SSH_DELETE_SNIPPET_SUCCESS';
export const SSH_DELETE_SNIPPET_FAILURE = 'SSH_DELETE_SNIPPET_FAILURE';

export const SSH_CHANGE_SNIPPET_REQUEST = 'SSH_CHANGE_SNIPPET_REQUEST';
export const SSH_CHANGE_SNIPPET_SUCCESS = 'SSH_CHANGE_SNIPPET_SUCCESS';
export const SSH_CHANGE_SNIPPET_FAILURE = 'SSH_CHANGE_SNIPPET_FAILURE';

export const READY_STATE = 'ssh/READY_STATE';

const slice = createSlice({
	name: 'ssh',
	initialState: {
		font: {
			family: ROBOTO_MONO,
			size: 14,
		},
		ssh: [],
		sshHistory: [],
		searchMode: false,
		autoCompleteMode: false,
		snippets: [
			{id: 0, name: 'File List', content: 'ls'},
			{id: 1, name: 'Current Path', content: 'pwd'},
		],
		snippetIndex: 2,
		tab: false,
		loading: false,
	},
	reducers: {
		//READY_STATE
		setReadyState: (state, action) => {
			const index = state.ssh.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			if (index === -1) return;
			state.ssh[index].ready = 3;
		},
		//SSH_SEND_RECONNECTION_REQUEST
		reconnectRequest: (state) => {
			state.loading = true;
		},
		//SSH_SEND_RECONNECTION_SUCCESS
		reconnectSuccess: (state, action) => {
			const index = state.ssh.findIndex(
				(v) => v.uuid === action.payload.prevUuid,
			);
			state.ssh[index].uuid = action.payload.uuid;
			state.ssh[index].ws = action.payload.ws;
			state.ssh[index].ready = 1;
			state.loading = false;
		},
		//SSH_SEND_CONNECTION_REQUEST
		connectRequest: (state) => {
			state.loading = true;
		},
		//SSH_SEND_CONNECTION_SUCCESS
		connectSuccess: (state, action) => {
			state.loading = false;
			state.ssh.push({
				...action.payload,
				terminal: new Terminal({
					cursorBlink: true,
					minimumContrastRatio: 7,
					letterSpacing: 0,
				}),
				current_line: '',
				loading: false,
				ready: 1,
			});
		},
		//SSH_SEND_CONNECTION_FAILURE
		connectFailure: (state) => {
			state.loading = false;
		},

		//SSH_SEND_DISCONNECTION_REQUEST
		disconnectRequest: () => {},
		//SSH_SEND_DISCONNECTION_SUCCESS
		disconnectSuccess: (state, action) => {
			state.loading = false;
			state.ssh = state.ssh.filter((v) => v.uuid !== action.payload);
			if (state.ssh.length === 0 && state.searchMode)
				state.searchMode = false;
		},
		// SSH_SEND_DISCONNECTION_FAILURE
		disconnectFailure: () => {},
		//SSH_SEND_COMMAND_REQUEST
		sendCommandRequest: (state, action) => {
			if (action.payload.key === 'close') return;
			const index = state.ssh.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);

			const current_line = state.ssh[index].current_line || '';

			if (action.payload.input.charCodeAt(0) < 31) {
				if (action.payload.input.charCodeAt(0) === 13) {
					//input: Enter
					if (current_line !== '') {
						if (current_line !== '') {
							const index =
								state.sshHistory.indexOf(current_line);
							if (index > -1) {
								state.sshHistory.splice(index, 1);
							}
						}
						if (state.sshHistory.length > 50)
							state.sshHistory.shift();
						state.sshHistory.push(current_line);
					}
					state.ssh[index].current_line = '';
				}
				if (action.payload.input.charCodeAt(0) === 9) {
					//input: Tab
					state.tab = true;
				}
			} else {
				if (action.payload.input.charCodeAt(0) === 127)
					//input: BackSpace
					state.ssh[index].current_line = current_line.slice(0, -1);
				else state.ssh[index].current_line += action.payload.input;
			}
		},
		//SSH_SEND_COMMAND_SUCCESS
		sendCommandSuccess: (state, action) => {
			const sshTerm = state.ssh.find(
				(v) => v.uuid === action.payload.uuid,
			).terminal;
			const result = action.payload.result;
			sshTerm.write(result);
			if (action.payload.focus) sshTerm.focus();

			if (state.tab === true) {
				state.tab = false;
				if (result.charCodeAt(0) > 30)
					state.ssh[
						state.ssh.findIndex(
							(v) => v.uuid === action.payload.uuid,
						)
					].current_line += result;
			}
		},
		//SSH_SEND_COMMAND_FAILURE
		sendCommandFailure: () => {},
		//SSH_SEND_WINDOW_CHANGE_REQUEST
		windowChangeRequest: () => {},
		//SSH_SEND_WINDOW_CHANGE_SUCCESS
		windowChangeSuccess: () => {},
		//SSH_SEND_WINDOW_CHANGE_FAILURE
		windowChangeFailure: () => {},

		//SSH_SET_FONT_REQUEST
		setFont: (state, action) => {
			state.font.size = action.payload;
		},
		//SSH_INCREASE_FONT_SIZE
		increaseFont: (state) => {
			state.font.size++;
		},
		//SSH_DECREASE_FONT_SIZE
		decreaseFont: (state) => {
			state.font.size--;
		},
		// SSH_SET_SEARCH_MODE
		setSearchMode: (state) => {
			state.searchMode = !state.searchMode;
		},

		// SSH_ADD_SNIPPET_REQUEST:
		addSnippet: (state, action) => {
			state.snippets.push({
				id: state.snippetIndex,
				name: action.payload.name,
				content: action.payload.content,
			});
			state.snippetIndex++;
		},
		// SSH_DELETE_SNIPPET_REQUEST
		deleteSnippet: (state, action) => {
			state.snippets = state.snippets.filter(
				(x) => x.id !== action.payload,
			);
		},
		// SSH_CHANGE_SNIPPET_REQUEST
		changeSnippet: (state, action) => {
			state.snippets = state.snippets.map((x) => {
				if (x.id !== action.payload.id) return x;
				else
					return {
						...x,
						name: action.payload.name,
						content: action.payload.content,
					};
			});
		},
		// SSH_CHANGE_AUTO_COMPLETION_MODE
		setAutoCompleteMode: (state, action) => {
			state.autoCompleteMode = action.payload;
		},
	},
});
const selectAllState = createSelector(
	(state) => state.font,
	(state) => state.ssh,
	(state) => state.sshHistory,
	(state) => state.searchMode,
	(state) => state.autoCompleteMode,
	(state) => state.snippets,
	(state) => state.tab,
	(state) => state.loading,
	(
		font,
		ssh,
		sshHistory,
		searchMode,
		autoCompleteMode,
		snippets,
		tab,
		loading,
	) => {
		return {
			font,
			ssh,
			sshHistory,
			searchMode,
			autoCompleteMode,
			snippets,
			tab,
			loading,
		};
	},
);

export const sshSelector = {
	all: (state) => selectAllState(state[SSH]),
};

export const SSH = slice.name;
export const sshReducer = slice.reducer;
export const sshAction = slice.actions;
