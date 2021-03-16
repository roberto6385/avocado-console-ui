import React from 'react';
import {Col} from 'react-bootstrap';
import styled from 'styled-components';
import {MAIN_COLOR, NAV_HEIGHT, WHITE_COLOR} from '../styles/global';
import TabNavBar from './TabNavBar';
import {useSelector} from 'react-redux';
import background from '../images/bg_3.png';

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
	margin: 0;
	padding: 0;
`;

const Background_div = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	// width: 100%;
	height: 100%;
	background-image: url(${background});
	background-size: cover;
	background-position: center;
	// background-repeat: no-repeat;
	position: relative;
`;

const New_button = styled.button`
	background-color: ${MAIN_COLOR};
	&:hover {
		background-color: ${MAIN_COLOR};
		filter: brightness(85%);
	}
	padding: 10px 40px;
	border: none;
	color: ${WHITE_COLOR};
	border-radius: 8px;
	position: absolute;
	top: 60%;
`;

const RightContainer = () => {
	const {tab} = useSelector((state) => state.common);
	return (
		<RC_Col xs={10}>
			<Header />
			<Body>
				{tab.length > 0 ? (
					<div>터미널, SFTP</div>
				) : (
					<Background_div>
						<New_button>Add Server</New_button>
					</Background_div>
				)}
			</Body>

			<Footer>footer</Footer>
		</RC_Col>
	);
};

export default RightContainer;
