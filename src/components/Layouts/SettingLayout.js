import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SettingNav from '../Setting/SettingNav';
import Footer from '../Footer';
import {avocadoLogo} from '../../icons/icons';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	font-family: 'Roboto', sans-serif;
`;

const _Logo = styled.div`
	svg {
		fill: ${(props) => props.theme.pages.webTerminal.main.font.color};
	}
`;

const _Content = styled.div`
	display: flex;
	overflow: hidden;
	flex: 1;
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	padding: 18px 46px 19px 46px;
	height: 54px;
	border-bottom: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.setting.header.border.color};
	background: ${(props) =>
		props.theme.pages.webTerminal.setting.header.backgroundColor};
`;

const SettingAppLayout = ({children}) => {
	return (
		<_Container>
			<_Header>
				<_Logo>{avocadoLogo}</_Logo>
			</_Header>
			<_Content>
				<SettingNav />
				{children}
			</_Content>
			<Footer />
		</_Container>
	);
};

SettingAppLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default SettingAppLayout;
