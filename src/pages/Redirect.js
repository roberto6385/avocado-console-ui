import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {AUTH, authAction} from '../reducers/api/auth';
import background from '../images/loginBackground/login_bg_design_2.png';
import styled from 'styled-components';
import LoadingSpinner from '../components/LoadingSpinner';

const _Container = styled.div`
	width: 100%;
	height: 100%;
	background: #126466;
	background-image: url(${background});
	object-fit: contain;
	background-size: cover;
	background-position: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Redirect = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const {userData, clientData, alternativeData} = useSelector(
		(state) => state[AUTH],
		shallowEqual,
	);

	useEffect(() => {
		if (clientData && alternativeData) {
			dispatch(
				authAction.alternativeRequest({
					auth: clientData.access_token,
					alternativeAuth: alternativeData.access_token,
					email: alternativeData.email,
				}),
			);
		}
	}, [clientData, alternativeData, dispatch]);

	useEffect(() => {
		dispatch(authAction.clientRequest());
		dispatch(authAction.googleRequest());
	}, [dispatch, history]);

	useEffect(() => {
		if (userData) history.push('/');
	}, [history, userData]);

	return (
		<_Container>
			<LoadingSpinner />
		</_Container>
	);
};

export default Redirect;
