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
		favoriteTreeOnDialogBox: [], //tempFavorites
		favoriteGroupRenamingKey: null, //favoriteFolderRenamingKey
		tempFavoriteGroupRenamingKey: null, //tempFavoriteFolderRenamingKey
		selectedFavoriteItemOnDialogBox: null,
		favoriteGroupIndex: 0, //favorites_folder_index
		tempFavoriteGroupIndex: 0, //tempFavoriteFolderIndex
	},

	reducers: {
		//ADD_FOLDER_ON_FAVORITES
		addGroup: (state, action) => {
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
		// TODO : favoriteTree의 control이 dialog box 내에서만 가능하다는 전제
		deleteGroup: (state, action) => {
			startDeleteingTree(state.favoriteTree, action.payload);
		},
		//DELETE_TEMP_FOLDER_ON_FAVORITES
		deleteTempGroup: (state, action) => {
			startDeleteingTree(state.favoriteTreeOnDialogBox, action.payload);
		},
		//SAVE_CHANGES_ON_FAVORITES
		setFavorite: (state) => {
			state.favoriteTree = state.favoriteTreeOnDialogBox;
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

			state.favoriteTreeOnDialogBox = state.favoriteTree;
		},

		//ADD_FAVORITE_SERVER
		addFavorite: (state, action) => {
			//todo resourceTree에서 key 값으로 탐색 후 해당 서버의 정보를
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
		setSelectedFavoriteOnDialogBox: (state, action) => {
			state.selectedFavoriteItemOnDialogBox = action.payload;
		},
		//ADD_TEMP_FOLDER_ON_FAVORITES
		addFavoriteOnDialogBox: (state, action) => {
			const data = {
				type: 'folder',
				id: state.tempFavoriteGroupIndex,
				key: `f_${state.tempFavoriteGroupIndex}`,
				name: action.payload.name,
				contain: [],
			};

			addDataOnNode(
				state.favoriteTreeOnDialogBox,
				state.selectedFavoriteItemOnDialogBox,
				data,
			);

			state.tempFavoriteGroupRenamingKey = data.key;
			state.tempFavoriteGroupIndex++;
		},

		//SET_TEMP_FAVORITES
		setTempFavorite: (state) => {
			state.tempFavoriteGroupIndex = null;
			state.favoriteTreeOnDialogBox = null;
			state.tempFavoriteGroupRenamingKey = null;
			state.selectedFavoriteItemOnDialogBox = null;
		},

		//INIT_TEMP_FAVORITES
		initTempFavorite: (state) => {
			state.tempFavoriteGroupIndex = state.favoriteGroupIndex;
			state.favoriteTreeOnDialogBox = state.favoriteTree;
		},
		//CHANGE_FAVORITE_FOLDER_RENMAING_KEY
		changeFavoriteGroupRenameKey: (state, action) => {
			state.favoriteGroupRenamingKey = action.payload;
			// draft.selectedResource = action.payload;
		},
		//CHANGE_TEMP_FAVORITE_FOLDER_RENMAING_KEY
		changeTempFavoriteGroupRenameKey: (state, action) => {
			state.tempFavoriteGroupRenamingKey = action.payload;
			state.selectedFavoriteItemOnDialogBox = action.payload;
		},
		//CHANGE_TEMP_FOLDER_NAME_ON_FAVORITES
		changeTempGroupNameOnFavorites: (state, action) => {
			startSearchingNode(
				state.favoriteTreeOnDialogBox,
				action.payload.key,
			).name = action.payload.name;
			state.tempFavoriteGroupRenamingKey = null;
		},
	},
	extraReducers: {
		[settingAction.setNav]: (state) => {
			state.selectedFavorite = null;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.favoriteTree,
	(state) => state.favoriteTreeOnDialogBox,
	(state) => state.favoriteGroupRenamingKey,
	(state) => state.tempFavoriteGroupRenamingKey,
	(state) => state.selectedFavoriteItemOnDialogBox,
	(
		favoriteTree,
		favoriteTreeOnDialogBox,
		favoriteGroupRenamingKey,
		tempFavoriteGroupRenamingKey,
		selectedFavoriteItemOnDialogBox,
	) => {
		return {
			favoriteTree,
			favoriteTreeOnDialogBox,
			favoriteGroupRenamingKey,
			tempFavoriteGroupRenamingKey,
			selectedFavoriteItemOnDialogBox,
		};
	},
);

export const favoritesSelector = {
	all: (state) => selectAllState(state[FAVORITES]),
};
export const FAVORITES = slice.name;
export const favoritesReducer = slice.reducer;
export const favoritesAction = slice.actions;
