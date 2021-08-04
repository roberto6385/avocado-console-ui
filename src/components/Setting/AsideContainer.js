import React, {useCallback} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';

import PreferencesAside from './Aside/PreferencesAside';
import IdentitiesAside from './Aside/IdentitiesAside';
import AccountAside from './Aside/AccountAside';
import {closeIcon} from '../../icons/icons';
import {IconButton} from '../../styles/components/icon';
import {SettingTitle} from '../../styles/components/settingPage';

const _Container = styled.div`
	height: 100%;
	width: 300px;
	border-left: 1px solid 	${(props) =>
		props.theme.pages.webTerminal.main.aside.border.color};
};
	z-index: 5;
	background: ${(props) =>
		props.theme.pages.webTerminal.main.aside.backgroundColor};
`;

const _SettingTitle = styled(SettingTitle)`
	padding: 17px 16px 12px;
	justify-content: space-between;
`;

const AsideContainer = ({toggle, setToggle}) => {
	const {t} = useTranslation('asideContainer');
	const {rightSideKey, theme} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

	const closeAside = useCallback(() => {
		setToggle(false);
	}, [setToggle]);

	return (
		<_Container
			className={toggle ? 'aside' : 'aside close'}
			theme_value={theme}
		>
			<_SettingTitle theme_value={theme}>
				{rightSideKey === 'Account' && t('account')}
				{rightSideKey === 'Preferences' && t('preferences')}
				{rightSideKey === 'Identities' && t('identities')}
				<IconButton
					theme_value={theme}
					margin={'0px'}
					onClick={closeAside}
				>
					{closeIcon}
				</IconButton>
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
