import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import background from '../../images/loginBackground/login_bg_design_1.jpg';
import {avocadoLogo} from '../../icons/icons';
import {useTranslation} from 'react-i18next';

const _Container = styled.div`
	background-image: url(${background});
	object-fit: contain;
	height: 100%;
	width: 100%;
	background-size: cover;
	background-position: center;
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const _HeaderContainer = styled.div`
	width: 50%;
`;

const _Span = styled.div`
	font-size: 16px;
	font-weight: 500;
	margin: 22.1px 0px;
	line-height: 1.5;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const _Description = styled.div`
	letter-spacing: 0.15px;
	color: #ffffff;
	width: 411px;
	line-height: 1.71;
	height: 48px;
	margin: 37px 0 0;
`;

const _Footer = styled.div`
	width: 288px;
	height: 16px;
	color: #ffffff;
	position: fixed;
	bottom: 35px;
	left: 42px;
`;
const _SpanText = styled.div`
	width: 38px;
	height: 3px;
	border-radius: 13px;
	margin: 0 3px 0 0;
	background-image: linear-gradient(to top, #30b3b6, #62d2a3);
`;

const _Logo = styled.div`
	width: 270px;
	svg {
		fill: white;
		width: 270px;
		height: 45.9px;
	}
`;

const SignInLayout = ({children}) => {
	const {t} = useTranslation('signInLayout');

	return (
		<_Container>
			<_HeaderContainer>
				<_Logo>
					{avocadoLogo}
					<_Span>
						<_SpanText /> {t('slogan')}
					</_Span>
				</_Logo>
				<_Description>{t('description')}</_Description>
			</_HeaderContainer>
			{children}
			<_Footer>{t('copyright')}</_Footer>
		</_Container>
	);
};

SignInLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default SignInLayout;
