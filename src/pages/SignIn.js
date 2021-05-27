import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import UserAuthForm from '../components/Form/UserAuthForm';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

const _Container = styled.div`
	height: 100vh;
	width: 100%;
	position: relative;
`;

const SignIn = () => {
	const {userTicket} = useSelector((state) => state.userTicket);
	const history = useHistory();

	useEffect(() => {
		if (userTicket) history.push('/');
	}, [userTicket]);

	return (
		<_Container>
			<UserAuthForm />
		</_Container>
	);
};

export default SignIn;
