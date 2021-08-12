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
import {Input} from '../../../../styles/components/input';
import {Icon, IconButton} from '../../../../styles/components/icon';
import {
	CHANGE_TEMP_FOLDER_NAME_ON_FAVORITES,
	CHANGE_SELEECTED_TEMP_FAVORITE,
	CHANGE_TEMP_FAVORITE_FOLDER_RENMAING_KEY,
} from '../../../../reducers/common';
import {useDoubleClick} from '../../../../hooks/useDoubleClick';
import FolderOnFavoritesContextMenu from '../../../ContextMenu/FolderOnFavoritesContextMenu';
import {useContextMenu} from 'react-contexify';

const Input_ = styled(Input)`
	height: 24px;
`;

const FolderOnFavoritesDialogBox = ({data, indent}) => {
	const dispatch = useDispatch();
	const {selectedFavoriteItemOnDialogBox, tempFavoriteFolderRenamingKey} =
		useSelector((state) => state.common, shallowEqual);
	const nameRef = useRef(null);
	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);
	const [isRenaming, setIsRenaming] = useState(false);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	const onClickFolderItemOnFavorites = useDoubleClick(
		() => {
			dispatch({type: CHANGE_SELEECTED_TEMP_FAVORITE, payload: data.key});
			setIsRenaming(true);
		},
		() => {
			if (selectedFavoriteItemOnDialogBox === data.key) {
				dispatch({type: CHANGE_SELEECTED_TEMP_FAVORITE, payload: null});
			} else {
				dispatch({
					type: CHANGE_SELEECTED_TEMP_FAVORITE,
					payload: data.key,
				});
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
				dispatch({
					type: CHANGE_TEMP_FAVORITE_FOLDER_RENMAING_KEY,
				});
			} else if (e.keyCode === 13) {
				//Enter
				e.preventDefault();
				if (renameValue !== '') {
					dispatch({
						type: CHANGE_TEMP_FOLDER_NAME_ON_FAVORITES,
						payload: {key: data.key, name: renameValue},
					});
				} else {
					dispatch({
						type: CHANGE_TEMP_FAVORITE_FOLDER_RENMAING_KEY,
					});
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
			dispatch({type: CHANGE_SELEECTED_TEMP_FAVORITE, payload: data.key});
			show(e);
		},
		[data, dispatch, show],
	);

	const onBlurFolerNameTextBox = useCallback(() => {
		setIsRenaming(false);
		nameRef.current = null;
		dispatch({type: CHANGE_TEMP_FAVORITE_FOLDER_RENMAING_KEY});
	}, [dispatch]);

	//this folder name has to be renamined
	useEffect(() => {
		if (data.key === tempFavoriteFolderRenamingKey) {
			setIsRenaming(true);
		}
	}, [tempFavoriteFolderRenamingKey, data]);
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
