import {createSelector, createSlice} from '@reduxjs/toolkit';
import {
	addDataOnNode,
	startDeleteingTree,
	startSearchingNode,
	startSearchingParentNode,
} from '../utils/redux';
import {settingAction} from './setting';

const slice = createSlice({
	name: 'favorites',
	initialState: {
		favoriteTree: [], //favorites
		selectedFavorite: null,
		favoriteGroupRenamingKey: null, //favoriteFolderRenamingKey
		favoriteGroupIndex: 0, //favorites_folder_index
		tempFavoriteTree: [], //tempFavorites
		tempSelectedFavorite: null,
		tempFavoriteGroupRenamingKey: null, //tempFavoriteFolderRenamingKey
		tempFavoriteGroupIndex: 0, //tempFavoriteFolderIndex
	},

	reducers: {
		//ADD_FOLDER_ON_FAVORITES
		addFavoriteGroup: (state, action) => {
			const data = {
				type: 'folder',
				id: state.favoriteGroupIndex,
				key: `f_${state.favoriteGroupIndex}`,
				name: action.payload.name,
				contain: [],
			};

			if (action.payload.key === 'favorites') {
				addDataOnNode(state.favoriteTree, state.selectedFavorite, data);
			}
			state.favoriteGroupRenamingKey = data.key;
			state.favoriteGroupIndex++;
		},

		deleteFavoriteGroup: (state, action) => {
			startDeleteingTree(state.favoriteTree, action.payload);
		},
		//DELETE_TEMP_FOLDER_ON_FAVORITES
		deleteTempFavoriteGroup: (state, action) => {
			startDeleteingTree(state.tempFavoriteTree, action.payload);
		},
		//SAVE_CHANGES_ON_FAVORITES
		updateFavorites: (state) => {
			state.favoriteTree = state.tempFavoriteTree;
			state.favoriteGroupIndex = state.tempFavoriteGroupIndex;
		},
		//SORT_FAVORITE_RESOURCES
		sortFavorites: (state, action) => {
			// 이동할 데이터의 부모
			const prevParent = startSearchingParentNode(
				state.favoriteTree,
				state.selectedFavorite,
			);
			// 이동할 데이터
			const prev = startSearchingNode(
				state.favoriteTree,
				state.selectedFavorite,
			);

			// 이동시킬 위치의 부모
			let nextParent = startSearchingParentNode(
				state.favoriteTree,
				action.payload.next.key,
			);
			// 이동시킬 위치
			const node = startSearchingNode(
				state.favoriteTree,
				action.payload.next.key,
			);

			if (
				prev === node ||
				(prevParent === state.favoriteTree &&
					action.payload.next === 'toEdge')
			)
				return;

			let i = 1;
			while (nextParent !== state.favoriteTree) {
				if (nextParent === prev) break;
				i = i + 1;
				nextParent = startSearchingParentNode(
					state.favoriteTree,
					nextParent.key,
				);
			}

			if (action.payload.next !== 'toEdge' && i !== action.payload.indent)
				return;

			if (action.payload.next === 'toEdge') {
				state.favoriteTree.push(prev);

				// 부모에서 이동시킨 데이터 삭제
				const index = prevParent.contain.indexOf(prev);
				prevParent.contain.splice(index, 1);
			} else {
				// 이동시킬 위치에 삭제한 데이터 추가
				if (node.contain) node.contain.push(prev);
				else node.push(prev);

				// 부모에서 이동시킨 데이터 삭제
				if (state.favoriteTree.includes(prev)) {
					const index = state.favoriteTree.indexOf(prev);
					state.favoriteTree.splice(index, 1);
				} else {
					const index = prevParent.contain.indexOf(prev);
					prevParent.contain.splice(index, 1);
				}
			}

			state.tempFavoriteTree = state.favoriteTree;
		},

		//ADD_FAVORITE_SERVER
		addFavorite: (state, action) => {
			//TODO: resourceTree에서 data 값으로 탐색 후 해당 서버의 정보를
			// payload에 담아서 favoriteTree에 넣어야 함
			state.favoriteTree.push(action.payload);
		},
		//DELETE_FAVORITE_SERVER
		deleteFavorite: (state, action) => {
			startDeleteingTree(state.favoriteTree, action.payload);
		},
		//CHANGE_FOLDER_NAME_ON_FAVORITES
		changeFavoriteGroupName: (state, action) => {
			startSearchingNode(state.favoriteTree, action.payload.key).name =
				action.payload.name;
			state.favoriteGroupRenamingKey = null;
		},
		//CHANGE_SELEECTED_TEMP_FAVORITE
		setTempSelectedFavorite: (state, action) => {
			state.tempSelectedFavorite = action.payload;
		},
		//ADD_TEMP_FOLDER_ON_FAVORITES
		addTempFavorite: (state, action) => {
			const data = {
				type: 'folder',
				id: state.tempFavoriteGroupIndex,
				key: `f_${state.tempFavoriteGroupIndex}`,
				name: action.payload.name,
				contain: [],
			};

			addDataOnNode(
				state.tempFavoriteTree,
				state.tempSelectedFavorite,
				data,
			);

			state.tempFavoriteGroupRenamingKey = data.key;
			state.tempFavoriteGroupIndex++;
		},

		//SET_TEMP_FAVORITES
		setTempFavorite: (state) => {
			state.tempFavoriteGroupIndex = null;
			state.tempFavoriteTree = null;
			state.tempFavoriteGroupRenamingKey = null;
			state.tempSelectedFavorite = null;
		},

		//INIT_TEMP_FAVORITES
		initTempFavorite: (state) => {
			state.tempFavoriteGroupIndex = state.favoriteGroupIndex;
			state.tempFavoriteTree = state.favoriteTree;
		},
		//CHANGE_FAVORITE_FOLDER_RENMAING_KEY
		changeFavoriteGroupRenameKey: (state, action) => {
			state.favoriteGroupRenamingKey = action.payload;
			// draft.selectedResource = action.payload;
		},
		//CHANGE_TEMP_FAVORITE_FOLDER_RENMAING_KEY
		changeTempFavoriteGroupRenameKey: (state, action) => {
			state.tempFavoriteGroupRenamingKey = action.payload;
			state.tempSelectedFavorite = action.payload;
		},
		//CHANGE_TEMP_FOLDER_NAME_ON_FAVORITES
		changeTempFavoriteGroupName: (state, action) => {
			startSearchingNode(
				state.tempFavoriteTree,
				action.payload.key,
			).name = action.payload.name;
			state.tempFavoriteGroupRenamingKey = null;
		},
	},
	extraReducers: {
		[settingAction.setNavKey]: (state) => {
			state.selectedFavorite = null;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.favoriteTree,
	(state) => state.tempFavoriteTree,
	(state) => state.favoriteGroupRenamingKey,
	(state) => state.tempFavoriteGroupRenamingKey,
	(state) => state.tempSelectedFavorite,
	(
		favoriteTree,
		tempFavoriteTree,
		favoriteGroupRenamingKey,
		tempFavoriteGroupRenamingKey,
		tempSelectedFavorite,
	) => {
		return {
			favoriteTree,
			tempFavoriteTree,
			favoriteGroupRenamingKey,
			tempFavoriteGroupRenamingKey,
			tempSelectedFavorite,
		};
	},
);

export const favoritesSelector = {
	all: (state) => selectAllState(state[FAVORITES]),
};
export const FAVORITES = slice.name;
export const favoritesReducer = slice.reducer;
export const favoritesAction = slice.actions;
