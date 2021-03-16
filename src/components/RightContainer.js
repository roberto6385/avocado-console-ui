import React from 'react';
import {Col} from 'react-bootstrap';
import styled from 'styled-components';

import TabNavBar from './TabNavBar';
import WorkSpace from './WorkSpace';

import {MAIN_COLOR, NAV_HEIGHT, WHITE_COLOR} from '../styles/global';

import {useSelector} from 'react-redux';
import background from '../images/bg_3.png';

const Header = styled(TabNavBar)`
	height: ${NAV_HEIGHT};
`;
const Body = styled(WorkSpace)`
	flex: 1;
`;
const Footer = styled.div`
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

			<Body />

			<Footer>footer</Footer>
		</RC_Col>
	);
};

export default RightContainer;
