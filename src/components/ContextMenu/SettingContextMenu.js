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
	const {aside} = useSelector(settingSelector.all);

	const onClickRedirectToAccountPage = useCallback(
		(path) => () => {
			history.push(path);
		},
		[history],
	);

	const onClickOpenAside = useCallback(
		(key) => () => {
			if (toggle && aside === key) {
				setToggle(false);
			} else {
				dispatch(settingAction.setAside(key));
				setToggle(true);
			}
		},
		[dispatch, aside, setToggle, toggle],
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
