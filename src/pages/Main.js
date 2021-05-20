import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
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
	);
};

export default Main;
