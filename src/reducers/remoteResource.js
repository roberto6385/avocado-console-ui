import {createSelector, createSlice} from '@reduxjs/toolkit';
import {settingAction} from './setting';

const slice = createSlice({
	name: 'remoteResources',
	initialState: {
		selectedResource: null, //clicked_server
		selectedServer: null, //current_resource_key
		// TODO : selectedResource로 Identities Resource Key까지 같이 사용 가능할거같아요. (우선은 기존대로 생성)
		//nav
		resourceTree: [
			{
				type: 'folder',
				id: 0,
				key: 'f_0',
				name: 'aws servers',
				contain: [
					{
						type: 'server',
						id: 0,
						key: 's_0',
						name: 'Open API',
						icon: 'aws',
					},
					{
						type: 'server',
						id: 1,
						key: 's_1',
						name: 'IAM',
						icon: 'aws',
					},
					{
						type: 'server',
						id: 2,
						key: 's_2',
						name: 'Authorization',
						icon: 'aws',
					},
					{
						type: 'server',
						id: 3,
						key: 's_3',
						name: 'Bastion',
						icon: 'aws',
					},
				],
			},
			{
				type: 'folder',
				id: 1,
				key: 'f_1',
				name: 'kt servers',
				contain: [
					{
						type: 'server',
						id: 4,
						key: 's_4',
						name: 'kt pilot',
						icon: 'linux',
					},
				],
			},
		],
		// TODO : id, name, icon 제거

		// server //todo resourceTree에서 정보를 들고있는게 좋을까 고민
		resources: [
			{
				key: 's_0',
				host: 'ip-172-31-7-236.ap-northeast-2.compute.internal',
				protocol: 'SSH2',
				port: 22,
			},
			{
				key: 's_1',
				host: 'ip-172-31-8-134.ap-northeast-2.compute.internal',
				protocol: 'SSH2',
				port: 22,
			},
			{
				key: 's_2',
				host: 'ip-172-31-5-58.ap-northeast-2.compute.internal',
				protocol: 'SSH2',
				port: 22,
			},
			{
				key: 's_3',
				host: 'ip-172-31-1-65.ap-northeast-2.compute.internal',
				protocol: 'SSH2',
				port: 22,
			},
			{
				key: 's_4',
				host: '211.253.10.9',
				protocol: 'SSH2',
				port: 10022,
			},
		],
		accounts: [
			{
				id: 0,
				identity_name: 'root',
				user: 'root',
				password: 'Netand141)',
				checked: true,
				type: 'Password',
				key: 's_0',
			},
			{
				id: 1,
				identity_name: 'root',
				user: 'root',
				password: 'Netand141)',
				checked: true,
				type: 'Password',
				key: 's_1',
			},
			{
				id: 2,
				identity_name: 'home',
				user: 'home',
				password: 'Netand141)',
				checked: false,
				type: 'Password',
				key: 's_1',
			},
			{
				id: 3,
				identity_name: 'root',
				user: 'root',
				password: 'Netand141)',
				checked: true,
				type: 'Password',
				key: 's_2',
			},
			{
				id: 4,
				identity_name: 'root',
				user: 'root',
				password: 'Netand141)',
				checked: true,
				type: 'Password',
				key: 's_3',
			},
			{
				id: 5,
				identity_name: 'user',
				user: 'user',
				password: 'Netand141)',
				checked: false,
				type: 'Password',
				key: 's_3',
			},
			{
				id: 6,
				identity_name: 'main',
				user: 'main',
				password: 'Netand141)',
				checked: false,
				type: 'Password',
				key: 's_3',
			},
			{
				id: 7,
				identity_name: 'home',
				user: 'home',
				password: 'Netand141)',
				checked: false,
				type: 'Password',
				key: 's_3',
			},
			{
				id: 8,
				identity_name: 'root',
				user: 'root',
				password: 'Netand141)',
				checked: true,
				type: 'Password',
				key: 's_4',
			},
		],
		// TODO : 내부적으로만 사용돼서 구분
		resourceIndex: 4, //server_index
		resourceGroupIndex: 2, //folder_index
	},

	reducers: {
		// TODO : Rbd => 드래그 앤 드롭 정렬 라이브러리 적용예정
	},
	extraReducers: {
		[settingAction.setNav]: (state) => {
			state.selectedResource = null;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.selectedResource,
	(state) => state.selectedResourceKey,
	(state) => state.resourceTree,
	(state) => state.resources,
	(state) => state.accounts,
	(
		selectedResource,
		selectedResourceKey,
		resourceTree,
		resources,
		accounts,
	) => {
		return {
			selectedResource,
			selectedResourceKey,
			resourceTree,
			resources,
			accounts,
		};
	},
);

export const remoteResourceSelector = {
	all: (state) => selectAllState(state[REMOTE_RESOURCE]),
};
export const REMOTE_RESOURCE = slice.name;
export const remoteResourceReducer = slice.reducer;
export const remoteResourceAction = slice.actions;
