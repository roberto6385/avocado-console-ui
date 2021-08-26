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

const _TextBox = styled(TextBox)`
	height: 24px;
`;

const FavoriteGroupOnDialogBox = ({data, indent}) => {
	const nameRef = useRef(null);

	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	const onClickFavoriteGroup = useDoubleClick(
		() => {
			//TODO: Rename folder
		},
		() => {
			//TODO: If alreay selected Item => deselect
			// If alreay deselected Item => select
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
						JSON.parse(
							localStorage.getItem('tempFavoriteGroups'),
						).find((v) => v.id === data.id).name
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
								<FavoriteGroupOnDialogBox
									key={v.id}
									data={v}
									indent={indent + 1}
								/>
							) : (
								<FavoriteOnDialogBox
									key={v.id}
									data={v}
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
