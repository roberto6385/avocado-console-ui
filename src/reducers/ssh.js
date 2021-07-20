import produce from 'immer';
import {Terminal} from 'xterm';
import {ROBOTO_MONO} from '../styles/font';

export const initialState = {
	font: ROBOTO_MONO,
	font_size: 14,
	search_mode: false,
	auto_completion_mode: true,
	ssh: [],
	ssh_history: [],
	snippets: [
		{id: 0, name: 'File List', content: 'ls'},
		{id: 1, name: 'Current Path', content: 'pwd'},
	],
	snippents_index: 2,
	tab: false,
	loading: false,
};

export const CHANGE_AUTO_COMPLETION_MODE = 'CHANGE_AUTO_COMPLETION_MODE';

export const SSH_INCREASE_FONT_SIZE = 'SSH_INCREASE_FONT_SIZE';
export const SSH_DECREASE_FONT_SIZE = 'SSH_DECREASE_FONT_SIZE';
export const SET_SEARCH_MODE = 'SET_SEARCH_MODE';

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

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case READY_STATE: {
				const index = draft.ssh.findIndex(
					(v) => v.uuid === action.data.uuid,
				);
				draft.ssh[index].ready = 3;
				break;
			}

			case SSH_SEND_RECONNECTION_REQUEST:
				draft.loading = true;
				break;

			case SSH_SEND_RECONNECTION_SUCCESS: {
				const index = draft.ssh.findIndex(
					(v) => v.uuid === action.data.prevUuid,
				);
				draft.ssh[index].uuid = action.data.uuid;
				draft.ssh[index].ws = action.data.ws;
				draft.ssh[index].ready = 1;
				draft.loading = false;

				break;
			}

			case SSH_SEND_CONNECTION_REQUEST:
				draft.loading = true;
				break;

			case SSH_SEND_CONNECTION_SUCCESS:
				draft.loading = false;
				draft.ssh.push({
					...action.data,
					terminal: new Terminal({
						cursorBlink: true,
						minimumContrastRatio: 7,
						letterSpacing: 0,
					}),
					current_line: '',
					loading: false,
					ready: 1,
				});
				break;

			case SSH_SEND_CONNECTION_FAILURE:
				// connection이 실패했을때 alert 메시지를 보내거나 re-connection이 필요
				draft.loading = false;
				break;

			case SSH_SEND_DISCONNECTION_REQUEST:
				break;

			case SSH_SEND_DISCONNECTION_SUCCESS:
				draft.loading = false;
				draft.ssh = draft.ssh.filter((v) => v.uuid !== action.data);
				if (draft.ssh.length === 0 && draft.search_mode)
					draft.search_mode = false;
				break;

			case SSH_SEND_DISCONNECTION_FAILURE:
				break;

			case SSH_SEND_COMMAND_REQUEST: {
				const index = draft.ssh.findIndex(
					(v) => v.uuid === action.data.uuid,
				);
				const current_line = draft.ssh[index].current_line;

				if (action.data.input.charCodeAt(0) < 31) {
					if (action.data.input.charCodeAt(0) === 13) {
						//input: Enter
						if (current_line !== '') {
							if (current_line !== '') {
								const index =
									draft.ssh_history.indexOf(current_line);
								if (index > -1) {
									draft.ssh_history.splice(index, 1);
								}
							}
							if (draft.ssh_history.length > 50)
								draft.ssh_history.shift();
							draft.ssh_history.push(current_line);
						}
						draft.ssh[index].current_line = '';
					}
					if (action.data.input.charCodeAt(0) === 9) {
						//input: Tab
						draft.tab = true;
					}
				} else {
					if (action.data.input.charCodeAt(0) === 127)
						//input: BackSpace
						draft.ssh[index].current_line = current_line.slice(
							0,
							-1,
						);
					else draft.ssh[index].current_line += action.data.input;
				}
				break;
			}

			case SSH_SEND_COMMAND_SUCCESS:
				{
					const sshTerm = draft.ssh.find(
						(v) => v.uuid === action.data.uuid,
					).terminal;
					const result = action.data.result;
					sshTerm.write(result);
					if (action.data.focus) sshTerm.focus();

					if (draft.tab === true) {
						draft.tab = false;
						if (result.charCodeAt(0) > 30)
							draft.ssh[
								draft.ssh.findIndex(
									(v) => v.uuid === action.data.uuid,
								)
							].current_line += result;
					}
				}
				break;

			case SSH_SEND_COMMAND_FAILURE:
				break;

			case SSH_SEND_WINDOW_CHANGE_REQUEST:
				break;

			case SSH_SEND_WINDOW_CHANGE_SUCCESS:
				break;

			case SSH_SEND_WINDOW_CHANGE_FAILURE:
				break;

			case SSH_SET_FONT_REQUEST:
				draft.font = action.data;
				break;

			case SSH_INCREASE_FONT_SIZE:
				draft.font_size++;
				break;

			case SSH_DECREASE_FONT_SIZE:
				draft.font_size--;
				break;

			case SET_SEARCH_MODE:
				draft.search_mode = !draft.search_mode;
				break;

			case SSH_ADD_SNIPPET_REQUEST:
				draft.snippets.push({
					id: draft.snippents_index,
					name: action.data.name,
					content: action.data.content,
				});
				draft.snippents_index++;
				break;

			case SSH_DELETE_SNIPPET_REQUEST:
				draft.snippets = draft.snippets.filter(
					(x) => x.id !== action.data,
				);
				break;

			case SSH_CHANGE_SNIPPET_REQUEST:
				draft.snippets = draft.snippets.map((x) => {
					if (x.id !== action.data.id) return x;
					else
						return {
							...x,
							name: action.data.name,
							content: action.data.content,
						};
				});
				// draft.snippets = action.data.snippets;
				// draft.snippents_index = action.data.snippents_index;
				break;

			case CHANGE_AUTO_COMPLETION_MODE:
				draft.auto_completion_mode = action.data;
				break;

			default:
				break;
		}
	});
};

export default reducer;
