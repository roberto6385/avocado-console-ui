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

	const onClickRedirectToAccountPage = useCallback(
		(path) => () => {
			history.push(path);
		},
		[history],
	);

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

	return (
		<DropDownMenu id={'setting'} animation={animation.slide}>
			<Item onClick={onClickRedirectToAccountPage('/account')}>
				{t('editSetting')}
			</Item>
			<Separator />
			<Item onClick={onClickOpenAside('Preferences')}>
				{t('preferences')}
			</Item>
			<Item onClick={onClickOpenAside('Identities')}>
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
