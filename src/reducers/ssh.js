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
		setReadyState: (state, action) => {
			const index = state.ssh.findIndex(
				(v) => v.uuid === action.payload.uuid,
			);
			if (index === -1) return;
			state.ssh[index].ready = 3;
		},
		reconnectRequest: (state) => {
			state.loading = true;
		},
		reconnectSuccess: (state, action) => {
			const index = state.ssh.findIndex(
				(v) => v.uuid === action.payload.prevUuid,
			);
			state.ssh[index].uuid = action.payload.uuid;
			state.ssh[index].ws = action.payload.ws;
			state.ssh[index].ready = 1;
			state.loading = false;
		},
		connectRequest: (state) => {
			state.loading = true;
		},
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

		disconnectRequest: () => {},
		disconnectSuccess: (state, action) => {
			state.loading = false;
			state.ssh = state.ssh.filter((v) => v.uuid !== action.payload);
			if (state.ssh.length === 0 && state.searchMode)
				state.searchMode = false;
		},
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
		windowChangeRequest: () => {},

		setFont: (state, action) => {
			state.font.size = action.payload;
		},
		increaseFont: (state) => {
			state.font.size++;
		},
		decreaseFont: (state) => {
			state.font.size--;
		},
		setSearchMode: (state) => {
			state.searchMode = !state.searchMode;
		},

		addSnippet: (state, action) => {
			state.snippets.push({
				id: state.snippetIndex,
				name: action.payload.name,
				content: action.payload.content,
			});
			state.snippetIndex++;
		},
		deleteSnippet: (state, action) => {
			state.snippets = state.snippets.filter(
				(x) => x.id !== action.payload,
			);
		},
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
	(state) => state.snippetIndex,
	(
		font,
		ssh,
		sshHistory,
		searchMode,
		autoCompleteMode,
		snippets,
		tab,
		loading,
		snippetIndex,
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
			snippetIndex,
		};
	},
);

export const sshSelector = {
	all: (state) => selectAllState(state[SSH]),
};

export const SSH = slice.name;
export const sshReducer = slice.reducer;
export const sshAction = slice.actions;
