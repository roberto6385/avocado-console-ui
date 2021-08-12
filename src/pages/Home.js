import React, {useEffect} from 'react';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import WorkSpace from '../components/WorkSpace';
import Footer from '../components/Footer';
import {useHistory} from 'react-router-dom';
import {SAVE_ACCOUT} from '../reducers/common';
import {USER_RESOURCE, userResourceAction} from '../reducers/api/userResource';
import {AUTH} from '../reducers/api/auth';

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

	const {userData} = useSelector((state) => state[AUTH], shallowEqual);
	const {data} = useSelector((state) => state[USER_RESOURCE], shallowEqual);

	useEffect(() => {
		if (userData) {
			console.log(userData);
			dispatch(
				userResourceAction.findByIdRequest({
					access_token: userData.access_token,
					id: userData.user_id,
				}),
			);
		} else {
			history.push('/signin');
			location.reload();
		}
	}, [dispatch, history, userData]);

	useEffect(() => {
		if (data) {
			console.log(data);

			dispatch({
				type: SAVE_ACCOUT,
				payload: {
					account: data.id,
					name: data.name,
					email: data.email,
				},
			});
		}
	}, [dispatch, data]);

	return (
		<_Container>
			<WorkSpace />
			<Footer />
		</_Container>
	);
};

export default Home;
