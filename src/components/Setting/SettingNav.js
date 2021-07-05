import React, {useCallback} from 'react';
import styled from 'styled-components';

import {useTranslation} from 'react-i18next';
import {useHistory, withRouter} from 'react-router-dom';
import {
	accountIcon,
	chevronLeftIcon,
	identityIcon,
	settingIcon,
} from '../../icons/icons';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {
	activeColor,
	borderColor,
	fontColor,
	iconColor,
	navColor,
	navHighColor,
} from '../../styles/color';
import {ClickableIconButton, IconBox} from '../../styles/button';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 256px;
	min-width: 256px;
	border-right: 1px solid;
	border-color: ${(props) => borderColor[props.theme_value]};
	background: ${(props) => navColor[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
`;

const _BackContainer = styled.div`
	display: flex;
	align-items: center;
	height: 50px;
	padding: 12px 16px;
	border-bottom: 1px solid;
	border-color: ${(props) => borderColor[props.theme_value]};
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
	background: ${(props) => props.clicked && navHighColor[props.theme_value]};
	border-left: 2px solid;
	border-color: ${(props) =>
		props.clicked
			? activeColor[props.theme_value]
			: navColor[props.theme_value]};
`;

const SettingNav = ({match}) => {
	const history = useHistory();
	const {t} = useTranslation('settingNav');
	const {theme} = useSelector((state) => state.common);

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	return (
		<_Container theme_value={theme}>
			<_BackContainer onClick={changePath('/')} theme_value={theme}>
				<ClickableIconButton
					margin_right={'0px'}
					color={fontColor[theme]}
					onClick={changePath('/')}
				>
					{chevronLeftIcon}
				</ClickableIconButton>
				<_Header>{t('back')}</_Header>
			</_BackContainer>

			<_Ul>
				<_Li
					onClick={changePath('/account')}
					clicked={match.path === '/account'}
					theme_value={theme}
				>
					<IconBox
						size={'sm'}
						margin={'0px'}
						color={
							match.path === '/account'
								? activeColor[theme]
								: iconColor[theme]
						}
					>
						{accountIcon}
					</IconBox>
					<_Header>{t('account')}</_Header>
				</_Li>
				<_Li
					onClick={changePath('/preferences')}
					clicked={match.path === '/preferences'}
					theme_value={theme}
				>
					<IconBox
						size={'sm'}
						margin={'0px'}
						color={
							match.path === '/preferences'
								? activeColor[theme]
								: iconColor[theme]
						}
					>
						{settingIcon}
					</IconBox>
					<_Header>{t('preferences')}</_Header>
				</_Li>
				<_Li
					onClick={changePath('/identities')}
					clicked={match.path === '/identities'}
					theme_value={theme}
				>
					<IconBox
						size={'sm'}
						margin={'0px'}
						color={
							match.path === '/identities'
								? activeColor[theme]
								: iconColor[theme]
						}
					>
						{identityIcon}
					</IconBox>
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
