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
		// TODO : 저번에 말씀하신대로 favoriteTree 에서 slice 해서 사용하면 되는데 dialog box 리스트를 사용하는 이유가 있나요?
		favoriteGroupRenamingKey: null, //favoriteFolderRenamingKey
		// TODO : dialog box 내에서만 이름 변경이 가능하다면 key값을 사용하지 않아도 될거같아요(?)
		tempFavoriteGroupRenamingKey: null, //tempFavoriteFolderRenamingKey
		// TODO : temp, normal 구분하는 이유?
		selectedFavoriteItemOnDialogBox: null,
		// TODO : selectedFavoriteItemOnDialogBox 이게 key 값으로 사용?
		favoriteGroupIndex: 0, //favorites_folder_index
		tempFavoriteGroupIndex: 0, //tempFavoriteFolderIndex
		// TODO : 기존 값 null 이였는데 현재 0으로 수정 => null 값이 맞나요?
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
		//DELETE_TEMP_FOLDER_ON_FAVORITES
		deleteGroup: (state, action) => {
			startDeleteingTree(state.favoriteTreeOnDialogBox, action.payload);
		},
		//SAVE_CHANGES_ON_FAVORITES
		setFavorites: (state) => {
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
