import React, {useCallback} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {DropDownMenu_Avocado} from '../../styles/default';
import {RIGHT_SIDE_KEY} from '../../reducers/common';
import {getRevoke} from '../../reducers/auth/revoke';
import PropTypes from 'prop-types';

const AccountContextMenu = ({toggle, setToggle}) => {
	const {t} = useTranslation('rightCornerIcons');
	const dispatch = useDispatch();
	const {theme, rightSideKey} = useSelector((state) => state.common);
	const {userTicket} = useSelector((state) => state.userTicket);

	const openSideMenu = useCallback(
		(key) => () => {
			if (toggle && rightSideKey === key) {
				setToggle(false);
			} else {
				dispatch({type: RIGHT_SIDE_KEY, payload: key});
				setToggle(true);
			}
		},
		[rightSideKey, toggle],
	);

	const logout = useCallback(() => {
		dispatch(
			getRevoke({Authorization: 'Bearer ' + userTicket.access_token}),
		);
		sessionStorage.clear();
		window.location.reload();
	}, []);

	return (
		<DropDownMenu_Avocado
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
		</DropDownMenu_Avocado>
	);
};

AccountContextMenu.propTypes = {
	toggle: PropTypes.bool.isRequired,
	setToggle: PropTypes.func.isRequired,
};

export default AccountContextMenu;
