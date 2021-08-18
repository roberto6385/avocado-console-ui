import {createSelector, createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'setting',
	initialState: {
		theme: 'light', // light, dark
		language: 'ko-KR', // language ko-KR - korean, en-US - english
		aside: null, // current setting menu item
		navigation: 'resources', //current_nav_tab
	},
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
		setLanguage: (state, action) => {
			state.language = action.payload;
		},
		setAside: (state, action) => {
			state.aside = action.payload;
		},
		setNav: (state, action) => {
			state.navigation = action.payload;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.theme,
	(state) => state.language,
	(state) => state.aside,
	(state) => state.navigation,
	(theme, language, aside, navigation) => {
		return {
			theme,
			language,
			aside,
			navigation,
		};
	},
);

export const settingSelector = {
	all: (state) => selectAllState(state[SETTING]),
};
export const SETTING = slice.name;
export const settingReducer = slice.reducer;
export const settingAction = slice.actions;
