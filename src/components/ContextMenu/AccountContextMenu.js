import React, {useCallback} from 'react';
import {animation, Item, Menu} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';
import {
	OPEN_ADD_ACCOUT_FORM_POPUP,
	OPEN_WARNING_ALERT_POPUP,
} from '../../reducers/popup';
import {ContextMenu_Avocado} from '../../styles/default';

const AccountContextMenu = () => {
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common);

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
		<ContextMenu_Avocado
			id={'account'}
			animation={animation.slide}
			theme_value={theme}
		>
			<Item id='edit' onClick={editAccount}>
				Edit
			</Item>
			<Item id='delete' onClick={deleteAccount}>
				Delete
			</Item>
		</ContextMenu_Avocado>
	);
};

export default AccountContextMenu;
