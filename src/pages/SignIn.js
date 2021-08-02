import React, {useEffect} from 'react';
import {shallowEqual, useSelector} from 'react-redux';

import SignInForm from '../components/Form/SignInForm';
import {useHistory} from 'react-router-dom';
import SigninLayout from '../components/Layouts/SigninLayout';

const SignIn = () => {
	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);
	const history = useHistory();

	useEffect(() => {
		if (userTicket) {
			history.push('/');
		}
	}, [userTicket]);

	return (
		<SigninLayout>
			<SignInForm />
		</SigninLayout>
	);
};

export default SignIn;
