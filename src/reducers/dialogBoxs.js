import {createSlice} from '@reduxjs/toolkit';

export const OPEN_DELETE_DIALOG_BOX = 'OPEN_DELETE_DIALOG_BOX';
export const CLOSE_DELETE_DIALOG_BOX = 'CLOSE_DELETE_DIALOG_BOX';

export const OPEN_SAVE_DIALOG_BOX = 'OPEN_SAVE_DIALOG_BOX';
export const CLOSE_SAVE_DIALOG_BOX = 'CLOSE_SAVE_DIALOG_BOX';

export const OPEN_INPUT_DIALOG_BOX = 'OPEN_INPUT_DIALOG_BOX';
export const CLOSE_INPUT_DIALOG_BOX = 'CLOSE_INPUT_DIALOG_BOX';

export const OPEN_SERVER_DIALOG_BOX = 'OPEN_ADD_SERVER_DIALOG_BOX';
export const CLOSE_SERVER_DIALOG_BOX = 'CLOSE_ADD_SERVER_DIALOG_BOX';

export const OPEN_ADD_FAVORITES_DIALOG_BOX = 'OPEN_ADD_FAVORITES_DIALOG_BOX';
export const CLOSE_ADD_FAVORITES_DIALOG_BOX = 'CLOSE_ADD_FAVORITES_DIALOG_BOX';

export const OPEN_FILE_STATUS_DIALOG_BOX = 'OPEN_FILE_STATUS_DIALOG_BOX';
export const CLOSE_FILE_STATUS_DIALOG_BOX = 'CLOSE_FILE_STATUS_DIALOG_BOX';

// todo alert, dialogForm 구분해서 2case state만 생성해도 될거같아요~
const slice = createSlice({
	name: 'dialogBox',
	initialState: {
		confirm: {open: false},
		warning: {open: false},
		delete: {open: false},
		save: {open: false},
		input: {open: false},
		server: {open: false},
		favorite: {open: false},
		fileStatus: {open: false},
		chgrp: {open: false},
		chown: {open: false},
	},
	reducers: {
		openConfirm: (state, action) => {
			state.confirm = {open: true, key: action.payload};
		},
		closeConfirm: (state) => {
			state.confirm = {open: false};
		},
		openWarning: (state, action) => {
			state.warning = {open: true, key: action.payload};
		},
		closeWarning: (state) => {
			state.warning = {open: false};
		},
		openDelete: (state, action) => {
			state.delete = {open: true, key: action.payload.key};
			if (action.payload.uuid) state.delete.uuid = action.payload.uuid;
		},
		closeDelete: (state) => {
			state.delete = {open: false};
		},
		openInput: (state, action) => {
			state.input = {open: true, key: action.payload.key};
			if (action.payload.uuid) state.input.uuid = action.payload.uuid;
		},
		closeInput: (state) => {
			state.input = {open: false};
		},
		openSave: (state, action) => {
			state.save = {open: true, key: action.payload.key};
			if (action.payload.uuid) state.save.uuid = action.payload.uuid;
		},
		closeSave: (state) => {
			state.save = {open: false};
		},
		openServer: (state, action) => {
			state.server = {open: true, id: action.payload.id};
		},
		closeServer: (state) => {
			state.server = {open: false};
		},
		openFavorite: (state) => {
			state.favorite = {open: true};
		},
		closeFavorite: (state) => {
			state.favorite = {open: false};
		},
		openFileStatus: (state, action) => {
			state.fileStatus = {
				open: true,
				key: action.payload.key,
				uuid: action.payload.uuid,
			};
		},
		closeFileStatus: (state) => {
			state.fileStatus = {open: false};
		},
	},
});

export const DIALOG_BOX = slice.name;
export const dialogBoxReducer = slice.reducer;
export const dialogBoxAction = slice.actions;
