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
	const {userTicket, userInfo} = useSelector((state) => state.userTicket);
	const history = useHistory();
	const dispatch = useDispatch();
	// const userInfo = JSON.parse(
	// 	JSON.parse(sessionStorage.getItem('persist:root')).userTicket,
	// ).userInfo;

	useEffect(() => {
		if (!userTicket) {
			history.push('/signin');
		}
	}, [userTicket]);

	useEffect(() => {
		if (userInfo) {
			const email = userInfo.email;
			const index = email.indexOf('@');
			const id = email.substring(0, index);

			dispatch({
				type: SAVE_ACCOUT,
				payload: {
					account: userInfo.id === id ? userInfo.id : id,
					name: userInfo.name,
					email: userInfo.email,
				},
			});
		}
	}, [userInfo]);

	return (
		<_Container>
			<WorkSpace />
			<Footer />
		</_Container>
	);
};

export default Home;
