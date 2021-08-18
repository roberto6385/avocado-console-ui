import React, {useCallback} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import PropTypes from 'prop-types';
import {DropDownMenu} from '../../styles/components/contextMenu';
import {authAction, authSelector} from '../../reducers/api/auth';
import {settingAction, settingSelector} from '../../reducers/setting';

const UserAccountContextMenu = ({isOpened, setIsOpened}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('rightCornerIcons');
	const {aside} = useSelector(settingSelector.all);
	const {userData} = useSelector(authSelector.all);

	const onClickOpenAside = useCallback(
		(key) => () => {
			if (isOpened && aside === key) {
				setIsOpened(false);
			} else {
				dispatch(settingAction.setAside(key));
				setIsOpened(true);
			}
		},
		[dispatch, aside, setIsOpened, isOpened],
	);

	const onClickLogout = useCallback(() => {
		dispatch(
			authAction.revokeRequest({
				Authorization: 'Bearer ' + userData.access_token,
			}),
		);
	}, [dispatch, userData]);

	return (
		<DropDownMenu
			id={'user-account-context-menu'}
			animation={animation.slide}
		>
			<Item onClick={onClickOpenAside('account')}>{t('account')}</Item>
			<Separator />
			<Item onClick={onClickLogout}>{t('logout')}</Item>
		</DropDownMenu>
	);
};

UserAccountContextMenu.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};

export default UserAccountContextMenu;
