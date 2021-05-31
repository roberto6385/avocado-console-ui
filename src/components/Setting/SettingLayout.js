import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SettingNav from './SettingNav';
import Footer from '../Footer';
import {
	LIGHT_MODE_BORDER_COLOR,
	GREEN_COLOR,
	MAIN_HEIGHT,
	borderColor,
	sideColor,
} from '../../styles/global';
import {useSelector} from 'react-redux';

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
	border-bottom: 1px solid ${LIGHT_MODE_BORDER_COLOR};

	border-bottom: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
`;

const _Span = styled.span`
	font-size: 23px;
	line-height: 20px;
	color: ${GREEN_COLOR};
`;

const SettingAppLayout = ({children}) => {
	const {theme} = useSelector((state) => state.common);

	return (
		<_Container>
			<_Header b_color={borderColor[theme]} back={sideColor[theme]}>
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
