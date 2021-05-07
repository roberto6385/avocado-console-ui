import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import UserAuthForm from '../components/Form/UserAuthForm';
import {RowBox} from '../styles/divs';

const Login = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<RowBox height={'100vh'}>
			<UserAuthForm />
		</RowBox>
	);
};

export default Login;
