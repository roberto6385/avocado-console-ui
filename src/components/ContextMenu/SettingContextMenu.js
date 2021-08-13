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
	const {side_key} = useSelector((state) => state.common, shallowEqual);

	const onClickRedirectToAccountPage = useCallback(
		(path) => () => {
			history.push(path);
		},
		[history],
	);

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
