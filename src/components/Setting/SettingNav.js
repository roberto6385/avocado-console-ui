import React, {useCallback} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {useTranslation} from 'react-i18next';
import {useHistory, withRouter} from 'react-router-dom';
import {
	accountIcon,
	chevronLeftIcon,
	identityIcon,
	settingIcon,
} from '../../icons/icons';
import {Icon, IconButton} from '../../styles/components/icon';
const _Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 256px;
	min-width: 256px;
	border-right: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.setting.navigation.border.color};
	background: ${(props) =>
		props.theme.pages.webTerminal.setting.navigation.backgroundColor};
`;

const _BackContainer = styled.div`
	display: flex;
	align-items: center;
	height: 50px;
	padding: 12px 16px;
	border-bottom: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.setting.navigation.border.color};
	cursor: pointer;
`;

const _Header = styled.div`
	padding: 0px 12px;
	font-size: 16px;
`;

const _Ul = styled.ul`
	padding: 8px 0px;
`;

const _Li = styled.li`
	display: flex;
	align-items: center;
	padding: 10px 16px;
	height: 34px;
	cursor: pointer;
	background: ${(props) =>
		props.selected &&
		props.theme.pages.webTerminal.setting.navigation.items.selectedStyle
			.backgroundColor};
	border-left: 2px solid;
	border-color: ${(props) =>
		props.selected
			? props.theme.pages.webTerminal.setting.navigation.items
					.selectedStyle.border.color
			: props.theme.pages.webTerminal.setting.navigation.items.normalStyle
					.border.color};
`;

const SettingNav = ({match}) => {
	const history = useHistory();
	const {t} = useTranslation('settingNav');

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[history],
	);

	return (
		<_Container>
			<_BackContainer onClick={changePath('/')}>
				<IconButton
					itype={'font'}
					margin={'0px'}
					onClick={changePath('/')}
				>
					{chevronLeftIcon}
				</IconButton>
				<_Header>{t('back')}</_Header>
			</_BackContainer>

			<_Ul>
				<_Li
					onClick={changePath('/account')}
					selected={match.path === '/account'}
				>
					<Icon
						size={'sm'}
						margin={'0px'}
						itype={match.path === '/account' && 'selected'}
					>
						{accountIcon}
					</Icon>
					<_Header>{t('account')}</_Header>
				</_Li>
				<_Li
					onClick={changePath('/preferences')}
					selected={match.path === '/preferences'}
				>
					<Icon
						size={'sm'}
						margin={'0px'}
						itype={match.path === '/preferences' && 'selected'}
					>
						{settingIcon}
					</Icon>
					<_Header>{t('preferences')}</_Header>
				</_Li>
				<_Li
					onClick={changePath('/identities')}
					selected={match.path === '/identities'}
				>
					<Icon
						size={'sm'}
						margin={'0px'}
						itype={match.path === '/identities' && 'selected'}
					>
						{identityIcon}
					</Icon>
					<_Header>{t('identities')}</_Header>
				</_Li>
			</_Ul>
		</_Container>
	);
};

SettingNav.propTypes = {
	match: PropTypes.object,
};

export default withRouter(SettingNav);
