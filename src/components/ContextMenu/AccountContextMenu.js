import React, {useCallback} from 'react';
import {animation, Item, Menu} from 'react-contexify';
import {useDispatch} from 'react-redux';
import {
	OPEN_ADD_ACCOUT_FORM_POPUP,
	OPEN_WARNING_ALERT_POPUP,
} from '../../reducers/popup';

const AccountContextMenu = () => {
	const dispatch = useDispatch();

	const editAccount = useCallback(() => {
		dispatch({
			type: OPEN_ADD_ACCOUT_FORM_POPUP,
			data: {type: 'add'},
		});
	}, [dispatch]);

	const deleteAccount = useCallback(() => {
		dispatch({
			type: OPEN_WARNING_ALERT_POPUP,
			data: {
				key: 'delete_account',
			},
		});
	}, [dispatch]);

	return (
		<Menu
			id={'account'}
			animation={animation.slide}
			style={{fontSize: '14px'}}
		>
			<Item id='edit' onClick={editAccount}>
				Edit
			</Item>
			<Item id='delete' onClick={deleteAccount}>
				Delete
			</Item>
		</Menu>
	);
};

export default AccountContextMenu;
