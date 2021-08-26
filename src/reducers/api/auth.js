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
		getClientAuthRequest: (state) => {
			state.loading = true;
		},
		getClientAuthSuccess: (state, action) => {
			state.clientData = action.payload;
			state.loading = false;
		},
		getClientAuthFailure: (state) => {
			state.loading = false;
		},
		getUserAuthRequest: (state) => {
			state.loading = true;
		},
		getUserAuthSuccess: (state, action) => {
			state.userData = action.payload;
			state.loading = false;
		},
		getUserAuthFailure: (state) => {
			state.loading = false;
		},
		refreshTokenRequest: (state) => {
			state.loading = true;
		},
		refreshTokenSuccess: (state, action) => {
			state.userData = Object.assign(state.userData, action.payload);
			state.loading = false;
		},
		refreshTokenFailure: (state) => {
			state.loading = false;
		},
		verifyTokenRequest: (state) => {
			state.loading = true;
			state.clientData = null;
			state.loading = false;
		},
		verifyTokenSuccess: (state) => {
			state.loading = false;
		},
		verifyTokenFailure: (state) => {
			state.loading = false;
		},
		revokeTokenRequest: (state) => {
			state.loading = true;
		},
		revokeTokenSuccess: (state) => {
			state.userData = null;
		},
		revokeTokenFailure: (state) => {
			state.userData = null;
		},
		findTokenRequest: (state) => {
			state.loading = true;
		},
		findTokenSuccess: (state) => {
			state.loading = false;
		},
		findTokenFailure: (state) => {
			state.loading = false;
		},
		getAlternativeAuthRequest: (state) => {
			state.loading = true;
		},
		getAlternativeAuthSuccess: (state, action) => {
			state.userData = action.payload;
			state.clientData = null;
			state.loading = false;
		},
		getAlternativeAuthFailure: (state) => {
			state.loading = false;
		},
		getGoogleAuthRequest: (state) => {
			state.loading = true;
		},
		getGoogleAuthSuccess: (state, action) => {
			state.alternativeData = action.payload;
			state.loading = false;
		},
		getGoogleAuthFailure: (state) => {
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
