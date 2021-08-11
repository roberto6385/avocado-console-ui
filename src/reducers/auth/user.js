// import produce from 'immer';
import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'user',
	initialState: {
		user: null,
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
			state.user = action.payload;
		},
		findByIdFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const USER = slice.name;
export const userReducer = slice.reducer;
export const userAction = slice.actions;
