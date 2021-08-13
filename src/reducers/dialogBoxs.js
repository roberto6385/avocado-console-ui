import {createSelector, createSlice} from '@reduxjs/toolkit';
import {USER_RESOURCE} from './api/userResource';

const slice = createSlice({
	name: 'dialogBox',
	initialState: {
		alert: {open: false},
		form: {open: false},
	},
	reducers: {
		openAlert: (state, action) => {
			state.alert = {open: true, key: action.payload.key};
			if (action.payload.uuid) state.alert.uuid = action.payload.uuid;
			if (action.payload.id) state.alert.id = action.payload.id;
		},
		closeAlert: (state) => {
			state.alert = {open: false};
		},
		openForm: (state, action) => {
			state.form = {open: true, key: action.payload.key};
			if (action.payload.uuid) state.form.uuid = action.payload.uuid;
			if (action.payload.id) state.form.id = action.payload.id;
		},
		closeForm: (state) => {
			state.form = {open: false};
		},
	},
});

const selectAllState = createSelector(
	(state) => state.alert,
	(state) => state.form,
	(alert, form) => {
		return {alert, form};
	},
);

export const dialogBoxSelector = {
	all: (state) => selectAllState(state[DIALOG_BOX]),
};

export const DIALOG_BOX = slice.name;
export const dialogBoxReducer = slice.reducer;
export const dialogBoxAction = slice.actions;
