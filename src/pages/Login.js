import React from 'react';
import LoginForm from '../components/LoginForm';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {MainContainer} from '../styles/page';

const Login = () => {
	const {me} = useSelector((state) => state.common);

	// if (me) return <Redirect to='/' />;

	return (
		<MainContainer>
			<LoginForm />
		</MainContainer>
	);
};

export default Login;
