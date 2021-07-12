import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import SignInForm from '../components/Form/SignInForm';
import {useHistory} from 'react-router-dom';
import LoginLayout from '../components/LoginLayout';

const SignIn = () => {
	const userTicket = useSelector((state) => state.userTicket.userTicket);
	const history = useHistory();

	console.log(userTicket);

	useEffect(() => {
		if (userTicket) history.push('/');
	}, [history, userTicket]);

	return (
		<LoginLayout>
			<SignInForm />
		</LoginLayout>
	);
};

export default SignIn;
