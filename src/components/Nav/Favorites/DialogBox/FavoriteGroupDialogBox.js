import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
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
import FavoriteGroupContextMenu from '../../../ContextMenus/FavoriteGroupContextMenu';
import {useContextMenu} from 'react-contexify';
import {favoritesAction} from '../../../../reducers/favorites';
import localStorage from 'redux-persist/es/storage';

const _TextBox = styled(TextBox)`
	height: 24px;
`;

const FavoriteGroupDialogBox = ({data, indent}) => {
	const dispatch = useDispatch();
	const nameRef = useRef(null);

	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	// const onClickFavoriteGroup = useDoubleClick(
	// 	() => {
	// 		dispatch(favoritesAction.setTempSelectedFavorite(data.key));
	// 	},
	// 	() => {
	// 		if (tempSelectedFavorite === data.key) {
	// 			dispatch(favoritesAction.setTempSelectedFavorite(null));
	// 		} else {
	// 			dispatch(favoritesAction.setTempSelectedFavorite(data.key));
	// 		}
	// 	},
	// 	[data, tempSelectedFavorite],
	// );

	// const onClickFoldOrUnfoldFolder = useCallback(() => {
	// 	setIsFolderUnfolded(!isFolderUnfolded);
	// }, [isFolderUnfolded]);

	// const onKeyDownChangeFolderName = useCallback(
	// 	(e) => {
	// 		if (e.keyCode === 27) {
	// 			// ESC
	// 			dispatch(
	// 				favoritesAction.changeTempFavoriteGroupRenameKey(null),
	// 			);
	// 		} else if (e.keyCode === 13) {
	// 			//Enter
	// 			e.preventDefault();
	// 			if (renameValue !== '') {
	// 				dispatch(
	// 					favoritesAction.changeTempFavoriteGroupName({
	// 						key: data.key,
	// 						name: renameValue,
	// 					}),
	// 				);
	// 			} else {
	// 				dispatch(
	// 					favoritesAction.changeTempFavoriteGroupRenameKey(null),
	// 				);
	// 			}
	// 		}
	// 	},
	// 	[data.key, dispatch, renameValue],
	// );

	// const {show} = useContextMenu({
	// 	id: data.id + '-favorite-group-context-menu',
	// });

	// const openFavoriteGroupContextMenu = useCallback(
	// 	(e) => {
	// 		e.preventDefault();
	// 		dispatch(favoritesAction.setTempSelectedFavorite(data.id));
	// 		show(e);
	// 	},
	// 	[data.id, dispatch, show],
	// );

	// const onBlurFolerNameTextBox = useCallback(() => {
	// 	nameRef.current = null;
	// 	dispatch(favoritesAction.changeTempFavoriteGroupRenameKey(null));
	// }, [dispatch]);

	// const doSettingForRenaming = useCallback(async () => {
	// 	await setRenameValue(
	// 		localStorage.get('tempFavoriteGroups').find((v) => v.id === data.id)
	// 			.name,
	// 	);
	// 	await nameRef.current?.focus();
	// 	await nameRef.current?.select();
	// }, [setRenameValue, data.id]);

	// useEffect(() => {
	// 	if (data.id === localStorage.get('tempFavoriteGroupRenamingKey')) {
	// 		doSettingForRenaming();
	// 	}
	// }, [data]);

	return (
		<React.Fragment>
			<ResourceItem
				// selected={
				// 	JSON.parse(localStorage.tempSelectedFavorite).includes(
				// 		data.id,
				// 	)
				// 		? 1
				// 		: 0
				// }
				left={(indent * 11 + 8).toString() + 'px'}
				// onClick={onClickFavoriteGroup}
				// onContextMenu={openFavoriteGroupContextMenu}
			>
				<Icon
					margin_right={'12px'}
					size={'sm'}
					// itype={
					// 	JSON.parse(localStorage.tempSelectedFavorite).includes(
					// 		data.id,
					// 	)
					// 		? 'selected'
					// 		: undefined
					// }
				>
					{folderIcon}
				</Icon>

				<ResourceItemTitle>
					{data.id ===
					localStorage.getItem('tempFavoriteGroupRenamingKey') ? (
						<_TextBox
							ref={nameRef}
							type='text'
							value={renameValue}
							// onChange={onChangeRenameValue}
							// onKeyDown={onKeyDownChangeFolderName}
							// onBlur={onBlurFolerNameTextBox}
						/>
					) : (
						data.name
					)}
				</ResourceItemTitle>
				<IconButton
					size={'sm'}
					margin={'0px 0px 0px 12px'}
					// onClick={onClickFoldOrUnfoldFolder}
				>
					{isFolderUnfolded ? arrowDownIcon : arrowRightIcon}
				</IconButton>
			</ResourceItem>
			{data.children.length !== 0 && (
				<CollapseContainer isOpened={isFolderUnfolded}>
					<React.Fragment>
						{data.children.map((i) =>
							i.type === 'folder' ? (
								<FavoriteGroupDialogBox
									key={i.key}
									data={i}
									indent={indent + 1}
								/>
							) : (
								<FavoriteOnDialogBox
									key={i.key}
									data={i}
									indent={indent + 1}
								/>
							),
						)}
					</React.Fragment>
				</CollapseContainer>
			)}
			{/*<FavoriteGroupContextMenu resourceGroupId={data} onDialog={true} />*/}
		</React.Fragment>
	);
};

FavoriteGroupDialogBox.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FavoriteGroupDialogBox;
