import {createSelector, createSlice} from '@reduxjs/toolkit';
import {settingAction} from './setting';

const slice = createSlice({
	name: 'remoteResources',
	initialState: {
		selectedResource: null,

		resourceTree: [
			{
				type: 'resourceGroup',
				id: 'f_0',
				parents: null,
				path: '/f_0',
				children: [
					{
						type: 'resource',
						id: 's_0',
						parents: 'f_0',
						path: '/f_0/s_0',
					},
					{
						type: 'resource',
						id: 's_1',
						parents: 'f_0',
						path: '/f_0/s_1',
					},
					{
						type: 'resource',
						id: 's_2',
						parents: 'f_0',
						path: '/f_0/s_2',
					},
					{
						type: 'resource',
						id: 's_3',
						parents: 'f_0',
						path: '/f_0/s_3',
					},
				],
			},
			{
				type: 'resourceGroup',
				id: 'f_1',
				parents: null,
				path: '/f_1',
				children: [
					{
						type: 'resource',
						id: 's_4',
						parents: 'f_1',
						path: '/f_1/s_4',
					},
				],
			},
		],

		resourceGroups: [
			{id: 'f_0', name: 'aws servers', data: {}},
			{id: 'f_1', name: 'kt servers', data: {}},
		],

		resources: [
			{
				id: 's_0',
				type: 'PC',
				name: 'Open API',
				data: {
					osType: 'aws',
				},
			},
			{
				id: 's_1',
				type: 'PC',
				name: 'IAM',
				data: {
					osType: 'aws',
				},
			},
			{
				id: 's_2',
				type: 'PC',
				name: 'Authorization',
				data: {
					osType: 'aws',
				},
			},
			{
				id: 's_3',
				type: 'PC',
				name: 'Bastion',
				data: {
					osType: 'aws',
				},
			},
			{
				id: 's_4',
				type: 'PC',
				name: 'kt pilot',
				data: {
					osType: 'linux',
				},
			},
		],

		computingSystemServicePorts: [
			{
				id: 's_0',
				host: 'ip-172-31-7-236.ap-northeast-2.compute.internal',
				protocol: 'SSH2',
				port: 22,
			},
			{
				id: 's_1',
				host: 'ip-172-31-8-134.ap-northeast-2.compute.internal',
				protocol: 'SSH2',
				port: 22,
			},
			{
				id: 's_2',
				host: 'ip-172-31-5-58.ap-northeast-2.compute.internal',
				protocol: 'SSH2',
				port: 22,
			},
			{
				id: 's_3',
				host: 'ip-172-31-1-65.ap-northeast-2.compute.internal',
				protocol: 'SSH2',
				port: 22,
			},
			{
				id: 's_4',
				host: '211.253.10.9',
				protocol: 'SSH2',
				port: 10022,
			},
		],

		accounts: [
			{
				id: 0,
				name: 'Root',
				user: 'root',
				password: 'Netand141)',
				isDefaultAccount: true,
				type: 'Password',
				resourceId: 's_0',
			},
			{
				id: 1,
				name: 'Root',
				user: 'root',
				password: 'Netand141)',
				isDefaultAccount: true,
				type: 'Password',
				resourceId: 's_1',
			},
			{
				id: 2,
				name: 'Home',
				user: 'home',
				password: 'Netand141)',
				isDefaultAccount: false,
				type: 'Password',
				resourceId: 's_1',
			},
			{
				id: 3,
				name: 'Root',
				user: 'root',
				password: 'Netand141)',
				isDefaultAccount: true,
				type: 'Password',
				resourceId: 's_2',
			},
			{
				id: 4,
				name: 'Root',
				user: 'root',
				password: 'Netand141)',
				isDefaultAccount: true,
				type: 'Password',
				resourceId: 's_3',
			},
			{
				id: 5,
				name: 'User',
				user: 'user',
				password: 'Netand141)',
				isDefaultAccount: false,
				type: 'Password',
				resourceId: 's_3',
			},
			{
				id: 6,
				name: 'Main',
				user: 'main',
				password: 'Netand141)',
				isDefaultAccount: false,
				type: 'Password',
				resourceId: 's_3',
			},
			{
				id: 7,
				name: 'Home',
				user: 'home',
				password: 'Netand141)',
				isDefaultAccount: false,
				type: 'Password',
				resourceId: 's_3',
			},
			{
				id: 8,
				name: 'Root',
				user: 'root',
				password: 'Netand141)',
				isDefaultAccount: true,
				type: 'Password',
				resourceId: 's_4',
			},
		],
	},

	reducers: {
		// TODO : Rbd => 드래그 앤 드롭 정렬 라이브러리 적용예정
		//SET_CLICKED_SERVER
		setSelectedResource: (state, action) => {
			state.selectedResource = action.payload;
		},
		//CHANGE_PROTOCOL
		setProtocol: (state, action) => {
			state.computingSystemServicePorts.find(
				(v) => v.id === action.payload.id,
			).protocol = action.payload.protocol;
		},
		//CHANGE_IDENTITY_CHECKED
		setAccount: (state, action) => {
			let fisrtIndex = state.accounts.findIndex(
				(v) => v.id === action.payload.prev,
			);
			let secondIndex = state.accounts.findIndex(
				(v) => v.id === action.payload.next,
			);

			if (fisrtIndex > secondIndex) {
				fisrtIndex = secondIndex;
				secondIndex = state.accounts.findIndex(
					(v) => v.id === action.payload.prev,
				);
			}

			state.accounts = [
				...state.accounts.slice(0, fisrtIndex),
				{
					...state.accounts[fisrtIndex],
					isDefaultAccount:
						!state.accounts[fisrtIndex].isDefaultAccount,
				},
				...state.accounts.slice(fisrtIndex + 1, secondIndex),
				{
					...state.accounts[secondIndex],
					isDefaultAccount:
						!state.accounts[secondIndex].isDefaultAccount,
				},
				...state.accounts.slice(secondIndex + 1),
			];
		},
	},
	extraReducers: {
		[settingAction.setNavKey]: (state) => {
			state.selectedResource = null;
		},
	},
});

const selectAllState = createSelector(
	(state) => state.selectedResource,
	(state) => state.selectedResourceKey,
	(state) => state.resourceTree,
	(state) => state.resourceGroups,
	(state) => state.resources,
	(state) => state.computingSystemServicePorts,
	(state) => state.accounts,
	(
		selectedResource,
		selectedResourceKey,
		resourceTree,
		resourceGroups,
		resources,
		computingSystemServicePorts,
		accounts,
	) => {
		return {
			selectedResource,
			selectedResourceKey,
			resourceTree,
			resourceGroups,
			resources,
			computingSystemServicePorts,
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
