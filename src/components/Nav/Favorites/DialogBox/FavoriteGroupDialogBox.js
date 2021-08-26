import React, {useCallback, useRef, useState} from 'react';
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

import localStorage from 'redux-persist/es/storage';

const _TextBox = styled(TextBox)`
	height: 24px;
`;

const FavoriteGroupDialogBox = ({data, indent}) => {
	const nameRef = useRef(null);

	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	// const tempFavoriteFolders = JSON.parse(
	// 	localStorage.getItem('tempFavoriteGroups'),
	// );
	//
	// console.log(
	// 	tempFavoriteFolders,
	// 	localStorage.getItem('tempFavoriteGroups'),
	// );

	const onClickFavoriteGroup = useDoubleClick(
		() => {
			//TODO: Rename folder
		},
		() => {
			//TODO: If alreay slected Item => delect
			// If alreay deslected Item => slect
			// !!importand point : duplicate selection is possible
		},
		[],
	);

	const onClickFoldOrUnfoldFolder = useCallback(() => {
		setIsFolderUnfolded(!isFolderUnfolded);
	}, [isFolderUnfolded]);

	const onKeyDownChangeFolderName = useCallback(
		(e) => {
			if (e.keyCode === 27) {
				// ESC
				//TODO: ignore rename
			} else if (e.keyCode === 13) {
				//Enter
				e.preventDefault();
				if (renameValue !== '') {
					//TODO: rename
				} else {
					//TODO: ignore rename
				}
			}
		},
		[data.key, renameValue],
	);

	const onBlurFolerNameTextBox = useCallback(() => {
		nameRef.current = null;
		//TODO: ignore rename
	}, []);

	return (
		<React.Fragment>
			<ResourceItem
				//TODO: if selected ? 1 : 0
				// selected={
				// (if selected)
				// 		? 1
				// 		: 0
				// }
				left={(indent * 11 + 8).toString() + 'px'}
				onClick={onClickFavoriteGroup}
			>
				<Icon
					margin_right={'12px'}
					size={'sm'}
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
					{data.id ===
					localStorage.getItem('tempFavoriteGroupRenamingKey') ? (
						<_TextBox
							ref={nameRef}
							type='text'
							value={renameValue}
							onChange={onChangeRenameValue}
							onKeyDown={onKeyDownChangeFolderName}
							onBlur={onBlurFolerNameTextBox}
						/>
					) : (
						'name'
						// tempFavoriteFolders.find((v) => v.id === data.id).name
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
		</React.Fragment>
	);
};

FavoriteGroupDialogBox.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FavoriteGroupDialogBox;
