import React from 'react';
import LoginForm from '../components/Form/LoginForm';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {MainContainer} from '../styles/page';
import UserAuthForm from '../components/Form/UserAuthForm';

const Login = () => {
	const {userTicket} = useSelector((state) => state.userTicket);
	if (userTicket) return <Redirect to='/' />;

	return (
		<MainContainer>
			{/*<LoginForm />*/}
			<UserAuthForm />
		</MainContainer>
	);
};

export default Login;
