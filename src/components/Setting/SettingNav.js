import React, {useCallback} from 'react';
import styled from 'styled-components';
import {
	LIGHT_MODE_MINT_COLOR,
	IconContainer,
	borderColor,
	fontColor,
	serverFolderBackColor,
	sideColor,
	iconColor,
} from '../../styles/global';
import {useTranslation} from 'react-i18next';
import {useHistory, withRouter} from 'react-router-dom';
import {
	accountIconMidium,
	chevronLeftIcon,
	identityIconMidium,
	settingIconMidium,
} from '../../icons/icons';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {HEIGHT_34, HEIGHT_50, WIDTH_256} from '../../styles/length';
import {L_GREEN_NORMAL} from '../../styles/color';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	width: ${WIDTH_256};
	min-width: ${WIDTH_256};

	border-right: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _BackContainer = styled.div`
	display: flex;
	align-items: center;
	height: ${HEIGHT_50};
	padding: 0px 16px;
	border-bottom: 1px solid;
	border-color: ${(props) => props.b_color};
	cursor: pointer;
`;

const _Header = styled.div`
	padding: 0px 12px;
`;

const _Ul = styled.ul`
	padding: 8px 0px;
`;

const _Li = styled.li`
	display: flex;
	align-items: center;
	padding: 10px 16px;
	height: ${HEIGHT_34};
	cursor: pointer;
	background: ${(props) => props.back};
	border-left: 2px solid;
	border-color: ${(props) => props.b_color};
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
		<_Container
			back={sideColor[theme]}
			b_color={borderColor[theme]}
			color={fontColor[theme]}
		>
			<_BackContainer
				onClick={changePath('/')}
				b_color={borderColor[theme]}
			>
				{chevronLeftIcon}
				<_Header>{t('back')}</_Header>
			</_BackContainer>
			<_Ul>
				<_Li
					onClick={changePath('/account')}
					back={
						match.path === '/account'
							? serverFolderBackColor[theme]
							: undefined
					}
					b_color={
						match.path === '/account' ? L_GREEN_NORMAL : 'white'
					}
				>
					<IconContainer
						color={
							match.path === '/account'
								? LIGHT_MODE_MINT_COLOR
								: iconColor[theme]
						}
					>
						{accountIconMidium}
					</IconContainer>
					<_Header>{t('account')}</_Header>
				</_Li>
				<_Li
					onClick={changePath('/preferences')}
					back={
						match.path === '/preferences'
							? serverFolderBackColor[theme]
							: undefined
					}
					b_color={
						match.path === '/preferences' ? L_GREEN_NORMAL : 'white'
					}
				>
					<IconContainer
						color={
							match.path === '/preferences'
								? LIGHT_MODE_MINT_COLOR
								: iconColor[theme]
						}
					>
						{settingIconMidium}
					</IconContainer>

					<_Header>{t('preferences')}</_Header>
				</_Li>
				<_Li
					onClick={changePath('/identities')}
					back={
						match.path === '/identities'
							? serverFolderBackColor[theme]
							: undefined
					}
					b_color={
						match.path === '/identities' ? L_GREEN_NORMAL : 'white'
					}
				>
					<IconContainer
						color={
							match.path === '/identities'
								? LIGHT_MODE_MINT_COLOR
								: iconColor[theme]
						}
					>
						{identityIconMidium}
					</IconContainer>
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
