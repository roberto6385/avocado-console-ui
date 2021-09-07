import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import {useDispatch, useSelector} from 'react-redux';
import {Icon} from '../../../../styles/components/icon';
import {
	ResourceItem,
	ResourceItemTitle,
} from '../../../../styles/components/navigationBar';
import {awsServerIcon, linuxServerIcon} from '../../../../icons/icons';
import {
	remoteResourceAction,
	remoteResourceSelector,
} from '../../../../reducers/remoteResource';

const FavoriteOnDialogBox = ({data, indent, parents}) => {
	const {resources} = useSelector(remoteResourceSelector.all);
	const resource = useMemo(
		() => resources.find((v) => v.id === data.id),
		[resources, data.id],
	);
	/************************************************************************/
	//
	//	roberto - dialogLogout_update
	//
	/************************************************************************/
	const dispatch = useDispatch();
	const tempSelectedFavoritesChildren = JSON.parse(
		localStorage.getItem('tempSelectedFavoritesChildren'),
	);
	const tempSelectedFavoritesTree = JSON.parse(
		localStorage.getItem('tempSelectedFavoritesTree'),
	);
	const [clickFavorite, setclickFavorite] = useState(
		localStorage.getItem('tempSelectedFavoritesTree'),
	);
	/*************************************************************/
	//  click  됬을떄 해당 parents의 id 가 있는지
	/*************************************************************/
	// const isClick = useCallback((data) => {
	// 	if (data.id === sorted);
	// 	return true;
	// });
	/*************************************************************/

	/*************************************************************/
	//  childernId 제거
	/*************************************************************/
	const removeChidrenId = useCallback((arr, sorted) => {
		const index = arr.indexOf(sorted);
		arr.splice(index, 1);
		return arr;
	});

	/*************************************************************/

	/*************************************************************/
	// childernId 추가
	/*************************************************************/
	const addChidrenId = useCallback((arr, sorted) => {
		arr.push(sorted);
		return arr;
	});
	/*************************************************************/

	/*************************************************************/
	//  get localstorage
	/*************************************************************/
	const getLocalstorage = useCallback((key) => {
		JSON.parse(localStorage.getItem(key));
	});

	/*************************************************************/

	/*************************************************************/
	//  set localstorage
	/*************************************************************/
	const setLocalstorage = useCallback((key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	});
	/*************************************************************/

	/*************************************************************/
	//  자식요소 확인하기
	/*************************************************************/
	const clickCheck = useCallback((select) => {
		const click = JSON.parse(
			localStorage.getItem('tempSelectedFavoritesChildren'),
		).includes(select);
		console.log(click);
	});

	/*************************************************************/

	/*************************************************************/
	//  자식요소 확인하기
	/*************************************************************/
	const selectedChild = useCallback(() => {
		console.log('?', tempSelectedFavoritesTree);

		if (tempSelectedFavoritesTree) {
			tempSelectedFavoritesTree
				.find((v) => v.id === data)
				.children.includes(data.id)
				? 1
				: 0;
		} else {
			return false;
		}
	}, [tempSelectedFavoritesTree]);
	/*************************************************************/

	/*************************************************************/
	//  자식요소 클릭
	/*************************************************************/
	const 자식요소클릭 = useCallback((data, parentsId, childrenId) => {
		console.log('tempSelectedFavoritesTree:', data);
		console.log('parents.id:', parentsId);
		console.log('data.id:', childrenId);

		const selectedChild = JSON.parse(
			localStorage.getItem('tempSelectedFavoritesTree'),
		);
		const isParent = data.find((v) => v.id === parentsId);
		if (isParent) {
			//childrenId 포함되어 있는지 ?
			if (isParent.childrenId.includes(childrenId)) {
				//포함되 있다면 childernId 제거
				selectedChild.find((v) => v.id === parentsId).childrenId =
					removeChidrenId(isParent.childrenId, childrenId);
				localStorage.setItem(
					'tempSelectedFavoritesTree',
					JSON.stringify(selectedChild),
				);
				return false;
			} else {
				//포함되지 않았다면 childernId 추가
				selectedChild.find((v) => v.id === parentsId).childrenId =
					addChidrenId(isParent.childrenId, childrenId);
				localStorage.setItem(
					'tempSelectedFavoritesTree',
					JSON.stringify(selectedChild),
				);
				return true;
			}
		} else {
			const object = {
				id: parentsId,
				childrenId: [childrenId],
			};
			selectedChild.push(object);
			localStorage.setItem(
				'tempSelectedFavoritesTree',
				JSON.stringify(selectedChild),
			);
			return true;
		}
	});
	/*************************************************************/

	const onSelectFavorite = useCallback((arr, sorted) => {
		if (arr.includes(sorted)) {
			const index = arr.indexOf(sorted);
			arr.splice(index, 1);
			localStorage.setItem(
				'tempSelectedFavoritesChildren',
				JSON.stringify(arr),
			);
		} else {
			arr.push(sorted);
			localStorage.setItem(
				'tempSelectedFavoritesChildren',
				JSON.stringify(arr),
			);
		}
		setclickFavorite((clickFavorite) => [...clickFavorite, arr]);

		setclickFavorite(arr);
	}, []);

	const onClickFavorite = useCallback(() => {
		//TODO: If alreay selected Item => deselect
		// If alreay deselected Item => select
		// !!importand point : duplicate selection is possible
		const tempSelectedFavoritesTree = JSON.parse(
			localStorage.getItem('tempSelectedFavoritesTree'),
		);
		const tempSelectedFavoritesChildren = JSON.parse(
			localStorage.getItem('tempSelectedFavoritesChildren'),
		);
		// if (selectedResource === data.id) {
		// 	dispatch(remoteResourceAction.setSelectedResource(null));
		// } else {
		// 	dispatch(remoteResourceAction.setSelectedResource(data.id));
		// }
		// onSelectFavorite(tempSelectedFavoritesTree, data.id);
		console.log('클릭!');
		onSelectFavorite(tempSelectedFavoritesChildren, data.id);
		자식요소클릭(tempSelectedFavoritesTree, parents.id, data.id);
	});

	/************************************************************************/
	// const onClickFavorite = useCallback(() => {
	// 	//TODO: If alreay selected Item => deselect
	// 	// If alreay deselected Item => select
	// 	// !!importand point : duplicate selection is possible
	// }, []);

	return (
		<React.Fragment>
			{/*다이얼로그박스 폴더안에 서버아이템들*/}
			<ResourceItem
				//TODO: if selected ? 1 : 0
				// selected={
				// (if selected)
				// 		? 1
				// 		: 0
				// }
				left={(indent * 11 + 8).toString() + 'px'}
				onClick={onClickFavorite}
				selected={
					tempSelectedFavoritesChildren.includes(data.id) ? 1 : 0
				}
			>
				<Icon
					size={'sm'}
					margin_right={'12px'}
					//TODO: if selected ? 'selected : undefined
					// itype={
					// (if selected)
					// 		? 'selected'
					// 		: undefined
					// }
				>
					{resource.data.osType === 'linux' && linuxServerIcon}
					{resource.data.osType === 'aws' && awsServerIcon}
				</Icon>
				<ResourceItemTitle>{resource.name}</ResourceItemTitle>
			</ResourceItem>
		</React.Fragment>
	);
};

FavoriteOnDialogBox.propTypes = {
	data: PropTypes.object.isRequired,
	parents: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FavoriteOnDialogBox;
