import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import WorkSpace from '../components/WorkSpace';
import Footer from '../components/Footer';
import {useHistory} from 'react-router-dom';

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
			history.push('/signin');
		}
	}, [userTicket]);

	return (
		<_Container>
			<WorkSpace />
			<Footer />
		</_Container>
	);
};

export default Home;
