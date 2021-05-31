import produce from 'immer';
import {Terminal} from 'xterm';
import {ROBOTO} from '../styles/global';

export const initialState = {
	font: 'Roboto, monospace',
	font_size: 14,
	search_mode: false,
	ssht: [],
	current_line: '',
	snippets: [
		{id: 0, name: 'File List', content: 'ls'},
		{id: 1, name: 'Current Path', content: 'pwd'},
	],
	snippents_index: 2,
};

export const SSH_INCREASE_FONT_SIZE = 'SSH_INCREASE_FONT_SIZE';
export const SSH_DECREASE_FONT_SIZE = 'SSH_DECREASE_FONT_SIZE';
export const SET_SEARCH_MODE = 'SET_SEARCH_MODE';

export const SSH_SET_FONT_REQUEST = 'SSH_SET_FONT_REQUEST';
export const SSH_SET_FONT_SUCCESS = 'SSH_SET_FONT_SUCCESS';
export const SSH_SET_FONT_FAILURE = 'SSH_SET_FONT_FAILURE';

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

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case SSH_SEND_CONNECTION_SUCCESS:
				draft.ssht.push({
					...action.data,
					terminal: new Terminal({
						cursorBlink: true,
						minimumContrastRatio: 7,
						fontFamily: draft.font,
						letterSpacing: 0,

						theme: {
							foreground: '#000000',
							background: '#f8f9fa',
							selection: '#FCFD08',
						},
					}),
				});
				break;

			case SSH_SEND_CONNECTION_FAILURE:
				// connection이 실패했을때 alert 메시지를 보내거나 re-connection이 필요
				draft.ssht
					.find((v) => v.uuid === action.data)
					.terminal.dispose();
				draft.ssht = draft.ssht.filter((v) => v.uuid !== action.data);
				break;

			case SSH_SEND_DISCONNECTION_REQUEST:
				break;

			case SSH_SEND_DISCONNECTION_SUCCESS:
				draft.ssht
					.find((v) => v.uuid === action.data)
					.terminal.dispose();
				draft.ssht = draft.ssht.filter((v) => v.uuid !== action.data);
				break;

			case SSH_SEND_DISCONNECTION_FAILURE:
				draft.ssht
					.find((v) => v.uuid === action.data)
					.terminal.dispose();
				draft.ssht = draft.ssht.filter((v) => v.uuid !== action.data);
				break;

			case SSH_SEND_COMMAND_REQUEST:
				// draft.current_line += action.data.result;
				// console.log(draft.current_line);
				break;

			case SSH_SEND_COMMAND_SUCCESS:
				draft.ssht
					.find((v) => v.uuid === action.data.uuid)
					.terminal.write(action.data.result);
				break;

			case SSH_SEND_COMMAND_FAILURE:
				draft.ssht
					.find((v) => v.uuid === action.data)
					.terminal.dispose();
				draft.ssht = draft.ssht.filter((v) => v.uuid !== action.data);
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
				// draft.snippets = draft.snippets.map((x) => {
				// 	if (x.id === action.data.id) return x;
				// 	else
				// 		return {
				// 			...x,
				// 			name: action.data.name,
				// 			content: action.data.content,
				// 		};
				// });
				draft.snippets = action.data.snippets;
				draft.snippents_index = action.data.snippents_index;
				break;

			default:
				break;
		}
	});
};

export default reducer;
