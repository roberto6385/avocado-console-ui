import {createSelector, createSlice} from '@reduxjs/toolkit';
import {fillTabs} from '../utils/redux';

const slice = createSlice({
	name: 'tabBar',
	initialState: {
		selectedTab: null,
		tabs: [],
		cols: 1,
	},
	reducers: {
		addTab: (state, action) => {
			// todo 재연결 하는 부분 분리하는게 좋을까요? (reconnect를 분리...?)
			const newTab = {
				uuid: action.payload.uuid,
				type: action.payload.type,
				display: true,
				server: action.payload.server,
			};

			if (action.payload.prevUuid) {
				if (action.payload.prevIndex > state.tabs.length) {
					state.tabs.push(newTab);
				} else {
					state.tabs.splice(action.payload.prevIndex, 0, newTab);
				}
			} else {
				state.tabs.push(newTab);
			}

			state.selectedTab = action.payload.uuid;
			state.selectedTab = fillTabs(
				state.tabs,
				state.cols === 1 ? 1 : state.cols * 3,
				state.selectedTab,
			);
		},
		deleteTab: (state, action) => {
			state.tabs.filter((v) => v.uuid !== action.payload);
			state.selectedTab = fillTabs(
				state.tabs,
				state.cols === 1 ? 1 : state.cols * 3,
				action.payload,
			);
		},
		sortTab: (state, action) => {
			// todo react-beautiful-dnd 라이브러리로 전환하는게 좋을듯합니다.
			state.tabs.splice(action.payload.oldOrder, 1);
			state.tabs.splice(
				action.payload.newOrder,
				0,
				action.payload.newTab,
			);
		},
		setColumn: (state, action) => {
			state.cols = action.payload;
			state.selectedTab = fillTabs(
				state.tabs,
				state.cols === 1 ? 1 : state.cols * 3,
				state.selectedTab,
			);
		},
		selectTab: (state, action) => {
			state.tabs[
				state.tabs.findIndex((v) => v.uuid === action.payload)
			].display = true;
			state.selectedTab = fillTabs(
				state.tabs,
				state.cols === 1 ? 1 : state.cols * 3,
				action.payload,
			);
		},
	},
});

const selectAllState = createSelector(
	(state) => state.tabs,
	(state) => state.cols,
	(state) => state.selectedTab,
	(tabs, cols, selectedTab) => {
		return {
			tabs,
			cols,
			selectedTab,
		};
	},
);

export const tabBarSelector = {
	all: (state) => selectAllState(state[TAB_BAR]),
};
export const TAB_BAR = slice.name;
export const tabBarReducer = slice.reducer;
export const tabBarAction = slice.actions;
