import React from 'react';
import LoginForm from '../components/Form/LoginForm';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {MainContainer} from '../styles/page';
import UserAuthForm from '../components/Form/UserAuthForm';

const Login = () => {
	const {clientTicket} = useSelector((state) => state.clientTicket);
	if (clientTicket) return <Redirect to='/' />;

	return (
		<MainContainer>
			{/*<LoginForm />*/}
			<UserAuthForm />
		</MainContainer>
	);
};

export default Login;
