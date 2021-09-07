import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FavoriteOnDialogBox from './FavoriteOnDialogBox';
import {
	ResourceItem,
	ResourceItemTitle,
} from '../../../../styles/components/navigationBar';
import {
	arrowDownIcon,
	arrowRightIcon,
	folderIcon,
} from '../../../../icons/icons';
import CollapseContainer from '../../../RecycleComponents/CollapseContainer';
import useInput from '../../../../hooks/useInput';
import {TextBox} from '../../../../styles/components/textBox';
import {Icon, IconButton} from '../../../../styles/components/icon';
import {useDoubleClick} from '../../../../hooks/useDoubleClick';
import {
	favoritesAction,
	favoritesSelector,
} from '../../../../reducers/favorites';
import {useDispatch, useSelector} from 'react-redux';
import {
	remoteResourceAction,
	remoteResourceSelector,
} from '../../../../reducers/remoteResource';
import {useContextMenu} from 'react-contexify';

const _TextBox = styled(TextBox)`
	height: 24px;
`;

const FavoriteGroupOnDialogBox = ({data, indent}) => {
	const tempFavoriteTree = JSON.parse(
		localStorage.getItem('tempFavoriteTree'),
	);

	const tempFavoriteGroups = JSON.parse(
		localStorage.getItem('tempFavoriteGroups'),
	);
	const tempFavoriteGroupIndex = localStorage.getItem(
		'tempFavoriteGroupIndex',
	);
	const tempSelectedFavorites = JSON.parse(
		localStorage.getItem('tempSelectedFavorites'),
	);
	const tempFavoriteGroupRenamingKey = localStorage.getItem(
		'tempFavoriteGroupRenamingKey',
	);
	const nameRef = useRef(null);
	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);
	// const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');
	const [renameValue, setRenameValue] = useState('');

	const [clickFavorite, setclickFavorite] = useState(
		localStorage.getItem('tempSelectedFavorites'),
	);

	const [isSelectedFavorites, setIsSelectedFavorites] = useState([{}]);

	/*****************************************************/
	//  roberto - dialogLogout_update
	//
	/*****************************************************/
	const dispatch = useDispatch();
	const {selectedResource} = useSelector(remoteResourceSelector.all);
	const {favoriteGroupRenamingKey, favoriteGroups} = useSelector(
		favoritesSelector.all,
	);

	// const doSettingForRenaming = useCallback(async () => {
	// 	await setRenameValue(
	// 		tempFavoriteGroups.find((v) => v.id === data.id).name,
	// 	);
	// 	await nameRef.current?.focus();
	// 	await nameRef.current?.select();
	// }, [setRenameValue, favoriteGroups, data.id]);

	// useEffect(() => {
	// 	// console.log('kss', kss);
	// 	if (data.id === tempFavoriteGroupRenamingKey) {
	// 		doSettingForRenaming();
	// 	}
	// }, [data.id, doSettingForRenaming, diaData]);

	// useEffect(() => {
	// 	// console.log('kss', kss);
	// 	if (data.id === favoriteGroupRenamingKey) {
	// 		doSettingForRenaming();
	// 	}
	// }, [ data.id, doSettingForRenaming, diaData]);

	// const {show} = useContextMenu({
	// 	id: data.id + '-favorite-group-context-menu',
	// });
	// const openFavoriteGroupContextMenu = useCallback(
	// 	(e) => {
	// 		e.preventDefault();
	// 		dispatch(remoteResourceAction.setSelectedResource(data.id));
	// 		show(e);
	// 	},
	// 	[data.id, dispatch, show],
	// );

	/*****************************************************/

	/*****************************************************/
	//  roberto - dialogLogout_update
	//
	//  선택된 item localstorage 저장 힘스
	/*****************************************************/
	// const onClickFavoriteGroup = useDoubleClick(
	// 	() => {
	// 		//TODO: Rename folder
	// 	},
	// 	() => {
	// 		//TODO: If alreay selected Item => deselect
	// 		// If alreay deselected Item => select
	// 		// !!importand point : duplicate selection is possible
	// 	},
	// 	[],
	// );

	const onSelectFavorite = useCallback(
		(arr, sorted) => {
			if (arr.includes(sorted)) {
				const index = arr.indexOf(sorted);
				arr.splice(index, 1);
				localStorage.setItem(
					'tempSelectedFavorites',
					JSON.stringify(arr),
				);
			} else {
				arr.push(sorted);
				localStorage.setItem(
					'tempSelectedFavorites',
					JSON.stringify(arr),
				);
			}
			setclickFavorite((clickFavorite) => [...clickFavorite, arr]);

			setclickFavorite(arr);
		},
		[tempSelectedFavorites],
	);
	/*****************************************************/

	/*****************************************************/
	//  roberto - dialogLogout_update
	//
	// 선택된 item 이  click , doubleclick 일때 처리 함수
	/*****************************************************/
	const onClickFavoriteGroup = useDoubleClick(
		() => {
			//TODO: Rename folder
			dispatch(favoritesAction.changeFavoriteGroupRenameKey(data.id));

			localStorage.setItem('tempFavoriteGroupRenamingKey', data.id);
		},
		() => {
			if (selectedResource === data.id) {
				dispatch(remoteResourceAction.setSelectedResource(null));
			} else {
				dispatch(remoteResourceAction.setSelectedResource(data.id));
			}

			// onSelectFavorite(isSelectedFavorites, data.id);
			onSelectFavorite(
				JSON.parse(localStorage.getItem('tempSelectedFavorites')),
				data.id,
			);

			//TODO: If alreay selected Item => deselect
			// If alreay deselected Item => select
			// !!importand point : duplicate selection is possible
		},
		[
			data.id,
			selectedResource,
			dispatch,
			isSelectedFavorites,
			onSelectFavorite,
		],
	);
	/*****************************************************/

	//get olds values
	// Values = JSON.parse(localStorage.getItem('tempSelectedFavorites'));

	//saved values
	// const selcetFavoritePush = useCallback((arr) => {
	// 	arr.push(selectedResource);
	// 	localStorage.setItem('tempSelectedFavorites', JSON.stringify(arr));
	// });

	// const mapSelected =  (() =>{
	// arr.map((data,index)=> {
	// 	if (data === selectedResource){
	// 		console.log('1');
	//
	// 	}
	// 	}
	// });
	// const onClickFavoriteGroup = useDoubleClick(
	// 	() => {
	// 		//TODO: Rename folder
	//
	// 		dispatch(favoritesAction.changeFavoriteGroupRenameKey(data.id));
	// 		localStorage.setItem('tempFavoriteGroupRenamingKey', data.id);
	// 	},
	// 	() => {
	// 		console.log('클릭될놈:', selectedResource);
	//
	// 		if (selectedResource === data.id) {
	// 			dispatch(remoteResourceAction.setSelectedResource(null));
	// 		} else {
	// 			dispatch(remoteResourceAction.setSelectedResource(data.id));
	// 		}
	//
	// 		// console.log('아이디?:', data.id);
	// 		//TODO: If alreay selected Item => deselect
	// 		// If alreay deselected Item => select
	// 		// !!importand point : duplicate selection is possible
	//
	// 		// console.log(
	// 		// 	'localStorage.getItem):',
	// 		// 	localStorage.getItem('tempSelectedFavorites'),
	// 		// );
	//
	// 		arr = JSON.parse(localStorage.getItem('tempSelectedFavorites'));
	// 		console.log('click 시 arr 정보:', arr);
	// 		console.log('click 시 localstorage 정보:', localstorageget);
	// 		console.log('click 시 arr.length 정보:', arr.length);
	// 		console.log('click 시 favoriteGroups 정보:', favoriteGroups.length);
	// 		console.log('클릭된놈:', selectedResource);
	// 		if (arr.length < favoriteGroups.length) {
	// 			console.log('if실행');
	//
	// 			arr.push(selectedResource);
	// 			localStorage.setItem(
	// 				'tempSelectedFavorites',
	// 				JSON.stringify(arr),
	// 			);
	//
	// 			console.log('arr중간점검:', arr);
	//
	// 			arr.map((data, index) => {
	// 				console.log('map에서 돌리는 data:', data);
	// 				console.log('현재선댁된 data:', selectedResource);
	// 				if (data === selectedResource && !data) {
	// 					console.log('if');
	// 					console.log('삭제될데이터:', data);
	// 					arr.splice(index, 1);
	// 					localStorage.setItem(
	// 						'tempSelectedFavorites',
	// 						JSON.stringify(arr),
	// 					);
	// 				} else {
	// 					console.log('else');
	//
	// 					arr.push(selectedResource);
	// 					localStorage.setItem(
	// 						'tempSelectedFavorites',
	// 						JSON.stringify(arr),
	// 					);
	// 					console.log('추가된 arr:', arr);
	// 				}
	// 			});
	// 		} else {
	// 			console.log('else 실행');
	// 			arr.push(selectedResource);
	// 			localStorage.setItem(
	// 				'tempSelectedFavorites',
	// 				JSON.stringify(arr),
	// 			);
	// 		}
	// 		// arr.push(selectedResource);
	// 		// localStorage.setItem('tempSelectedFavorites', JSON.stringify(arr));
	// 		// });
	//
	// 		// if (localStorage.getItem('tempSelectedFavorites') != []) {
	// 		// 	JSON.parse(localStorage.getItem('tempSelectedFavorites')).map(
	// 		// 		(data, index) => {
	// 		// 			console.log(`어떤 data`, data);
	// 		//
	// 		// 			console.log('localstorage 정보:', localstorageget);
	// 		// 			console.log(`index번 실행중중`, index);
	// 		//
	// 		// 			if (data === selectedResource && data != null) {
	// 		// 				console.log(`index번 실행:`, index);
	// 		// 				console.log(`data?:`, data);
	// 		//
	// 		// 				localStorage.setItem(
	// 		// 					'tempSelectedFavorites',
	// 		// 					localstorageget.splice(index, 1),
	// 		// 				);
	// 		// 			} else {
	// 		// 				Values.push(selectedResource);
	// 		// 				localStorage.setItem(
	// 		// 					'tempSelectedFavorites',
	// 		// 					JSON.stringify(Values),
	// 		// 				);
	// 		// 			}
	// 		// 		},
	// 		//
	// 		// 		data === selectedResource
	// 		// 			? localStorage
	// 		// 				.getItem('tempSelectedFavorites')
	// 		// 				.splice(index, 1)
	// 		// 			: selcetFavoritePush(Values),
	// 		//
	// 		//
	// 		// 		Values.push(selectedResource);
	// 		// 		localStorage.setItem(
	// 		// 			'tempSelectedFavorites',
	// 		// 			JSON.stringify(Values),
	// 		// 	);
	// 		// }
	// 		// if (selectedResource === data.id) {
	// 		// 	//push new value
	// 		//
	// 		// 	// JSON.parse(localStorage.getItem('tempSelectedFavorites')).map(
	// 		// 	// 	(data, index) => {
	// 		// 	// 		console.log(`어떤 data`, data);
	// 		// 	//
	// 		// 	// 		console.log('localstorage 정보:', localstorageget);
	// 		// 	// 		console.log(`index번 실행중중`, index);
	// 		// 	//
	// 		// 	// 		if (data === selectedResource && data != null) {
	// 		// 	// 			console.log(`index번 실행:`, index);
	// 		// 	// 			console.log(`data?:`, data);
	// 		// 	//
	// 		// 	// 			localStorage.setItem(
	// 		// 	// 				'tempSelectedFavorites',
	// 		// 	// 				localstorageget.splice(index, 1),
	// 		// 	// 			);
	// 		// 	// 		}
	// 		// 	// 	},
	// 		// 	// );
	// 		//
	// 		// 	dispatch(remoteResourceAction.setSelectedResource(null));
	// 		// } else {
	// 		// 	dispatch(remoteResourceAction.setSelectedResource(data.id));
	// 		// }
	// 	},
	// 	[data.id, selectedResource, dispatch],
	// );
	/*****************************************************/

	/*****************************************************/
	//  roberto - dialogLogout_update
	//
	// item 이름 변경시 input event 처리 함수
	/*****************************************************/
	const onChangeRenameValue = (e) => {
		setRenameValue(e.target.value);
		console.log('renameValue:', renameValue);
	};
	/*****************************************************/

	const onClickFoldOrUnfoldFolder = useCallback(() => {
		setIsFolderUnfolded(!isFolderUnfolded);
	}, [isFolderUnfolded]);

	/*****************************************************/
	//  roberto - dialogLogout_update
	//
	//  item 이 Blur 처리 됬을때 실행 함수
	/*****************************************************/
	const onBlurFolerNameTextBox = useCallback(() => {
		//TODO: ignore rename

		// console.log('nameRef.current?.focus():', nameRef.current?.focus());
		// if (!nameRef.current?.focus()) {
		// 	console.log('kss', kss);
		// 	localStorage.setItem('tempFavoriteGroupRenamingKey', null);
		// }
		if (renameValue !== '') {
			// dispatch(
			// 	favoritesAction.changeFavoriteGroupName({
			// 		id: data.id,
			// 		name: renameValue,
			// 	}),
			// );
			tempFavoriteGroups.find((v) => v.id == data.id).name = renameValue;
			localStorage.setItem(
				'tempFavoriteGroups',
				JSON.stringify(tempFavoriteGroups),
			);
		} else {
			tempFavoriteGroups.find((v) => v.id == data.id).name = renameValue;
			console.log('tempFavoriteGroups', tempFavoriteGroups);

			localStorage.setItem(
				'tempFavoriteGroups',
				JSON.stringify(tempFavoriteGroups),
			);
			dispatch(favoritesAction.changeFavoriteGroupRenameKey(null));
			localStorage.setItem('tempFavoriteGroupRenamingKey', null);
		}
	}, [renameValue]);
	/*****************************************************/

	/*****************************************************/
	//  roberto - dialogLogout_update
	//
	//  키보드 입력에 따른 item 이름 변경 함수
	/*****************************************************/
	const onKeyDownChangeFolderName = useCallback(
		(e) => {
			if (e.keyCode === 27) {
				// ESC
				// localStorage.setItem('tempFavoriteGroupRenamingKey', null);
				//TODO: ignore rename
			} else if (e.keyCode === 13) {
				//Enter
				e.preventDefault();
				onBlurFolerNameTextBox;
				if (renameValue !== '') {
					setRenameValue(e.target.value);
				} else {
					setRenameValue(e.target.value);
				}
			}
		},
		[data.key, renameValue],
	);

	const doSettingForRenaming = useCallback(async () => {
		await setRenameValue(
			tempFavoriteGroups.find((v) => v.id === data.id).name,
		);
		await nameRef.current?.focus();
		await nameRef.current?.select();
	}, [setRenameValue, favoriteGroups, data.id]);

	// useEffect(() => {
	// 	console.log('언제실행되?');
	// 	if (data.id === favoriteGroupRenamingKey) {
	// 		doSettingForRenaming();
	// 	}
	// }, [favoriteGroupRenamingKey, data.id, doSettingForRenaming]);

	// useEffect(() => {
	// 	setIsFolderUnfolded(open);
	// }, [open]);

	return (
		<>
			<ResourceItem
				//TODO: if selected ? 1 : 0
				// selected={
				// (if selected)
				// 		? 1
				// 		: 0
				// }
				left={(indent * 11 + 8).toString() + 'px'}
				onClick={onClickFavoriteGroup}
				id={'sortable-favorite-group-tree' + data.id}
				data-id={data.id}
				tempSelectedFavorites
				selected={tempSelectedFavorites.includes(data.id) ? 1 : 0}

				// selected={selectedResource === data.id ? 1 : 0}
			>
				{/*다이얼로그박스 폴더 아이템들*/}
				<Icon
					margin_right={'12px'}
					size={'sm'}
					itype={tempSelectedFavorites.includes(data.id) ? 1 : 0}
					// itype={
					// 	selectedResource === data.id ? 'selected' : undefined
					// }
					//TODO: if selected ? 'selected : undefined
					// itype={
					// (if selected)
					// 		? 'selected'
					// 		: undefined
					// }
				>
					{folderIcon}
				</Icon>
				<ResourceItemTitle>
					{/*{data.id ===*/}
					{/*localStorage.getItem('tempFavoriteGroupRenamingKey')*/}
					{data.id === tempFavoriteGroupRenamingKey ? (
						<_TextBox
							ref={nameRef}
							type='text'
							value={renameValue}
							onChange={onChangeRenameValue}
							onKeyDown={onKeyDownChangeFolderName}
							onBlur={onBlurFolerNameTextBox}
						/>
					) : (
						tempFavoriteGroups.find((v) => v.id === data.id).name
					)}
				</ResourceItemTitle>
				{/*{화살표}*/}
				<IconButton
					size={'sm'}
					margin={'0px 0px 0px 12px'}
					onClick={onClickFoldOrUnfoldFolder}
				>
					{isFolderUnfolded ? arrowDownIcon : arrowRightIcon}
				</IconButton>
			</ResourceItem>
			{data.children.length !== 0 && (
				<CollapseContainer isOpened={isFolderUnfolded}>
					<React.Fragment>
						{/*열렸을떄*/}
						{data.children.map((v) =>
							v.type === 'resourceGroup' ? (
								<FavoriteGroupOnDialogBox
									key={v.id}
									data={v}
									indent={indent + 1}
								/>
							) : (
								<FavoriteOnDialogBox
									key={v.id}
									data={v}
									parents={data}
									indent={indent + 1}
								/>
							),
						)}
					</React.Fragment>
				</CollapseContainer>
			)}
		</>
	);
};

FavoriteGroupOnDialogBox.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FavoriteGroupOnDialogBox;
