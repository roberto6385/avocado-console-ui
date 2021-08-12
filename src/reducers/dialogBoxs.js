import {createSlice} from '@reduxjs/toolkit';

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

export const DIALOG_BOX = slice.name;
export const dialogBoxReducer = slice.reducer;
export const dialogBoxAction = slice.actions;
