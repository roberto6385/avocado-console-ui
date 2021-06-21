import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item, Menu} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {
	OPEN_ADD_SERVER_FORM_POPUP,
	OPEN_WARNING_ALERT_POPUP,
} from '../../reducers/popup';
import {DropDownMenu_Avocado} from '../../styles/default';

const FolderContextMenu = ({data, setOpenRename}) => {
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common);

	const {t} = useTranslation('contextMenu');
	const FolderContextMenuMessage = {
		new_server: t('newServer'),
		// rename: 'Rename',
		// delete: 'Delete',
	};

	const handleItemClick = useCallback(
		(e) => () => {
			switch (e) {
				case 'new_server':
					dispatch({
						type: OPEN_ADD_SERVER_FORM_POPUP,
						data: {type: 'add'},
					});
					break;
				case 'rename':
					setOpenRename(true);
					break;
				case 'delete':
					dispatch({
						type: OPEN_WARNING_ALERT_POPUP,
						data: {key: 'delete_server_folder'},
					});
					break;
				default:
					return;
			}
		},
		[],
	);

	return (
		<DropDownMenu_Avocado
			id={data.key + 'folder'}
			animation={animation.slide}
			theme_value={theme}
		>
			{Object.keys(FolderContextMenuMessage).map((v) => (
				<Item onClick={handleItemClick(v)} key={v}>
					{FolderContextMenuMessage[v]}
				</Item>
			))}
		</DropDownMenu_Avocado>
	);
};

FolderContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	setOpenRename: PropTypes.func.isRequired,
};

export default FolderContextMenu;
