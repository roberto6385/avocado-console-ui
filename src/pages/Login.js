import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import UserAuthForm from '../components/Form/UserAuthForm';
import {Redirect, useHistory} from 'react-router-dom';
import styled from 'styled-components';

const _Container = styled.div``;

const Login = () => {
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

export default Login;
