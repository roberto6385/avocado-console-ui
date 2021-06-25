import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import SignUpForm from '../components/Form/SignUpForm';
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
const SignUp = () => {
	const {userTicket} = useSelector((state) => state.userTicket);
	const history = useHistory();

	useEffect(() => {
		if (userTicket) history.push('/');
	}, [userTicket]);

	return (
		<_BackgroundContainer>
			<SignUpForm />
		</_BackgroundContainer>
	);
};

export default SignUp;
