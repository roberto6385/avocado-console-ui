import React from 'react';
import LeftContainer from '../components/LeftContainer';
import RightContainer from '../components/RightContainer';
import {Container, Row} from 'react-bootstrap';
import styled from 'styled-components';

const MainContainer = styled(Container)`
	margin: 0;
	padding: 0;
	height: 100vh;
`;

const MainRow = styled(Row)`
	height: 100%;
	width: 100%;
	margin: 0;
`;

const Main = () => {
	return (
		<MainContainer fluid>
			<MainRow>
				<LeftContainer />
				<RightContainer />
			</MainRow>
		</MainContainer>
	);
};

export default Main;
