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
	const {t} = useTranslation('userAccountContextMenu');
	const {asideKey} = useSelector(settingSelector.all);
	const {userData} = useSelector(authSelector.all);

	const onClickOpenAside = useCallback(
		(key) => () => {
			if (isOpened && asideKey === key) {
				setIsOpened(false);
			} else {
				dispatch(settingAction.setAsideKey(key));
				setIsOpened(true);
			}
		},
		[dispatch, asideKey, setIsOpened, isOpened],
	);

	const onClickLogout = useCallback(() => {
		console.log('DDDDDDD');
		dispatch(
			authAction.revokeTokenRequest({
				Authorization: 'Bearer ' + userData.access_token,
			}),
		);
	}, [dispatch, userData]);

	return (
		<DropDownMenu
			id={'user-account-context-menu'}
			animation={animation.slide}
		>
			<Item onClick={onClickOpenAside('account')}>
				{t('accountInfo')}
			</Item>
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
