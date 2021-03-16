import React from 'react';
import {Col} from 'react-bootstrap';
import styled from 'styled-components';
import {NAV_HEIGHT} from '../styles/global';

const Header = styled.div`
	height: ${NAV_HEIGHT};
`;
const Body = styled.div`
	flex: 1;
`;

const RC_Col = styled(Col)`
	display: flex;
	flex-direction: column;
`;

const LeftContainer = () => {
	return (
		<RC_Col xs={2}>
			<Header>header</Header>
			<Body>body</Body>
		</RC_Col>
	);
};

export default LeftContainer;
