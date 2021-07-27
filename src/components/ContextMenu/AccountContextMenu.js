import React, {useCallback} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {DropDownMenu} from '../../styles/default';
import {RIGHT_SIDE_KEY} from '../../reducers/common';

import PropTypes from 'prop-types';
import {revokeUserTicket} from '../../reducers/auth/userTicket';

const AccountContextMenu = ({toggle, setToggle}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('rightCornerIcons');

	const {theme, rightSideKey} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const userTicket = useSelector((state) => state.userTicket.userTicket);

	const openSideMenu = useCallback(
		(key) => () => {
			if (toggle && rightSideKey === key) {
				setToggle(false);
			} else {
				dispatch({type: RIGHT_SIDE_KEY, payload: key});
				setToggle(true);
			}
		},
		[rightSideKey, setToggle, toggle],
	);

	const logout = useCallback(() => {
		dispatch(
			revokeUserTicket({
				Authorization: 'Bearer ' + userTicket.access_token,
			}),
		);
	}, [userTicket]);

	return (
		<DropDownMenu
			id={'account'}
			animation={animation.slide}
			theme_value={theme}
		>
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
