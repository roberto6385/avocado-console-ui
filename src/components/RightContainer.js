import React from 'react';
import {Col} from 'react-bootstrap';
import styled from 'styled-components';

import TabNavBar from './TabNavBar';
import WorkSpace from './WorkSpace';
import {NAV_HEIGHT} from '../styles/global';
import Footer from './Footer';

const BotttomBar = styled(Footer)`
	height: ${NAV_HEIGHT};
`;

const RC_Col = styled(Col)`
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
`;

const RightContainer = () => {
	return (
		<RC_Col xs={10}>
			<TabNavBar />
			<WorkSpace />
			<BotttomBar />
		</RC_Col>
	);
};

export default RightContainer;
