import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import FavoriteServerOnDialogBox from './FavoriteServerOnDialogBox';
import {
	NavigationItem,
	NavigationItemTitle,
} from '../../../../styles/components/navigationBar';
import {
	arrowDownIcon,
	arrowRightIcon,
	folderIcon,
} from '../../../../icons/icons';
import Collapse_ from '../../../RecycleComponents/Collapse_';
import useInput from '../../../../hooks/useInput';
import {TextBox} from '../../../../styles/components/textBox';
import {Icon, IconButton} from '../../../../styles/components/icon';
import {useDoubleClick} from '../../../../hooks/useDoubleClick';
import FolderOnFavoritesContextMenu from '../../../ContextMenu/FolderOnFavoritesContextMenu';
import {useContextMenu} from 'react-contexify';
import {
	favoritesAction,
	favoritesSelector,
} from '../../../../reducers/favorites';

const Input_ = styled(TextBox)`
	height: 24px;
`;

const FolderOnFavoritesDialogBox = ({data, indent}) => {
	const dispatch = useDispatch();
	const {selectedFavoriteItemOnDialogBox, tempFavoriteGroupRenamingKey} =
		useSelector(favoritesSelector.all);
	const nameRef = useRef(null);
	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);
	const [isRenaming, setIsRenaming] = useState(false);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	const onClickFolderItemOnFavorites = useDoubleClick(
		() => {
			dispatch(favoritesAction.setSelectedFavoriteOnDialogBox(data.key));
			setIsRenaming(true);
		},
		() => {
			if (selectedFavoriteItemOnDialogBox === data.key) {
				dispatch(favoritesAction.setSelectedFavoriteOnDialogBox(null));
			} else {
				dispatch(
					favoritesAction.setSelectedFavoriteOnDialogBox(data.key),
				);
			}
		},
		[data, selectedFavoriteItemOnDialogBox],
	);

	const onClickFoldOrUnfoldFolder = useCallback(() => {
		setIsFolderUnfolded(!isFolderUnfolded);
	}, [isFolderUnfolded]);

	const onKeyDownChangeFolderName = useCallback(
		(e) => {
			if (e.keyCode === 27) {
				// ESC
				setIsRenaming(false);
				dispatch(
					favoritesAction.changeTempFavoriteGroupRenameKey(null),
				);
			} else if (e.keyCode === 13) {
				//Enter
				e.preventDefault();
				if (renameValue !== '') {
					dispatch(
						favoritesAction.changeTempGroupNameOnFavorites({
							key: data.key,
							name: renameValue,
						}),
					);
				} else {
					dispatch(
						favoritesAction.changeTempFavoriteGroupRenameKey(null),
					);
				}
				setIsRenaming(false);
			}
		},
		[data.key, dispatch, renameValue],
	);

	const {show} = useContextMenu({
		id: data.key + 'folder',
	});

	const openFolderOnFavoritesContextMenu = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(favoritesAction.setSelectedFavoriteOnDialogBox(data.key));
			show(e);
		},
		[data, dispatch, show],
	);

	const onBlurFolerNameTextBox = useCallback(() => {
		setIsRenaming(false);
		nameRef.current = null;
		dispatch(favoritesAction.changeTempFavoriteGroupRenameKey(null));
	}, [dispatch]);

	//this folder name has to be renamined
	useEffect(() => {
		if (data.key === tempFavoriteGroupRenamingKey) {
			setIsRenaming(true);
		}
	}, [tempFavoriteGroupRenamingKey, data]);
	//fill rename text box value
	useEffect(() => {
		const fillInForm = async () => {
			if (isRenaming) {
				await setRenameValue(data.name);
				await nameRef.current?.focus();
				await nameRef.current?.select();
			}
		};
		fillInForm();
	}, [isRenaming, nameRef, data, setRenameValue]);

	return (
		<React.Fragment>
			<NavigationItem
				selected={selectedFavoriteItemOnDialogBox === data.key ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
				onClick={onClickFolderItemOnFavorites}
				onContextMenu={openFolderOnFavoritesContextMenu}
			>
				<Icon
					margin_right={'12px'}
					size={'sm'}
					itype={
						selectedFavoriteItemOnDialogBox === data.key
							? 'selected'
							: undefined
					}
				>
					{folderIcon}
				</Icon>

				<NavigationItemTitle>
					{isRenaming ? (
						<Input_
							ref={nameRef}
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
								<FolderOnFavoritesDialogBox
									key={i.key}
									data={i}
									indent={indent + 1}
								/>
							) : (
								<FavoriteServerOnDialogBox
									key={i.key}
									data={i}
									indent={indent + 1}
								/>
							),
						)}
					</React.Fragment>
				</Collapse_>
			)}
			<FolderOnFavoritesContextMenu data={data} onDialog={true} />
		</React.Fragment>
	);
};

FolderOnFavoritesDialogBox.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FolderOnFavoritesDialogBox;
