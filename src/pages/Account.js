import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Avocado_Main from '../components/container/Avocado';
import Footer from '../components/container/Footer';
import styled from 'styled-components';
import Avocado_Other from '../components/container/Avocado_Other';
import Header from '../components/container/Header';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	font-family: 'Roboto', sans-serif;
`;

const Account = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<Container>
			<Header />
			<Avocado_Other />
			<Footer />
		</Container>
	);
};

export default Account;
