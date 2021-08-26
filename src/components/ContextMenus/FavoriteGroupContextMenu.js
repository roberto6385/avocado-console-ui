import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {ContextMenu} from '../../styles/components/contextMenu';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {favoritesAction} from '../../reducers/favorites';

const FavoriteGroupContextMenu = ({
	resourceGroupId,
	onDialog,
	setIsFolderUnfolded,
}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('favoriteGroupContextMenu');

	const contextMenuList = {
		'delete-folder': t('deleteFolder'),
		'add-folder': t('addFolder'),
	};

	const handleOnClickEvents = useCallback(
		(e) => () => {
			switch (e) {
				case 'delete-folder':
					if (onDialog) {
						//TODO: delete Folder
					} else {
						dispatch(
							dialogBoxAction.openAlert({
								key: 'delete-favorite-group',
								id: resourceGroupId,
							}),
						);
					}
					break;
				case 'add-folder':
					if (onDialog) {
						//TODO: add Folder
					} else {
						dispatch(
							favoritesAction.addFavoriteGroup({
								id: resourceGroupId,
								name: t('addFolder'),
							}),
						);
						setIsFolderUnfolded(true);
					}
					return;
				default:
					return;
			}
		},
		[resourceGroupId, dispatch, onDialog],
	);

	return (
		<ContextMenu
			id={
				onDialog
					? resourceGroupId + '-temp-favorite-group-context-menu'
					: resourceGroupId + '-favorite-group-context-menu'
			}
			animation={animation.slide}
		>
			{Object.entries(contextMenuList).map(([key, value]) => (
				<Item onClick={handleOnClickEvents(key)} key={key}>
					{value}
				</Item>
			))}
		</ContextMenu>
	);
};

FavoriteGroupContextMenu.propTypes = {
	resourceGroupId: PropTypes.string.isRequired,
	onDialog: PropTypes.bool,
	setIsFolderUnfolded: PropTypes.func.isRequired,
};

export default FavoriteGroupContextMenu;
