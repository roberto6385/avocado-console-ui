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
	const {side_key} = useSelector((state) => state.common, shallowEqual);

	const closeAside = useCallback(() => {
		setToggle(false);
	}, [setToggle]);

	return (
		<_Container className={toggle ? 'aside' : 'aside close'}>
			<_SettingTitle>
				{side_key === 'Account' && t('account')}
				{side_key === 'Preferences' && t('preferences')}
				{side_key === 'Identities' && t('identities')}
				<IconButton itype={'font'} margin={'0px'} onClick={closeAside}>
					{closeIcon}
				</IconButton>
			</_SettingTitle>
			{side_key === 'Account' && <AccountAside />}
			{side_key === 'Preferences' && <PreferencesAside />}
			{side_key === 'Identities' && <IdentitiesAside />}
		</_Container>
	);
};

AsideContainer.propTypes = {
	toggle: PropTypes.bool.isRequired,
	setToggle: PropTypes.func.isRequired,
};

export default AsideContainer;
