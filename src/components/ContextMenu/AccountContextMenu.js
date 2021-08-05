import React, {useCallback} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {RIGHT_SIDE_KEY} from '../../reducers/common';

import PropTypes from 'prop-types';
import {revokeUserTicket} from '../../reducers/auth/userTicket';
import {DropDownMenu} from '../../styles/components/contextMenu';

const AccountContextMenu = ({toggle, setToggle}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('rightCornerIcons');

	const {rightSideKey} = useSelector((state) => state.common, shallowEqual);
	const userTicket = useSelector((state) => state.userTicket.userTicket);

	const openSideMenu = useCallback(
		(key) => () => {
			console.log(toggle);
			console.log(key);
			console.log(rightSideKey);
			if (toggle && rightSideKey === key) {
				setToggle(false);
			} else {
				dispatch({type: RIGHT_SIDE_KEY, payload: key});
				setToggle(true);
			}
		},
		[dispatch, rightSideKey, setToggle, toggle],
	);

	const logout = useCallback(() => {
		dispatch(
			revokeUserTicket({
				Authorization: 'Bearer ' + userTicket.access_token,
			}),
		);
	}, [dispatch, userTicket]);

	return (
		<DropDownMenu id={'account'} animation={animation.slide}>
			<Item id='UserInfo' onClick={openSideMenu('Account')}>
				{t('account')}
			</Item>
			<Separator />
			<Item id='Logout' onClick={logout}>
				{t('logout')}
			</Item>
		</DropDownMenu>
	);
};

AccountContextMenu.propTypes = {
	toggle: PropTypes.bool.isRequired,
	setToggle: PropTypes.func.isRequired,
};

export default AccountContextMenu;
