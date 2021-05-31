import React, {useCallback} from 'react';
import styled from 'styled-components';
import {
	LIGHT_MODE_BORDER_COLOR,
	FOLDER_HEIGHT,
	MINT_COLOR,
	IconContainer,
	LIGHT_MODE_BACKGROUND_MINT_COLOR,
	SIDE_WIDTH,
	SUB_HEIGHT,
	LIGHT_MODE_ICON_COLOR,
} from '../../styles/global';

import {useHistory, withRouter} from 'react-router-dom';
import {
	accountIconMidium,
	chevronLeftIcon,
	identityIconMidium,
	settingIconMidium,
} from '../../icons/icons';
import PropTypes from 'prop-types';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	width: ${SIDE_WIDTH};
	min-width: ${SIDE_WIDTH};
	border-right: 1px solid ${LIGHT_MODE_BORDER_COLOR};
`;

const _BackContainer = styled.div`
	display: flex;
	align-items: center;
	height: ${SUB_HEIGHT};
	padding: 0px 16px;
	border-bottom: 1px solid ${LIGHT_MODE_BORDER_COLOR};
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

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	console.log(match);

	return (
		<_Container>
			<_BackContainer onClick={changePath('/')}>
				{chevronLeftIcon}
				<_Header>Back</_Header>
			</_BackContainer>
			<_Ul>
				<_Li
					onClick={changePath('/account')}
					back={
						match.path === '/account'
							? LIGHT_MODE_BACKGROUND_MINT_COLOR
							: undefined
					}
				>
					<IconContainer
						color={
							match.path === '/account'
								? MINT_COLOR
								: LIGHT_MODE_ICON_COLOR
						}
					>
						{accountIconMidium}
					</IconContainer>
					<_Header>Account</_Header>
				</_Li>
				<_Li
					onClick={changePath('/preferences')}
					back={
						match.path === '/preferences'
							? LIGHT_MODE_BACKGROUND_MINT_COLOR
							: undefined
					}
				>
					<IconContainer
						color={
							match.path === '/preferences'
								? MINT_COLOR
								: LIGHT_MODE_ICON_COLOR
						}
					>
						{settingIconMidium}
					</IconContainer>

					<_Header>Preferences</_Header>
				</_Li>
				<_Li
					onClick={changePath('/identities')}
					back={
						match.path === '/identities'
							? LIGHT_MODE_BACKGROUND_MINT_COLOR
							: undefined
					}
				>
					<IconContainer
						color={
							match.path === '/identities'
								? MINT_COLOR
								: LIGHT_MODE_ICON_COLOR
						}
					>
						{identityIconMidium}
					</IconContainer>
					<_Header>Identity</_Header>
				</_Li>
			</_Ul>
		</_Container>
	);
};

SettingNav.propTypes = {
	match: PropTypes.object,
};

export default withRouter(SettingNav);
