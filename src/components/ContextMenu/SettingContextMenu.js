import React, {useCallback} from 'react';
import {animation, Item} from 'react-contexify';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {DropDownMenu} from '../../styles/components/contextMenu';
import {settingAction, settingSelector} from '../../reducers/setting';
//TODO: toggle, setToggle 안넘겨도 될꺼 같은데??
const SettingContextMenu = ({toggle, setToggle}) => {
	const {t} = useTranslation('rightCornerIcons');
	const dispatch = useDispatch();
	const history = useHistory();
	const {aside} = useSelector(settingSelector.all);

	const contextMenuList = {
		'redirect-to-setting-page': t('editSetting'),
		'open-preferences-aside': t('preferences'),
		'open-identities-aside': t('identities'),
	};

	const onClickOpenAside = useCallback(
		(v) => {
			console.log(v);
			if (toggle && aside === v) {
				setToggle(false);
			} else {
				dispatch(settingAction.setAside(v));
				setToggle(true);
			}
		},
		[dispatch, aside, setToggle, toggle],
	);

	const handleOnClickEvents = useCallback(
		(v) => () => {
			switch (v) {
				case 'redirect-to-setting-page':
					history.push('/account');
					break;

				case 'open-preferences-aside':
					onClickOpenAside('Preferences');
					break;

				case 'open-identities-aside':
					onClickOpenAside('Identities');
					break;

				default:
					return;
			}
		},
		[history, onClickOpenAside],
	);

	return (
		<DropDownMenu id={'setting-context-menu'} animation={animation.slide}>
			{Object.entries(contextMenuList).map(([key, value]) => (
				<Item onClick={handleOnClickEvents(key)} key={key}>
					{value}
				</Item>
			))}
		</DropDownMenu>
	);
};

SettingContextMenu.propTypes = {
	toggle: PropTypes.bool.isRequired,
	setToggle: PropTypes.func.isRequired,
};

export default SettingContextMenu;
