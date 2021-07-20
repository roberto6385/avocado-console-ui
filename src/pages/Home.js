import React, {useEffect} from 'react';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import WorkSpace from '../components/WorkSpace';
import Footer from '../components/Footer';
import {useHistory} from 'react-router-dom';
import {INIT_FAVORITES, SAVE_ACCOUT} from '../reducers/common';
import {navColor} from '../styles/color';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	font-family: 'Roboto', sans-serif;
	background: ${(props) => props?.back};
`;

const Home = () => {
	const {userTicket, userInfo} = useSelector(
		(state) => state.userTicket,
		shallowEqual,
	);
	const theme = useSelector((state) => state?.common.theme);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!userTicket) {
			history.push('/signin');
		}
	}, [history, userTicket]);

	useEffect(() => {
		dispatch({type: INIT_FAVORITES});
	});

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
		<_Container background={navColor[theme]}>
			<WorkSpace />
			<Footer />
		</_Container>
	);
};

export default Home;
