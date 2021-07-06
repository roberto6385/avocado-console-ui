import produce from 'immer';

export const CRUD_CONNECTION_SUCCESS = 'crud/CONNECTION_SUCCESS';

export const CREATE_NEW_WEBSOCKET_REQUEST = 'sftp/CREATE_NEW_WEBSOCKET_REQUEST';
export const CREATE_NEW_WEBSOCKET_SUCCESS = 'sftp/CREATE_NEW_WEBSOCKET_SUCCESS';
export const CREATE_NEW_WEBSOCKET_FAILURE = 'sftp/CREATE_NEW_WEBSOCKET_FAILURE';
export const REMOVE_NEW_WEBSOCKET_REQUEST = 'sftp/REMOVE_NEW_WEBSOCKET_REQUEST';
export const REMOVE_NEW_WEBSOCKET_SUCCESS = 'sftp/REMOVE_NEW_WEBSOCKET_SUCCESS';
export const REMOVE_NEW_WEBSOCKET_FAILURE = 'sftp/REMOVE_NEW_WEBSOCKET_FAILURE';

export const DELETE_WORK_LIST = 'sftp/DELETE_WORK_LIST';
export const SHIFT_INCINERATOR_LIST = 'sftp/SHIFT_INCINERATOR_LIST';
export const PUSH_READ_LIST = 'sftp/PUSH_READ_LIST';
export const SHIFT_READ_LIST = 'sftp/SHIFT_READ_LIST';
export const PUSH_WRITE_LIST = 'sftp/PUSH_WRITE_LIST';
export const SHIFT_SOCKETS = 'sftp/SHIFT_SOCKETS';
export const SHIFT_WRITE_LIST = 'sftp/SHIFT_WRITE_LIST';
export const DELETE_WORK_TRANSPORTER = 'sftp/DELETE_WORK_TRANSPORTER';
export const INIT_DELETE_WORK_LIST = 'sftp/INIT_DELETE_WORK_LIST';

export const LS_REQUEST_DELETE = 'sftp/LS_REQUEST_DELETE';
export const LS_SUCCESS_DELETE = 'sftp/LS_SUCCESS_DELETE';
export const LS_FAILURE_DELETE = 'sftp/LS_FAILURE_DELETE';

const initialState = {
	crudState: [],
};
const ObjFinder = (target, uuid) => {
	return target.find((it) => it.uuid === uuid);
};
export const createNewWebsocket = (payload) => ({
	type: CREATE_NEW_WEBSOCKET_REQUEST,
	payload,
});
export const searchDeleteListAction = (payload) => ({
	type: LS_REQUEST_DELETE,
	payload,
});

export const removeNewWebsocket = (payload) => ({
	type: REMOVE_NEW_WEBSOCKET_REQUEST,
	payload,
});

const crud = (state = initialState, action) =>
	produce(state, (draft) => {
		// 직접 변형 가능
		const target = ObjFinder(draft.crudState, action.payload?.uuid);
		// 직접 변경 불가능
		const plainTarget = ObjFinder(state.crudState, action.payload?.uuid);
		// target === plainTarget => false
		switch (action.type) {
			case CRUD_CONNECTION_SUCCESS:
				draft.crudState.push({
					uuid: action.payload.uuid, // ok

					readSockets: [], // 경로, file 저장
					writeSockets: [], // 경로, file 저장
					removeSockets: [],

					readList: [], // 경로, file 저장
					writeList: [], // 경로, file 저장
					removeList: [],
					incinerator: [],
				});

				break;
			case CREATE_NEW_WEBSOCKET_SUCCESS:
				action.payload.todo === 'write' &&
					target.writeSockets.push(action.payload.socket);
				action.payload.todo === 'read' &&
					target.readSockets.push(action.payload.socket);
				action.payload.todo === 'remove' &&
					target.removeSockets.push(action.payload.socket);
				break;

			case SHIFT_SOCKETS:
				action.payload.todo === 'write' && target.writeSockets.shift();
				action.payload.todo === 'read' && target.readSockets.shift();
				action.payload.todo === 'remove' &&
					target.removeSockets.shift();
				break;
			// read, write, remove
			case PUSH_READ_LIST:
				target.readList = plainTarget.readList.concat(
					action.payload.array,
				);
				break;
			case SHIFT_READ_LIST:
				target.readList.shift();
				break;

			case PUSH_WRITE_LIST:
				target.writeList = plainTarget.writeList.concat(
					action.payload.array,
				);
				break;
			case SHIFT_WRITE_LIST:
				target.writeList.shift();
				break;

			case SHIFT_INCINERATOR_LIST:
				target.incinerator.shift();
				break;

			case DELETE_WORK_TRANSPORTER:
				target.incinerator = plainTarget.incinerator.concat(
					target.removeList.sort((a, b) => {
						return a.path < b.path ? 1 : a.path > b.path ? -1 : 0;
					}),
				);
				target.removeList = [];
				break;

			case DELETE_WORK_LIST:
				target.removeList = plainTarget.removeList.concat(
					action.payload.array,
				);
				break;
			case INIT_DELETE_WORK_LIST:
				target.removeList = [];
				break;

			default:
				break;
		}
	});
export default crud;
