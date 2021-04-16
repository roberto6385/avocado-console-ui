import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {MainContainer} from '../styles/page';
import UserAuthForm from '../components/Form/UserAuthForm';

const Login = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<MainContainer>
			<UserAuthForm />
		</MainContainer>
	);
};

export default Login;
