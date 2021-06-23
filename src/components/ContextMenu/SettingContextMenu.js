import React, {useCallback} from 'react';
import {DropDownMenu_Avocado} from '../../styles/default';
import {animation, Item, Separator} from 'react-contexify';
import {useTranslation} from 'react-i18next';
import {RIGHT_SIDE_KEY} from '../../reducers/common';
import {useDispatch, useSelector} from 'react-redux';
import {getRevoke} from '../../reducers/auth/revoke';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';

const SettingContextMenu = ({toggle, setToggle}) => {
	const {t} = useTranslation('rightCornerIcons');
	const dispatch = useDispatch();
	const history = useHistory();
	const {theme, rightSideKey} = useSelector((state) => state.common);
	const {userTicket} = useSelector((state) => state.userTicket);

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

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

	return (
		<DropDownMenu_Avocado
			id={'setting'}
			animation={animation.slide}
			theme_value={theme}
		>
			<Item id='EditSetting' onClick={changePath('/account')}>
				{t('editSetting')}
			</Item>
			<Separator />
			<Item id='Preferences' onClick={openSideMenu('Preferences')}>
				{t('preferences')}
			</Item>
			<Item id='Identities' onClick={openSideMenu('Identities')}>
				{t('identities')}
			</Item>
		</DropDownMenu_Avocado>
	);
};

SettingContextMenu.propTypes = {
	toggle: PropTypes.bool.isRequired,
	setToggle: PropTypes.func.isRequired,
};

export default SettingContextMenu;
