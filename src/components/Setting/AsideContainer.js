import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {
	sideColor,
	fontColor,
	borderColor,
	IconButton,
} from '../../styles/global';
import PreferencesAside from './Aside/PreferencesAside';
import IdentitiesAside from './Aside/IdentitiesAside';
import AccountAside from './Aside/AccountAside';
import {closeIconMedium} from '../../icons/icons';
import PropTypes from 'prop-types';
import {SettingTitle} from '../../styles/default';

const _Container = styled.div`
	height: 100%;
	width: 300px;
	border-left: 1px solid ${(props) => borderColor[props.themeValue]};
	z-index: 5; // terminal보다 높아야 함.
	background: ${(props) => sideColor[props.themeValue]};
	color: ${(props) => fontColor[props.themeValue]};
`;

const _SettingTitle = styled(SettingTitle)`
	padding: 17px 16px 12px;
	justify-content: space-between;
`;

const AsideContainer = ({toggle, setToggle}) => {
	const {t} = useTranslation('asideContainer');
	const {rightSideKey, theme} = useSelector((state) => state.common);

	const closeAside = useCallback(() => {
		setToggle(false);
	}, []);

	return (
		<_Container
			className={toggle ? 'aside' : 'aside close'}
			themeValue={theme}
		>
			<_SettingTitle themeValue={theme}>
				{rightSideKey === 'Account' && t('account')}
				{rightSideKey === 'Preferences' && t('preferences')}
				{rightSideKey === 'Identities' && t('identities')}
				<IconButton onClick={closeAside}>{closeIconMedium}</IconButton>
			</_SettingTitle>
			{rightSideKey === 'Account' && <AccountAside />}
			{rightSideKey === 'Preferences' && <PreferencesAside />}
			{rightSideKey === 'Identities' && <IdentitiesAside />}
		</_Container>
	);
};

AsideContainer.propTypes = {
	toggle: PropTypes.bool.isRequired,
	setToggle: PropTypes.func.isRequired,
};

export default AsideContainer;
