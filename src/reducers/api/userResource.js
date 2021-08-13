// import produce from 'immer';
import {createSelector, createSlice} from '@reduxjs/toolkit';
import {authAction} from './auth';

const slice = createSlice({
	name: 'userResource',
	initialState: {
		data: null,
		loading: false,
		error: null,
	},
	reducers: {
		createRequest: (state) => {
			state.loading = true;
		},
		createSuccess: (state) => {
			state.loading = false;
		},
		createFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		modifyRequest: (state) => {
			state.loading = true;
		},
		modifySuccess: (state) => {
			state.loading = false;
		},
		modifyFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		deleteRequest: (state) => {
			state.loading = true;
		},
		deleteSuccess: (state) => {
			state.loading = false;
		},
		deleteFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		findByIdRequest: (state) => {
			state.loading = true;
		},
		findByIdSuccess: (state, action) => {
			state.loading = false;
			state.data = action.payload;
		},
		findByIdFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
	extraReducers: {
		[authAction.revokeSuccess]: (state) => {
			state.data = null;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.data,
	(state) => state.error,
	(state) => state.loading,
	(data, error, loading) => {
		return {data, error, loading};
	},
);

export const userResourceSelector = {
	all: (state) => selectAllState(state[USER_RESOURCE]),
};

export const USER_RESOURCE = slice.name;
export const userResourceReducer = slice.reducer;
export const userResourceAction = slice.actions;
