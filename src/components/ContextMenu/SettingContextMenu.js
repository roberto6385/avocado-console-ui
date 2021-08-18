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
	//TODO: 왜 안될까??
	const onClickOpenAside = useCallback(
		(v) => () => {
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
				case 'redirect-to-settingpage':
					history.push('/account');
					break;

				case 'open-preferences-aside':
					// onClickOpenAside('Preferences');
					if (toggle && aside === 'Preferences') {
						setToggle(false);
					} else {
						dispatch(settingAction.setMenu('Preferences'));
						setToggle(true);
					}
					break;

				case 'open-identities-aside':
					// onClickOpenAside('Identities');
					if (toggle && aside === 'Identities') {
						setToggle(false);
					} else {
						dispatch(settingAction.setMenu('Identities'));
						setToggle(true);
					}
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
