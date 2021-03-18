import React from 'react';
import {Col} from 'react-bootstrap';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

import TabNavBar from './TabNavBar';
import WorkSpace from './WorkSpace';
import {NAV_HEIGHT} from '../styles/global';
import Footer from './Footer';

const Header = styled(TabNavBar)`
	height: ${NAV_HEIGHT};
`;
// const Body = styled(WorkSpace)`
// 	flex: 1;
// `;

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
	const {tab} = useSelector((state) => state.common);
	return (
		<RC_Col xs={10}>
			<Header />
			<WorkSpace />
			<BotttomBar />
		</RC_Col>
	);
};

export default RightContainer;
