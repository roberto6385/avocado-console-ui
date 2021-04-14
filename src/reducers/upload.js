import produce from 'immer';

// action types
export const UPLOAD_REQUEST = 'upload/UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'upload/UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'upload/UPLOAD_FAILURE';

// actions
export const uploadAction = (payload) => ({
	type: UPLOAD_REQUEST,
	payload,
});

// initial State
const initialState = {
	upload: null,
	loading: false,
	percent: 0,
};

const upload = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case UPLOAD_REQUEST:
				draft.loading = true;
				break;
			case UPLOAD_SUCCESS:
				draft.upload = action.data;
				// draft.percent = action.data.percent;
				draft.loading = false;
				break;
			case UPLOAD_FAILURE:
				draft.loading = false;
				break;
			default:
				return state;
		}
	});

export default upload;
