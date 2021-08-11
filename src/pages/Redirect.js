import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
	ALTERNATIVE_TICKET_REQUEST,
	AUTH_WITH_GOOGLE_REQUEST,
	GET_CLIENT_TICKET_REQUEST,
} from '../reducers/auth/userTicket';
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

	const {userTicket, clientTicket, alternative} = useSelector(
		(state) => state.userTicket,
		shallowEqual,
	);

	useEffect(() => {
		if (clientTicket && alternative) {
			dispatch({
				type: ALTERNATIVE_TICKET_REQUEST,
				payload: {
					auth: clientTicket.access_token,
					alternativeAuth: alternative.access_token,
					email: alternative.email,
				},
			});
		}
	}, [clientTicket, alternative, dispatch]);

	useEffect(() => {
		dispatch({type: GET_CLIENT_TICKET_REQUEST});
		dispatch({type: AUTH_WITH_GOOGLE_REQUEST});
	}, [dispatch, history]);

	useEffect(() => {
		if (userTicket) history.push('/');
	}, [history, userTicket]);

	return (
		<_Container>
			<LoadingSpinner />
		</_Container>
	);
};

export default Redirect;
