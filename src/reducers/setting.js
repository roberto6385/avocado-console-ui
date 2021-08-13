import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'setting',
	initialState: {
		theme: 'light', // light, dark
		language: 'ko-KR', // language ko-KR - korean, en-US - english
		menu: null, // current setting menu item
	},
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
		setLanguage: (state, action) => {
			state.language = action.payload;
		},
		setMenu: (state, action) => {
			state.menu = action.payload;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.theme,
	(state) => state.language,
	(state) => state.menu,
	(theme, language, menu) => {
		return {
			theme,
			language,
			menu,
		};
	},
);

export const settingSelector = {
	all: (state) => selectAllState(state[SETTING]),
};
export const SETTING = slice.name;
export const settingReducer = slice.reducer;
export const settingAction = slice.actions;
