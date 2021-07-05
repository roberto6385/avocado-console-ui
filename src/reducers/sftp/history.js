import produce from 'immer';

export const ADD_HISTORY = 'sftp/ADD_HISTORY';
export const FIND_HISTORY = 'sftp/FIND_HISTORY';
export const REMOVE_HISTORY = 'sftp/REMOVE_HISTORY';
export const ADD_HISTORY_HI = 'sftp/ADD_HISTORY_HI';
export const INITIAL_HISTORY_HI = 'sftp/INITIAL_HISTORY_HI';

export const HISTORY_CONNECTION_SUCCESS = 'history/CONNECTION_SUCCESS';

let HISTORY_ID = 0;

const initialState = {
	historyState: [],
};

const ObjFinder = (target, uuid) => {
	return target.find((it) => it.uuid === uuid);
};

const history = (state = initialState, action) =>
	produce(state, (draft) => {
		// 직접 변형 가능
		const target = ObjFinder(draft.historyState, action.payload?.uuid);
		// 직접 변경 불가능
		const plainTarget = ObjFinder(state.historyState, action.payload?.uuid);
		// target === plainTarget => false
		switch (action.type) {
			case HISTORY_CONNECTION_SUCCESS:
				draft.historyState.push({
					uuid: action.payload.uuid, // ok
					history: [],
					history_highlight: [],
				});

				break;

			case ADD_HISTORY:
				target.history.unshift({...action.payload, HISTORY_ID});
				HISTORY_ID++;
				break;

			case FIND_HISTORY:
				// eslint-disable-next-line no-case-declarations
				const index = target.history.findIndex(
					(h) =>
						h.name === action.payload.name &&
						h.todo === action.payload.todo,
				);
				if (index !== -1) {
					target.history[index].progress = action.payload.progress;
				}
				break;
			case REMOVE_HISTORY:
				target.history = plainTarget.history.filter(
					(it) => it !== action.payload.history,
				);
				break;

			case ADD_HISTORY_HI:
				target.history_highlight = action.payload.history;
				break;

			case INITIAL_HISTORY_HI:
				if (target?.history_highlight) {
					target.history_highlight = [];
				}
				break;

			default:
				break;
		}
	});

export default history;
