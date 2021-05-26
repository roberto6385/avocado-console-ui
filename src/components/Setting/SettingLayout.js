import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SettingNav from './SettingNav';
import Footer from '../Footer';
import {
	BORDER_COLOR,
	GREEN_COLOR,
	MAIN_HEIGHT,
} from '../../styles/global';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	font-family: 'Roboto', sans-serif;
`;

const _ContentsContainer = styled.div`
	display: flex;
	overflow: hidden;
	flex: 1;
`;

const _Header = styled.div`
	display: flex;
	align-item: center;
	padding: 20px 46px;
	height: ${MAIN_HEIGHT};
	font-family: 'Roboto Slab', serif;
	border-bottom: 1px solid ${BORDER_COLOR};
`;

const _Span = styled.span`
	font-size: 23px;
	line-height: 20px;
	color: ${GREEN_COLOR};
`;

const SettingAppLayout = ({children}) => {
	return (
		<_Container>
			<_Header>
				<_Span>Avocado</_Span>
			</_Header>
			<_ContentsContainer>
				<SettingNav />
				{children}
			</_ContentsContainer>
			<Footer />
		</_Container>
	);
};

SettingAppLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default SettingAppLayout;
