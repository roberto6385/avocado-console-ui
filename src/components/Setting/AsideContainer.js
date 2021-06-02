import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {
	IconButton,
	RIGHT_SIDE_WIDTH,
	SIXTEEN,
	SUB_HEIGHT,
	sideColor,
	fontColor,
	iconColor,
	borderColor,
} from '../../styles/global';
import PreferencesAside from './Aside/PreferencesAside';
import IdentitiesAside from './Aside/IdentitiesAside';
import AccountAside from './Aside/AccountAside';
import {closeIconMedium} from '../../icons/icons';
import PropTypes from 'prop-types';

const _Container = styled.div`
	height: 100%;
	width: ${RIGHT_SIDE_WIDTH};
	min-width: ${RIGHT_SIDE_WIDTH};
	border-left: 1px solid;
	border-color: ${(props) => props.b_color};
	z-index: 5; // terminal보다 높아야 함.
	background: ${(props) => props.back};
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: ${SUB_HEIGHT};
	padding: 16px;
	font-size: ${SIXTEEN};
	border-bottom: 1px solid;
	border-color: ${(props) => props.b_color};
	color: ${(props) => props.color};
`;

const _IconButton = styled(IconButton)`
	padding: 6px 0px 6px 6px;
`;

const AsideContainer = () => {
	const {t} = useTranslation('asideContainer');
	const {rightSideKey, theme} = useSelector((state) => state.common);

	// const close_sidebar = useCallback(() => {
	// 	setToggle(false);
	// }, []);

	return (
		<_Container back={sideColor[theme]} b_color={borderColor[theme]}>
			<_Header color={fontColor[theme]} b_color={borderColor[theme]}>
				{rightSideKey === 'Account' && t('account')}
				{rightSideKey === 'Preferences' && t('preferences')}
				{rightSideKey === 'Identities' && t('identities')}
				{/*<_IconButton color={iconColor[theme]} onClick={close_sidebar}>*/}
				{/*	{closeIconMedium}*/}
				{/*</_IconButton>*/}
			</_Header>
			{rightSideKey === 'Account' && <AccountAside />}
			{rightSideKey === 'Preferences' && <PreferencesAside />}
			{rightSideKey === 'Identities' && <IdentitiesAside />}
		</_Container>
	);
};

export default AsideContainer;
