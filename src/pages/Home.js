import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import Main from '../components/Main';
import Footer from '../components/Footer';
import {Redirect, useHistory} from 'react-router-dom';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	font-family: 'Roboto', sans-serif;
`;

const Home = () => {
	const {userTicket} = useSelector((state) => state.userTicket);
	const history = useHistory();

	useEffect(() => {
		if (!userTicket) {
			history.push('/login');
		}
	}, [userTicket]);

	return (
		<_Container>
			<Main />
			<Footer />
		</_Container>
	);
};

export default Home;
