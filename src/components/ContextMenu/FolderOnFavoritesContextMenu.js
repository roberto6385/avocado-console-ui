import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {ContextMenu} from '../../styles/components/contextMenu';
import {DELETE_TEMP_FOLDER_ON_FAVORITES} from '../../reducers/common';
import {dialogBoxAction} from '../../reducers/dialogBoxs';

const FolderOnFavoritesContextMenu = ({data, onDialog}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('contextMenu');

	const contextMenuList = {
		delete: t('delete'),
	};

	const handleOnClickEvents = useCallback(
		(e) => () => {
			switch (e) {
				case 'delete':
					if (onDialog) {
						dispatch({
							type: DELETE_TEMP_FOLDER_ON_FAVORITES,
							payload: data.key,
						});
					} else {
						dispatch(
							dialogBoxAction.openAlert({
								key: 'delete_server_folder',
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
			{Object.keys(contextMenuList).map((v) => (
				<Item onClick={handleOnClickEvents(v)} key={v}>
					{contextMenuList[v]}
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
