import React, {useCallback} from 'react';
import styled from 'styled-components';
import {
	FOLDER_HEIGHT,
	LIGHT_MODE_MINT_COLOR,
	IconContainer,
	SIDE_WIDTH,
	SUB_HEIGHT,
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

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	width: ${SIDE_WIDTH};
	min-width: ${SIDE_WIDTH};

	border-right: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _BackContainer = styled.div`
	display: flex;
	align-items: center;
	height: ${SUB_HEIGHT};
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
	height: ${FOLDER_HEIGHT};
	cursor: pointer;
	background: ${(props) => props.back};
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
