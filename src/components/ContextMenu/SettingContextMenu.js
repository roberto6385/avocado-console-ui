import React, {useCallback} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {DropDownMenu} from '../../styles/components/contextMenu';
import {settingAction, settingSelector} from '../../reducers/setting';

const SettingContextMenu = ({toggle, setToggle}) => {
	const {t} = useTranslation('rightCornerIcons');
	const dispatch = useDispatch();
	const history = useHistory();
	const {menu} = useSelector(settingSelector.all);

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[history],
	);

	const openSideMenu = useCallback(
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

	return (
		<DropDownMenu id={'setting'} animation={animation.slide}>
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
		</DropDownMenu>
	);
};

SettingContextMenu.propTypes = {
	toggle: PropTypes.bool.isRequired,
	setToggle: PropTypes.func.isRequired,
};

export default SettingContextMenu;
