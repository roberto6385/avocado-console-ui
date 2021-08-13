import React, {useCallback} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import PropTypes from 'prop-types';
import {DropDownMenu} from '../../styles/components/contextMenu';
import {authAction, authSelector} from '../../reducers/api/auth';
import {settingAction, settingSelector} from '../../reducers/setting';

const AccountContextMenu = ({toggle, setToggle}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('rightCornerIcons');
	const {menu} = useSelector(settingSelector.all);
	const {userData} = useSelector(authSelector.all);

	const openSideMenu = useCallback(
		(key) => () => {
			console.log(key);
			if (toggle && menu === key) {
				setToggle(false);
			} else {
				dispatch(settingAction.setMenu(key));
				setToggle(true);
			}
		},
		[dispatch, menu, setToggle, toggle],
	);

	const logout = useCallback(() => {
		dispatch(
			authAction.revokeRequest({
				Authorization: 'Bearer ' + userData.access_token,
			}),
		);
	}, [dispatch, userData]);

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
