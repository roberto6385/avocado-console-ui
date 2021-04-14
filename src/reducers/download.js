import produce from 'immer';

// action types
export const DOWNLOAD_REQUEST = 'download/DOWNLOAD_REQUEST';
export const DOWNLOAD_SUCCESS = 'download/DOWNLOAD_SUCCESS';
export const DOWNLOAD_FAILURE = 'download/DOWNLOAD_FAILURE';

// actions
export const downloadAction = (payload) => ({
	type: DOWNLOAD_REQUEST,
	payload,
});

// initial State
const initialState = {
	download: null,
	loading: false,
	percent: 0,
};

const download = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case DOWNLOAD_REQUEST:
				draft.loading = true;
				break;
			case DOWNLOAD_SUCCESS:
				draft.download = action.data;
				draft.loading = false;
				break;
			case DOWNLOAD_FAILURE:
				draft.loading = false;
				break;
			default:
				return state;
		}
	});

export default download;
