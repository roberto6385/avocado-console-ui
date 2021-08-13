import React, {useCallback} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import PropTypes from 'prop-types';
import {DropDownMenu} from '../../styles/components/contextMenu';
import {authAction, authSelector} from '../../reducers/api/auth';
import {settingAction, settingSelector} from '../../reducers/setting';

const UserAccountContextMenu = ({toggle, setToggle}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('rightCornerIcons');
	const {menu} = useSelector(settingSelector.all);
	const {userData} = useSelector(authSelector.all);

	const onClickOpenAside = useCallback(
		(key) => () => {
			if (toggle && menu === key) {
				setToggle(false);
			} else {
				dispatch(settingAction.setMenu(key));
				setToggle(true);
			}
		},
		[dispatch, menu, setToggle, toggle],
	);

	const onClickLogout = useCallback(() => {
		dispatch(
			authAction.revokeRequest({
				Authorization: 'Bearer ' + userData.access_token,
			}),
		);
	}, [dispatch, userData]);

	return (
		<DropDownMenu id={'account'} animation={animation.slide}>
			<Item onClick={onClickOpenAside('Account')}>{t('account')}</Item>
			<Separator />
			<Item onClick={onClickLogout}>{t('logout')}</Item>
		</DropDownMenu>
	);
};

UserAccountContextMenu.propTypes = {
	toggle: PropTypes.bool.isRequired,
	setToggle: PropTypes.func.isRequired,
};

export default UserAccountContextMenu;
