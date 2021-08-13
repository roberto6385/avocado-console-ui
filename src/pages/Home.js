import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import WorkSpace from '../components/WorkSpace';
import Footer from '../components/Footer';
import {useHistory} from 'react-router-dom';
import {userResourceAction} from '../reducers/api/userResource';
import {authSelector} from '../reducers/api/auth';

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

	const {userData} = useSelector(authSelector.all);

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

	return (
		<_Container>
			<WorkSpace />
			<Footer />
		</_Container>
	);
};

export default Home;
