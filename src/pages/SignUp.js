import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {DARK_GREEN_COLOR} from '../styles/global';
import background from '../images/login.png';
import SignUpForm from '../components/Form/SignUpForm';

const _Container = styled.div`
	background: ${DARK_GREEN_COLOR};
	height: 100vh;
	width: 100%;
`;

const _BackgroundContainer = styled.div`
	background-image: url(${background});
	object-fit: contain;
	height: 100%;
	background-size: cover;
	background-position: center;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const SignUp = () => {
	const {userTicket} = useSelector((state) => state.userTicket);
	const history = useHistory();

	useEffect(() => {
		if (userTicket) history.push('/');
	}, [userTicket]);

	return (
		<_Container>
			<_BackgroundContainer>
				<SignUpForm />
			</_BackgroundContainer>
		</_Container>
	);
};

export default SignUp;
