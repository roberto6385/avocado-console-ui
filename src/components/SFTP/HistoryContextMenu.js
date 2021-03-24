import React, {useState} from 'react';
import {animation, Item, Menu, Separator} from 'react-contexify';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {sendCommandByGet} from './commands/sendCommandGet';
import {SFTP_SAVE_CURRENT_HIGHLIGHT} from '../../reducers/sftp';
import ConfirmPopup from '../ConfirmPopup';
import {toEditMode} from './commands';

const HistoryContextMenu = ({ws, uuid}) => {
	// const {currentHighlight, currentPath} = useSelector((state) => state.sftp);
	// const highlightItem = currentHighlight.find((item) => item.uuid === uuid);
	// // const [open, setOpen] = useState(false);
	// // const [keyword, setKeyword] = useState('');
	// const pathItem = currentPath.find((item) => item.uuid === uuid);
	// const dispatch = useDispatch();

	const MENU_ID = uuid + 'history';

	const contextDeleteHistory = (e) => {
		console.log('delete context menu click');
	};

	function handleItemClick({event}) {
		switch (event.currentTarget.id) {
			case 'Delete':
				contextDeleteHistory();
				break;
			default:
				return;
		}
	}
	return (
		<Menu
			id={MENU_ID}
			animation={animation.slide}
			style={{fontSize: '14px'}}
		>
			<Item
				// disabled={}
				id='Delete'
				onClick={handleItemClick}
			>
				Delete
			</Item>
		</Menu>
	);
};

HistoryContextMenu.propTypes = {
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default HistoryContextMenu;
