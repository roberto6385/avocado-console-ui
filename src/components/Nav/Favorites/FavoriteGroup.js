import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';

import useInput from '../../../hooks/useInput';
import CollapseContainer from '../../RecycleComponents/CollapseContainer';
import {arrowDownIcon, arrowRightIcon, folderIcon} from '../../../icons/icons';
import Favorite from './Favorite';
import FavoriteGroupContextMenu from '../../ContextMenus/FavoriteGroupContextMenu';
import {Icon, IconButton} from '../../../styles/components/icon';
import styled from 'styled-components';
import {
	ResourceItemTitle,
	ResourceItem,
} from '../../../styles/components/navigationBar';
import {TextBox} from '../../../styles/components/textBox';
import {useDoubleClick} from '../../../hooks/useDoubleClick';
import {
	remoteResourceAction,
	remoteResourceSelector,
} from '../../../reducers/remoteResource';
import {favoritesAction, favoritesSelector} from '../../../reducers/favorites';

const _TextBox = styled(TextBox)`
	height: 24px;
`;

const FavoriteGroup = ({open, data, indent}) => {
	const dispatch = useDispatch();
	const {selectedResource} = useSelector(remoteResourceSelector.all);
	const {favoriteGroupRenamingKey, favoriteGroups} = useSelector(
		favoritesSelector.all,
	);

	const nameRef = useRef(null);
	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	const onClickFolder = useDoubleClick(
		() => {
			dispatch(favoritesAction.changeFavoriteGroupRenameKey(data.id));
		},
		() => {
			if (selectedResource === data.id) {
				dispatch(remoteResourceAction.setSelectedResource(null));
			} else {
				dispatch(remoteResourceAction.setSelectedResource(data.id));
			}
		},
		[data.id, selectedResource, dispatch],
	);

	const onClickFoldOrUnfoldFolder = useCallback(() => {
		setIsFolderUnfolded(!isFolderUnfolded);
	}, [isFolderUnfolded]);

	const {show} = useContextMenu({
		id: data.id + '-favorite-group-context-menu',
	});

	const openFavoriteGroupContextMenu = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(remoteResourceAction.setSelectedResource(data.id));
			show(e);
		},
		[data.id, dispatch, show],
	);

	const onSubmitFolderName = useCallback(() => {
		if (renameValue !== '') {
			dispatch(
				favoritesAction.changeFavoriteGroupName({
					id: data.id,
					name: renameValue,
				}),
			);
		} else {
			dispatch(favoritesAction.changeFavoriteGroupRenameKey(null));
		}
	}, [dispatch, renameValue, data.id]);

	const onKeyDownChangeFolderName = useCallback(
		(e) => {
			if (e.keyCode === 27) {
				// ESC
				dispatch(favoritesAction.changeFavoriteGroupRenameKey(null));
			} else if (e.keyCode === 13) {
				//Enter
				e.preventDefault();
				onSubmitFolderName();
			}
		},
		[dispatch, onSubmitFolderName],
	);

	const doSettingForRenaming = useCallback(async () => {
		await setRenameValue(favoriteGroups.find((v) => v.id === data.id).name);
		await nameRef.current?.focus();
		await nameRef.current?.select();
	}, [setRenameValue, favoriteGroups, data.id]);

	// const onDragStart = useCallback(() => {
	// 	dispatch(remoteResourceAction.setSelectedResource(data.id));
	// }, [dispatch, data.id]);
	//
	// const onDrop = useCallback(
	// 	(e) => {
	// 		e.stopPropagation();
	// 		//
	// 		// if (data.type === 'resourceGroup') {
	// 		// 	console.log('HERERERER');
	// 		// 	dispatch(
	// 		// 		remoteResourceAction.sortFavorites({
	// 		// 			start: selectedResource,
	// 		// 			end: data.id,
	// 		// 		}),
	// 		// 	);
	// 		// }
	// 	},
	// 	[data, dispatch],
	// );

	// useEffect(() => {
	// 	const sortableResources = document.getElementById(
	// 		'sortable-favorite-group-tree' + data.id,
	// 	);
	// 	sortableResources !== null &&
	// 		Sortable.create(sortableResources, {
	// 			sort: true,
	// 			group: 'sortable-favorite-group-tree' + data.id,
	// 			fallbackOnBody: true,
	// 			animation: 150,
	// 			// swapThreshold: 0.65,
	// 			dataIdAttr: 'data-id',
	// 			store: {
	// 				set: function (sortable) {
	// 					console.log(sortable.toArray());
	// 				},
	// 			},
	// 		});
	// }, []);

	useEffect(() => {
		console.log('tree 에서 넘겨주는 data', data);
		if (data.id === favoriteGroupRenamingKey) {
			doSettingForRenaming();
		}
	}, [favoriteGroupRenamingKey, data.id, doSettingForRenaming]);

	useEffect(() => {
		setIsFolderUnfolded(open);
	}, [open]);

	return (
		<>
			<ResourceItem
				id={'sortable-favorite-group-tree' + data.id}
				data-id={data.id}
				onClick={onClickFolder}
				onContextMenu={openFavoriteGroupContextMenu}
				// draggable='true'
				selected={selectedResource === data.id ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					margin_right={'12px'}
					size={'sm'}
					itype={
						selectedResource === data.id ? 'selected' : undefined
					}
				>
					{folderIcon}
				</Icon>

				<ResourceItemTitle>
					{data.id === favoriteGroupRenamingKey ? (
						<_TextBox
							ref={nameRef}
							type='text'
							value={renameValue}
							onChange={onChangeRenameValue}
							onKeyDown={onKeyDownChangeFolderName}
							onBlur={onSubmitFolderName}
						/>
					) : (
						favoriteGroups.find((v) => v.id === data.id).name
					)}
				</ResourceItemTitle>
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
						{data.children.map((v) =>
							v.type === 'resourceGroup' ? (
								<FavoriteGroup
									key={v.id}
									open={open}
									data={v}
									indent={indent + 1}
								/>
							) : (
								<Favorite
									key={v.id}
									data={v}
									indent={indent + 1}
								/>
							),
						)}
					</React.Fragment>
				</CollapseContainer>
			)}
			<FavoriteGroupContextMenu
				resourceGroupId={data.id}
				setIsFolderUnfolded={setIsFolderUnfolded}
			/>
		</>
	);
};

FavoriteGroup.propTypes = {
	open: PropTypes.bool.isRequired,
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FavoriteGroup;
