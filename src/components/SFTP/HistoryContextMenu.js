import React, {useState} from 'react';
import {animation, Item, Menu, Separator} from 'react-contexify';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {sendCommandByGet} from './commands/sendCommandGet';
import {
	SFTP_DELETE_HISTORY,
	SFTP_SAVE_CURRENT_HIGHLIGHT,
} from '../../reducers/sftp';
import ConfirmPopup from '../ConfirmPopup';
import {toEditMode} from './commands';

const HistoryContextMenu = ({ws, uuid, highlight, setHighlight}) => {
	const dispatch = useDispatch();

	const MENU_ID = uuid + 'history';

	console.log(highlight);

	const contextDeleteHistory = (e) => {
		for (let value of highlight) {
			dispatch({type: SFTP_DELETE_HISTORY, data: {id: value.id}});
		}
		setHighlight([]);
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
			<Item id='Delete' onClick={handleItemClick}>
				Delete
			</Item>
		</Menu>
	);
};

HistoryContextMenu.propTypes = {
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
	highlight: PropTypes.array.isRequired,
	setHighlight: PropTypes.func.isRequired,
};

export default HistoryContextMenu;
