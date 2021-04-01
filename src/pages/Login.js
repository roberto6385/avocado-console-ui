import React from 'react';
import LoginForm from '../components/LoginForm';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
const Login = () => {
	const {me} = useSelector((state) => state.common);

	if (me) return <Redirect to='/' />;

	return (
		<div>
			<LoginForm />
		</div>
	);
};

export default Login;
