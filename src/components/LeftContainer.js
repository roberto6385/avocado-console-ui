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

const RC_Col = styled(Col)`
	display: flex;
	flex-direction: column;
`;

const LeftContainer = () => {
	return (
		<RC_Col xs={2}>
			<Header>header</Header>
			<Body>Body</Body>
		</RC_Col>
	);
};

export default LeftContainer;
