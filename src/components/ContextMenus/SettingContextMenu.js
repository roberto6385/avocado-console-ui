import React, {useCallback} from 'react';
import {animation, Item} from 'react-contexify';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {DropDownMenu} from '../../styles/components/contextMenu';
import {settingAction, settingSelector} from '../../reducers/setting';
//TODO: isOpened, setIsOpened 안넘겨도 될꺼 같은데??
const SettingContextMenu = ({isOpened, setisOpened}) => {
	const {t} = useTranslation('serverContextMenu');
	const dispatch = useDispatch();
	const history = useHistory();
	const {asideKey} = useSelector(settingSelector.all);

	const contextMenuList = {
		'redirect-to-setting-page': t('editSetting'),
		'open-preferences-aside': t('preferences'),
		'open-identities-aside': t('identities'),
	};

	const onClickOpenAside = useCallback(
		(v) => {
			console.log(v);
			if (isOpened && asideKey === v) {
				setisOpened(false);
			} else {
				dispatch(settingAction.setAsideKey(v));
				setisOpened(true);
			}
		},
		[dispatch, asideKey, setisOpened, isOpened],
	);

	const handleOnClickEvents = useCallback(
		(v) => () => {
			switch (v) {
				case 'redirect-to-setting-page':
					history.push('/account');
					break;

				case 'open-preferences-aside':
					onClickOpenAside('preferences');
					break;

				case 'open-identities-aside':
					onClickOpenAside('identities');

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
	isOpened: PropTypes.bool.isRequired,
	setisOpened: PropTypes.func.isRequired,
};

export default SettingContextMenu;
