import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import useInput from '../../../hooks/useInput';
import Collapse_ from '../../RecycleComponents/Collapse_';
import {arrowDownIcon, arrowRightIcon, folderIcon} from '../../../icons/icons';
import FavoriteServer from './FavoriteServer';
import FolderOnFavoritesContextMenu from '../../ContextMenu/FolderOnFavoritesContextMenu';
import {Icon, IconButton} from '../../../styles/components/icon';
import styled from 'styled-components';
import {
	NavigationItemTitle,
	NavigationItem,
} from '../../../styles/components/navigationBar';
import {TextBox} from '../../../styles/components/textBox';
import {useDoubleClick} from '../../../hooks/useDoubleClick';
import {
	remoteResourceAction,
	remoteResourceSelector,
} from '../../../reducers/remoteResource';
import {favoritesAction, favoritesSelector} from '../../../reducers/favorites';
const Input_ = styled(TextBox)`
	height: 24px;
`;

const FolderOnFavorites = ({open, data, indent}) => {
	const dispatch = useDispatch();
	const {selectedResource} = useSelector(remoteResourceSelector.all);
	const {favoriteGroupRenamingKey} = useSelector(favoritesSelector.all);

	const renameRef = useRef(null);
	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);
	const [isRenaming, setIsRenaming] = useState(false);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	const onClickFolderItem = useDoubleClick(
		() => {
			dispatch(remoteResourceAction.setSelectedResource(data.key));
			setIsRenaming(true);
		},
		() => {
			if (selectedResource === data.key) {
				dispatch(remoteResourceAction.setSelectedResource(null));
			} else {
				dispatch(remoteResourceAction.setSelectedResource(data.key));
			}
		},
		[data],
	);

	const onClickFoldOrUnfoldFolder = useCallback(() => {
		setIsFolderUnfolded(!isFolderUnfolded);
	}, [isFolderUnfolded]);

	const {show} = useContextMenu({
		id: data.key + 'folder',
	});

	const openFolderOnFavoritesContextMenu = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(remoteResourceAction.setSelectedResource(data.key));
			show(e);
		},
		[data.key, dispatch, show],
	);

	const onKeyDownChangeFolderName = useCallback(
		(e) => {
			if (e.keyCode === 27) {
				// ESC
				setIsRenaming(false);
				dispatch(favoritesAction.changeFavoriteGroupRenameKey(null));
			} else if (e.keyCode === 13) {
				//Enter
				e.preventDefault();

				if (renameValue !== '') {
					//TODO: check valid folder name value
					dispatch(
						favoritesAction.changeFavoriteGroupName({
							key: data.key,
							name: renameValue,
						}),
					);
				} else {
					dispatch(
						favoritesAction.changeFavoriteGroupRenameKey(null),
					);
				}
				setIsRenaming(false);
			}
		},
		[dispatch, renameValue, data],
	);

	const prevPutItem = useCallback(() => {
		console.log('prev put item');
		dispatch(remoteResourceAction.setSelectedResource(data.key));
	}, [data.key, dispatch]);

	const nextPutItem = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			console.log('favorite folder next put item');

			data.type === 'folder' &&
				dispatch(
					favoritesAction.sortFavorites({
						next: data,
						indent: parseInt(indent),
					}),
				);
		},
		[data, dispatch, indent],
	);

	const handleDragOver = useCallback((e) => {
		e.stopPropagation();
		e.preventDefault();
	}, []);

	const onBlurFolerNameTextBox = useCallback(() => {
		setIsRenaming(false);
		renameRef.current = null;
		dispatch(favoritesAction.changeFavoriteGroupRenameKey(null));
	}, []);
	//fill rename text box value
	useEffect(() => {
		const fillInForm = async () => {
			if (isRenaming) {
				await setRenameValue(data.name);
				await renameRef.current?.focus();
				await renameRef.current?.select();
			}
		};
		fillInForm();
	}, [isRenaming, renameRef, data, setRenameValue]);
	//this folder name has to be renamined
	useEffect(() => {
		if (data.key === favoriteGroupRenamingKey) {
			setIsRenaming(true);
		}
	}, [favoriteGroupRenamingKey, data]);

	useEffect(() => {
		setIsFolderUnfolded(open);
	}, [open]);

	return (
		<React.Fragment>
			<NavigationItem
				onClick={onClickFolderItem}
				onContextMenu={openFolderOnFavoritesContextMenu}
				draggable='true'
				onDragStart={prevPutItem}
				onDragOver={handleDragOver}
				onDrop={nextPutItem}
				selected={selectedResource === data.key ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					margin_right={'12px'}
					size={'sm'}
					itype={
						selectedResource === data.key ? 'selected' : undefined
					}
				>
					{folderIcon}
				</Icon>

				<NavigationItemTitle>
					{isRenaming ? (
						<Input_
							ref={renameRef}
							type='text'
							value={renameValue}
							onChange={onChangeRenameValue}
							onKeyDown={onKeyDownChangeFolderName}
							onBlur={onBlurFolerNameTextBox}
						/>
					) : (
						data.name
					)}
				</NavigationItemTitle>
				<IconButton
					size={'sm'}
					margin={'0px 0px 0px 12px'}
					onClick={onClickFoldOrUnfoldFolder}
				>
					{isFolderUnfolded ? arrowDownIcon : arrowRightIcon}
				</IconButton>
			</NavigationItem>
			{data.contain.length !== 0 && (
				<Collapse_ open={isFolderUnfolded}>
					<React.Fragment>
						{data.contain.map((i) =>
							i.type === 'folder' ? (
								<FolderOnFavorites
									key={i.key}
									open={open}
									data={i}
									indent={indent + 1}
								/>
							) : (
								<FavoriteServer
									key={i.key}
									data={i}
									indent={indent + 1}
								/>
							),
						)}
					</React.Fragment>
				</Collapse_>
			)}
			<FolderOnFavoritesContextMenu data={data} />
		</React.Fragment>
	);
};

FolderOnFavorites.propTypes = {
	open: PropTypes.bool.isRequired,
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FolderOnFavorites;
