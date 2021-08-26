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
			// Answer: 네!!! 그러는게 좋을꺼 같습니다.
			const newTab = {
				uuid: action.payload.uuid,
				type: action.payload.type,
				display: true,
				resourceId: action.payload.resourceId,
			};

			state.terminalTabs.push(newTab);

			state.selectedTab = fillTabs(
				state.terminalTabs,
				state.cols === 1 ? 1 : state.cols * 3,
				action.payload.uuid,
			);
		},

		reconnectTab: (state, action) => {
			const newTab = {
				uuid: action.payload.uuid,
				type: action.payload.type,
				display: true,
				resourceId: action.payload.resourceId,
			};

			state.terminalTabs.splice(action.payload.prevIndex, 0, newTab);

			state.selectedTab = fillTabs(
				state.terminalTabs,
				state.cols === 1 ? 1 : state.cols * 3,
				action.payload.uuid,
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

		sortTabs: (state, action) => {
			// todo react-beautiful-dnd 라이브러리로 전환하는게 좋을듯합니다.
			const newTab = state.terminalTabs[action.payload.startingIndex];
			state.terminalTabs.splice(action.payload.startingIndex, 1);
			state.terminalTabs.splice(action.payload.endIndex, 0, newTab);
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
			//TODO: prevent filter if not necessary
			if (
				state.terminalTabs.length > 0 &&
				state.terminalTabs.findIndex(
					(v) => v.uuid === action.payload,
				) !== -1
			) {
				state.terminalTabs[
					state.terminalTabs.findIndex(
						(v) => v.uuid === action.payload,
					)
				].display = true;
				state.selectedTab = fillTabs(
					state.terminalTabs,
					state.cols === 1 ? 1 : state.cols * 3,
					action.payload,
				);
			} else {
				state.selectedTab = null;
			}
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
