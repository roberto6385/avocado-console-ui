import {createSelector, createSlice} from '@reduxjs/toolkit';
import {fillTabs} from '../utils/redux';

const slice = createSlice({
	name: 'tabBar',
	initialState: {
		selectedTab: null,
		terminalTabs: [],
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
				if (action.payload.prevIndex > state.terminalTabs.length) {
					state.terminalTabs.push(newTab);
				} else {
					state.terminalTabs.splice(
						action.payload.prevIndex,
						0,
						newTab,
					);
				}
			} else {
				state.terminalTabs.push(newTab);
			}

			state.selectedTab = action.payload.uuid;
			state.selectedTab = fillTabs(
				state.terminalTabs,
				state.cols === 1 ? 1 : state.cols * 3,
				state.selectedTab,
			);
		},
		deleteTab: (state, action) => {
			state.terminalTabs = state.terminalTabs.filter(
				(v) => v.uuid !== action.payload,
			);
			state.selectedTab = fillTabs(
				state.terminalTabs,
				state.cols === 1 ? 1 : state.cols * 3,
				state.selectedTab,
			);
		},
		sortTab: (state, action) => {
			// todo react-beautiful-dnd 라이브러리로 전환하는게 좋을듯합니다.
			state.terminalTabs.splice(action.payload.oldOrder, 1);
			state.terminalTabs.splice(
				action.payload.newOrder,
				0,
				action.payload.newTab,
			);
		},
		setColumn: (state, action) => {
			state.cols = action.payload;
			state.selectedTab = fillTabs(
				state.terminalTabs,
				state.cols === 1 ? 1 : state.cols * 3,
				state.selectedTab,
			);
		},
		selectTab: (state, action) => {
			state.terminalTabs[
				state.terminalTabs.findIndex((v) => v.uuid === action.payload)
			].display = true;
			state.selectedTab = fillTabs(
				state.terminalTabs,
				state.cols === 1 ? 1 : state.cols * 3,
				state.selectedTab,
			);
		},
	},
});

const selectAllState = createSelector(
	(state) => state.terminalTabs,
	(state) => state.cols,
	(state) => state.selectedTab,
	(terminalTabs, cols, selectedTab) => {
		return {
			terminalTabs,
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
