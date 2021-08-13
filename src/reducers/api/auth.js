import {createSlice, createSelector} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'auth',
	initialState: {
		clientData: null,
		userData: null,
		loading: false,
		alternativeData: null,
	},
	reducers: {
		clientRequest: (state) => {
			state.loading = true;
		},
		clientSuccess: (state, action) => {
			state.clientData = action.payload;
			state.loading = false;
		},
		clientFailure: (state) => {
			state.loading = false;
		},
		userRequest: (state) => {
			state.loading = true;
		},
		userSuccess: (state, action) => {
			state.userData = action.payload;
			state.loading = false;
		},
		userFailure: (state) => {
			state.loading = false;
		},
		refreshRequest: (state) => {
			state.loading = true;
		},
		refreshSuccess: (state, action) => {
			state.userData = Object.assign(state.userData, action.payload);
			state.loading = false;
		},
		refreshFailure: (state) => {
			state.loading = false;
		},
		verifyRequest: (state) => {
			state.loading = true;
		},
		verifySuccess: (state) => {
			state.loading = false;
		},
		verifyFailure: (state) => {
			state.loading = false;
		},
		revokeRequest: (state) => {
			state.loading = true;
		},
		revokeSuccess: (state) => {
			state.userData = null;
			state.clientData = null;
			state.loading = false;
		},
		revokeFailure: (state) => {
			state.loading = false;
		},
		findRequest: (state) => {
			state.loading = true;
		},
		findSuccess: (state) => {
			state.loading = false;
		},
		findFailure: (state) => {
			state.loading = false;
		},
		alternativeRequest: (state) => {
			state.loading = true;
		},
		alternativeSuccess: (state, action) => {
			state.userData = action.payload;
			state.clientData = null;
			state.loading = false;
		},
		alternativeFailure: (state) => {
			state.loading = false;
		},
		googleRequest: (state) => {
			state.loading = true;
		},
		googleSuccess: (state, action) => {
			state.alternativeData = action.payload;
			state.loading = false;
		},
		googleFailure: (state) => {
			state.loading = false;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.userData,
	(state) => state.clientData,
	(state) => state.alternativeData,
	(state) => state.loading,
	(userData, clientData, alternativeData, loading) => {
		return {userData, clientData, alternativeData, loading};
	},
);

export const authSelector = {
	all: (state) => selectAllState(state[AUTH]),
};

export const AUTH = slice.name;
export const authReducer = slice.reducer;
export const authAction = slice.actions;
