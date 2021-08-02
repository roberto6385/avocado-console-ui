import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import background from '../../images/loginBackground/login_bg_design_1.jpg';
import DarkModeLogo from '../../images/logo/logo_white@3x.png';

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
	margin: 22.1px 141px 37px 0px;
	line-height: 1.5;
	color: #ffffff;
	display: flex;
	align-items: center;
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

const SigninLayout = ({children}) => {
	return (
		<_Container>
			<_HeaderContainer>
				<img src={DarkModeLogo} height='45.9' alt='DarkModeLogo' />
				<_Span>
					<_SpanText /> ex.slogan of avocado solution
				</_Span>
				<_Description>
					Manage your servers from your browser with a professional
					and feature rich terminal and remote desktop client
				</_Description>
			</_HeaderContainer>
			{children}
			<_Footer>Copyright NETAND Co.,Ltd. All rights reserved.</_Footer>
		</_Container>
	);
};

SigninLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default SigninLayout;
