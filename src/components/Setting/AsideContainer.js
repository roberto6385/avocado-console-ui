import React, {useCallback} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import PreferencesAside from './Aside/PreferencesAside';
import IdentitiesAside from './Aside/IdentitiesAside';
import AccountAside from './Aside/AccountAside';
import {closeIcon} from '../../icons/icons';
import PropTypes from 'prop-types';
import {SettingTitle} from '../../styles/default';
import {borderColor, fontColor, sideColor} from '../../styles/color';
import {DefaultIconButton} from '../../styles/icon';

const _Container = styled.div`
	height: 100%;
	width: 300px;
	border-left: 1px solid ${(props) => borderColor[props.theme_value]};
	z-index: 5;
	background: ${(props) => sideColor[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
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
				<DefaultIconButton
					theme_value={theme}
					margin={'0px'}
					onClick={closeAside}
				>
					{closeIcon}
				</DefaultIconButton>
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
