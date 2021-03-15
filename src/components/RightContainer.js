import React from 'react';
import {Col} from 'react-bootstrap';
import styled from 'styled-components';

const NAV_HEIGHT = '42px';

const Header = styled.div`
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
			<Header>header</Header>
			<Body>body</Body>
			<Footer>footer</Footer>
		</RC_Col>
	);
};

export default RightContainer;
