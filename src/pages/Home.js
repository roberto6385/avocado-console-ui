import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import Main from '../components/container/Main';
import Footer from '../components/container/Footer';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	font-family: 'Roboto', sans-serif;
`;

const Home = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<Container>
			<Main />
			<Footer />
		</Container>
	);
};

export default Home;
