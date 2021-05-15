import React, {useEffect} from 'react';
import styled from 'styled-components';
import LeftContainer from '../components/LeftContainer';
import RightContainer from '../components/RightContainer';
import {useSelector} from 'react-redux';
import {RowBox} from '../styles/divs';
import {FOOTER_HEIGHT, LEFT_SIDE_WIDTH} from '../styles/global_design';
import Avocado_Main from '../components/container/Avocado';
import Footer from '../components/container/Footer';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	font-family: 'Roboto', sans-serif;
`;

const Main = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<Container>
			<Avocado_Main />
			<Footer />
		</Container>
		// <RowBox height={'100vh'}>
		// 	{/*<LeftContainer />*/}
		// 	{/*<RightContainer />*/}
		// </RowBox>
	);
};

export default Main;
