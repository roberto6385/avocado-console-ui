import React, {useEffect} from 'react';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import WorkSpace from '../components/WorkSpace';
import Footer from '../components/Footer';
import {useHistory} from 'react-router-dom';
import {INIT_FAVORITES, SAVE_ACCOUT} from '../reducers/common';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	font-family: 'Roboto', sans-serif;
`;

const Home = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const {userTicket, userInfo} = useSelector(
		(state) => state.userTicket,
		shallowEqual,
	);

	useEffect(() => {
		if (!userTicket) {
			history.push('/signin');
			location.reload();
		}
	}, [history, userTicket]);

	useEffect(() => {
		dispatch({type: INIT_FAVORITES});
	}, []);

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
	}, [dispatch, userInfo]);

	return (
		<_Container>
			<WorkSpace />
			<Footer />
		</_Container>
	);
};

export default Home;
