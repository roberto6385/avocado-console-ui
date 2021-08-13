import React, {useCallback} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {RIGHT_SIDE_KEY} from '../../reducers/common';

import PropTypes from 'prop-types';
import {DropDownMenu} from '../../styles/components/contextMenu';
import {AUTH, authAction} from '../../reducers/api/auth';

const UserAccountContextMenu = ({toggle, setToggle}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('rightCornerIcons');

	const {side_key} = useSelector((state) => state.common, shallowEqual);
	const {userData} = useSelector((state) => state[AUTH], shallowEqual);

	const onClickOpenAside = useCallback(
		(key) => () => {
			if (toggle && side_key === key) {
				setToggle(false);
			} else {
				dispatch({type: RIGHT_SIDE_KEY, payload: key});
				setToggle(true);
			}
		},
		[dispatch, side_key, setToggle, toggle],
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
