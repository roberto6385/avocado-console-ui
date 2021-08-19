import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'setting',
	initialState: {
		theme: 'light', // light, dark
		language: 'ko-KR', // language ko-KR - korean, en-US - english
		asideKey: null, // current setting menu item
		navigationKey: 'resources', //current_nav_tab
	},
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
		setLanguage: (state, action) => {
			state.language = action.payload;
		},
		setAsideKey: (state, action) => {
			state.asideKey = action.payload;
		},
		setNavKey: (state, action) => {
			state.navigationKey = action.payload;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.theme,
	(state) => state.language,
	(state) => state.asideKey,
	(state) => state.navigationKey,
	(theme, language, asideKey, navigationKey) => {
		return {
			theme,
			language,
			asideKey,
			navigationKey,
		};
	},
);

export const settingSelector = {
	all: (state) => selectAllState(state[SETTING]),
};
export const SETTING = slice.name;
export const settingReducer = slice.reducer;
export const settingAction = slice.actions;
