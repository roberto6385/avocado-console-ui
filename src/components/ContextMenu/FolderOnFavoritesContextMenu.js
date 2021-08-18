import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {ContextMenu} from '../../styles/components/contextMenu';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {favoritesAction} from '../../reducers/favorites';

const FolderOnFavoritesContextMenu = ({data, onDialog}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('contextMenu');

	const contextMenuList = {
		'delete-folder': t('delete'),
	};

	const handleOnClickEvents = useCallback(
		(e) => () => {
			switch (e) {
				case 'delete-folder':
					if (onDialog) {
						dispatch(favoritesAction.deleteTempGroup(data.key));
					} else {
						dispatch(
							dialogBoxAction.openAlert({
								key: 'delete-favorite-group',
								id: data.key,
							}),
						);
					}
					break;
				default:
					return;
			}
		},
		[dispatch],
	);

	return (
		<ContextMenu id={data.key + 'folder'} animation={animation.slide}>
			{Object.entries(contextMenuList).map(([key, value]) => (
				<Item onClick={handleOnClickEvents(key)} key={key}>
					{value}
				</Item>
			))}
		</ContextMenu>
	);
};

FolderOnFavoritesContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	onDialog: PropTypes.bool,
};

export default FolderOnFavoritesContextMenu;
