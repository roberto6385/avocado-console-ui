import React, {useCallback} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {RIGHT_SIDE_KEY} from '../../reducers/common';

import PropTypes from 'prop-types';
import {DropDownMenu} from '../../styles/components/contextMenu';
import {REVOKE_USER_TICKET_REQUEST} from '../../reducers/auth/userTicket';

const AccountContextMenu = ({toggle, setToggle}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('rightCornerIcons');

	const {side_key} = useSelector((state) => state.common, shallowEqual);
	const userTicket = useSelector((state) => state.userTicket.userTicket);

	const openSideMenu = useCallback(
		(key) => () => {
			console.log(toggle);
			console.log(key);
			console.log(side_key);
			if (toggle && side_key === key) {
				setToggle(false);
			} else {
				dispatch({type: RIGHT_SIDE_KEY, payload: key});
				setToggle(true);
			}
		},
		[dispatch, side_key, setToggle, toggle],
	);

	const logout = useCallback(() => {
		dispatch({
			type: REVOKE_USER_TICKET_REQUEST,
			payload: {
				Authorization: 'Bearer ' + userTicket.access_token,
			},
		});
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
