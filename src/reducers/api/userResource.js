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
		createUserRequest: (state) => {
			state.loading = true;
		},
		createUserSuccess: (state) => {
			state.loading = false;
		},
		createUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		modifyUserRequest: (state) => {
			state.loading = true;
		},
		modifyUserSuccess: (state) => {
			state.loading = false;
		},
		modifyUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		deleteUserRequest: (state) => {
			state.loading = true;
		},
		deleteUserSuccess: (state) => {
			state.loading = false;
		},
		deleteUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		findUserByIdRequest: (state) => {
			state.loading = true;
		},
		findUserByIdSuccess: (state, action) => {
			state.loading = false;
			state.data = action.payload;
		},
		findUserByIdFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
	extraReducers: {
		[authAction.revokeTokenSuccess]: (state) => {
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
