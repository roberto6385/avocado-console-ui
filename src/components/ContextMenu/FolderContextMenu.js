import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item, Menu} from 'react-contexify';
import {useDispatch} from 'react-redux';

import {
	OPEN_ADD_SERVER_FORM_POPUP,
	OPEN_INPUT_POPUP,
	OPEN_WARNING_ALERT_POPUP,
} from '../../reducers/popup';

const FolderContextMenuMessage = {
	new_server: 'New Server',
	new_folder: 'New Folder',
	rename: 'Rename',
	delete: 'Delete',
};

const FolderContextMenu = ({data, setOpenRename}) => {
	const dispatch = useDispatch();

	const MENU_ID = data.key + 'folder';

	const handleItemClick = useCallback(
		(e) => () => {
			switch (e) {
				case 'new_server':
					dispatch({
						type: OPEN_ADD_SERVER_FORM_POPUP,
						data: {type: 'add'},
					});
					break;
				case 'new_folder':
					dispatch({
						type: OPEN_INPUT_POPUP,
						data: {key: 'new_folder'},
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
		<Menu
			id={MENU_ID}
			animation={animation.slide}
			style={{fontSize: '14px', background: 'white'}}
		>
			{Object.keys(FolderContextMenuMessage).map((v) => (
				<Item onClick={handleItemClick(v)} key={v}>
					{FolderContextMenuMessage[v]}
				</Item>
			))}
		</Menu>
	);
};

FolderContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	setOpenRename: PropTypes.func.isRequired,
};

export default FolderContextMenu;
