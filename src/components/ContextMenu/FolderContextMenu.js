import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {OPEN_DELETE_DIALOG_BOX} from '../../reducers/dialogBoxs';
import {ContextMenu} from '../../styles/components/contextMenu';

const FolderContextMenu = ({data}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('contextMenu');

	const FolderContextMenuMessage = {
		delete: t('delete'),
	};

	const handleItemClick = useCallback(
		(e) => () => {
			switch (e) {
				case 'delete':
					dispatch({
						type: OPEN_DELETE_DIALOG_BOX,
						payload: {key: 'delete_server_folder'},
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
