import React, {useCallback} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import {useTranslation} from 'react-i18next';
import {RIGHT_SIDE_KEY} from '../../reducers/common';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {DropDownMenu} from '../../styles/components/contextMenu';

const SettingContextMenu = ({toggle, setToggle}) => {
	const {t} = useTranslation('rightCornerIcons');
	const dispatch = useDispatch();
	const history = useHistory();
	const {rightSideKey} = useSelector((state) => state.common, shallowEqual);

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[history],
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
		[dispatch, rightSideKey, setToggle, toggle],
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
