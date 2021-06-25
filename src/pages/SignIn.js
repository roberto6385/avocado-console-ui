import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import SignInForm from '../components/Form/SignInForm';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import background from '../images/login_bg_design_1.jpg';

const _BackgroundContainer = styled.div`
	background-image: url(${background});
	object-fit: contain;
	height: 100%;
	width: 100%;
	background-size: cover;
	background-position: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const SignIn = () => {
	const {userTicket} = useSelector((state) => state.userTicket);
	const history = useHistory();

	useEffect(() => {
		if (userTicket) history.push('/');
	}, [userTicket]);

	return (
		<_BackgroundContainer>
			<SignInForm />
		</_BackgroundContainer>
	);
};

export default SignIn;
