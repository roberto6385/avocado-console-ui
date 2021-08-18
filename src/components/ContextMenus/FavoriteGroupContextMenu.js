import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {ContextMenu} from '../../styles/components/contextMenu';
import {DELETE_TEMP_FOLDER_ON_FAVORITES} from '../../reducers/common';
import {dialogBoxAction} from '../../reducers/dialogBoxs';

const FavoriteGroupContextMenu = ({data, onDialog}) => {
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
						dispatch({
							type: DELETE_TEMP_FOLDER_ON_FAVORITES,
							payload: data.key,
						});
					} else {
						dispatch(
							dialogBoxAction.openAlert({
								key: 'delete-folder-on-favorites',
							}),
						);
					}
					break;
				default:
					return;
			}
		},
		[data.key, dispatch, onDialog],
	);

	return (
		<ContextMenu
			id={data.key + '-favorite-group-context-menu'}
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
	data: PropTypes.object.isRequired,
	onDialog: PropTypes.bool,
};

export default FavoriteGroupContextMenu;
