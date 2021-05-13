import React, {useCallback} from 'react';
import {animation, Item, Menu, Separator} from 'react-contexify';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {ACCOUT_CONTROL_ID, DELETE_ACCOUT} from '../../reducers/common';
import {
	OPEN_ADD_ACCOUT_FORM_POPUP,
	OPEN_CONFIRM_POPUP,
} from '../../reducers/popup';

const AccountContextMenu = () => {
	const {account, accountListControlId} = useSelector(
		(state) => state.common,
	);
	const dispatch = useDispatch();

	const MENU_ID = 'account';

	const editAccount = useCallback(() => {
		dispatch({
			type: OPEN_ADD_ACCOUT_FORM_POPUP,
			data: {type: 'add'},
		});
	}, [dispatch]);

	const deleteAccount = useCallback(() => {
		dispatch({
			type: OPEN_CONFIRM_POPUP,
			data: {
				key: 'delete_account',
			},
		});
	}, [dispatch]);

	const handleItemClick = ({event}) => {
		switch (event.currentTarget.id) {
			case 'edit':
				editAccount();
				break;
			case 'delete':
				deleteAccount();
				break;
			default:
				break;
		}
	};
	return (
		<Menu
			id={MENU_ID}
			animation={animation.slide}
			style={{fontSize: '14px'}}
		>
			<Item id='edit' onClick={handleItemClick}>
				Edit
			</Item>
			<Item id='delete' onClick={handleItemClick}>
				Delete
			</Item>
		</Menu>
	);
};

export default AccountContextMenu;
