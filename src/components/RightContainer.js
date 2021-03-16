import React from 'react';
import {Col} from 'react-bootstrap';
import styled from 'styled-components';
import {NAV_HEIGHT} from '../styles/global';
import TabNavBar from './TabNavBar';

const Header = styled(TabNavBar)`
	height: ${NAV_HEIGHT};
`;
const Body = styled.div`
	flex: 1;
`;
const Footer = styled.div`
	height: ${NAV_HEIGHT};
`;

const RC_Col = styled(Col)`
	display: flex;
	flex-direction: column;
`;

const RightContainer = () => {
	return (
		<RC_Col xs={10}>
			<Header />
			<Body>body</Body>
			<Footer>footer</Footer>
		</RC_Col>
	);
};

export default RightContainer;
