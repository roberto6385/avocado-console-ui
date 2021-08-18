import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {
	CHANGE_FOLDER_NAME_ON_FAVORITES,
	SET_CLICKED_SERVER,
	CHANGE_FAVORITE_FOLDER_RENMAING_KEY,
	SORT_FAVORITE_RESOURCES,
} from '../../../reducers/common';
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
const Input_ = styled(TextBox)`
	height: 24px;
`;

const FavoriteGroup = ({open, data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server, favoriteFolderRenamingKey} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const renameRef = useRef(null);
	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);
	const [isRenaming, setIsRenaming] = useState(false);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	const onClickFolder = useDoubleClick(
		() => {
			dispatch({type: SET_CLICKED_SERVER, payload: data.key});
			setIsRenaming(true);
		},
		() => {
			if (clicked_server === data.key) {
				dispatch({type: SET_CLICKED_SERVER, payload: null});
			} else {
				dispatch({type: SET_CLICKED_SERVER, payload: data.key});
			}
		},
		[data],
	);

	const onClickFoldOrUnfoldFolder = useCallback(() => {
		setIsFolderUnfolded(!isFolderUnfolded);
	}, [isFolderUnfolded]);

	const {show} = useContextMenu({
		id: data.key + '-favorite-group-context-menu',
	});

	const openFavoriteGroupContextMenu = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({type: SET_CLICKED_SERVER, payload: data.key});
			show(e);
		},
		[data.key, dispatch, show],
	);

	const onKeyDownChangeFolderName = useCallback(
		(e) => {
			if (e.keyCode === 27) {
				// ESC
				setIsRenaming(false);
				dispatch({
					type: CHANGE_FAVORITE_FOLDER_RENMAING_KEY,
				});
			} else if (e.keyCode === 13) {
				//Enter
				e.preventDefault();

				if (renameValue !== '') {
					//TODO: check valid folder name value
					dispatch({
						type: CHANGE_FOLDER_NAME_ON_FAVORITES,
						payload: {key: data.key, name: renameValue},
					});
				} else {
					dispatch({
						type: CHANGE_FAVORITE_FOLDER_RENMAING_KEY,
					});
				}
				setIsRenaming(false);
			}
		},
		[dispatch, renameValue, data],
	);

	const onDragStartFolder = useCallback(() => {
		console.log('prev put item');
		dispatch({type: SET_CLICKED_SERVER, payload: data.key});
	}, [data.key, dispatch]);

	const onDropFolder = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			console.log('favorite folder next put item');

			data.type === 'folder' &&
				dispatch({
					type: SORT_FAVORITE_RESOURCES,
					payload: {next: data, indent: parseInt(indent)},
				});
		},
		[data, dispatch, indent],
	);

	const onDragOverFolder = useCallback((e) => {
		e.stopPropagation();
		e.preventDefault();
	}, []);

	const onBlurFolerNameTextBox = useCallback(() => {
		setIsRenaming(false);
		renameRef.current = null;
		dispatch({type: CHANGE_FAVORITE_FOLDER_RENMAING_KEY});
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
		if (data.key === favoriteFolderRenamingKey) {
			setIsRenaming(true);
		}
	}, [favoriteFolderRenamingKey, data]);

	useEffect(() => {
		setIsFolderUnfolded(open);
	}, [open]);

	return (
		<React.Fragment>
			<ResourceItem
				onClick={onClickFolder}
				onContextMenu={openFavoriteGroupContextMenu}
				draggable='true'
				onDragStart={onDragStartFolder}
				onDragOver={onDragOverFolder}
				onDrop={onDropFolder}
				selected={clicked_server === data.key ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					margin_right={'12px'}
					size={'sm'}
					itype={clicked_server === data.key ? 'selected' : undefined}
				>
					{folderIcon}
				</Icon>

				<ResourceItemTitle>
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
				</ResourceItemTitle>
				<IconButton
					size={'sm'}
					margin={'0px 0px 0px 12px'}
					onClick={onClickFoldOrUnfoldFolder}
				>
					{isFolderUnfolded ? arrowDownIcon : arrowRightIcon}
				</IconButton>
			</ResourceItem>
			{data.contain.length !== 0 && (
				<CollapseContainer isOpened={isFolderUnfolded}>
					<React.Fragment>
						{data.contain.map((i) =>
							i.type === 'folder' ? (
								<FavoriteGroup
									key={i.key}
									open={open}
									data={i}
									indent={indent + 1}
								/>
							) : (
								<Favorite
									key={i.key}
									data={i}
									indent={indent + 1}
								/>
							),
						)}
					</React.Fragment>
				</CollapseContainer>
			)}
			<FavoriteGroupContextMenu data={data} />
		</React.Fragment>
	);
};

FavoriteGroup.propTypes = {
	open: PropTypes.bool.isRequired,
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FavoriteGroup;
