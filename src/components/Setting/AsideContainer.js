import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {
	SIXTEEN,
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
import {HEIGHT_50, WIDTH_300} from '../../styles/length';

const _Container = styled.div`
	height: 100%;
	width: ${WIDTH_300};
	min-width: ${WIDTH_300};
	border-left: 1px solid;
	border-color: ${(props) => props.b_color};
	z-index: 5; // terminal보다 높아야 함.
	background: ${(props) => props.back};
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: ${HEIGHT_50};
	padding: 16px;
	font-size: ${SIXTEEN};
	border-bottom: 1px solid;
	border-color: ${(props) => props.b_color};
	color: ${(props) => props.color};
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
			back={sideColor[theme]}
			b_color={borderColor[theme]}
		>
			<_Header color={fontColor[theme]} b_color={borderColor[theme]}>
				{rightSideKey === 'Account' && t('account')}
				{rightSideKey === 'Preferences' && t('preferences')}
				{rightSideKey === 'Identities' && t('identities')}
				<IconButton onClick={closeAside}>{closeIconMedium}</IconButton>
			</_Header>
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
