import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import WorkSpace from '../components/WorkSpace';
import Footer from '../components/Footer';
import {useHistory} from 'react-router-dom';
import {SAVE_ACCOUT} from '../reducers/common';

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
	const dispatch = useDispatch();

	useEffect(() => {
		if (!userTicket) {
			history.push('/signin');
		}
	}, [userTicket]);

	useEffect(() => {
		dispatch({
			type: SAVE_ACCOUT,
			payload: {
				account: localStorage.getItem('user'),
				name: '아보카도',
				email: 'netand@gmail.co.kr',
			},
		});
	}, []);

	return (
		<_Container>
			<WorkSpace />
			<Footer />
		</_Container>
	);
};

export default Home;
