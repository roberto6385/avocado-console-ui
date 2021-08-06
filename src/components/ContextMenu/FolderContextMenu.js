import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {
	OPEN_ADD_SERVER_DIALOG_BOX,
	OPEN_WARNING_ALERT_POPUP,
} from '../../reducers/dialogbox';
import {ContextMenu} from '../../styles/components/contextMenu';

const FolderContextMenu = ({data}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('contextMenu');

	const FolderContextMenuMessage = {
		// new_server: t('newServer'),
		// rename: 'Rename',
		delete: t('delete'),
	};

	const handleItemClick = useCallback(
		(e) => () => {
			switch (e) {
				case 'new_server':
					dispatch({
						type: OPEN_ADD_SERVER_DIALOG_BOX,
						data: {type: 'add'},
					});
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
		[dispatch],
	);

	return (
		<ContextMenu id={data.key + 'folder'} animation={animation.slide}>
			{Object.keys(FolderContextMenuMessage).map((v) => (
				<Item onClick={handleItemClick(v)} key={v}>
					{FolderContextMenuMessage[v]}
				</Item>
			))}
		</ContextMenu>
	);
};

FolderContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
};

export default FolderContextMenu;
