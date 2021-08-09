import React, {useEffect} from 'react';
import {shallowEqual, useSelector} from 'react-redux';

import SignInForm from '../components/Form/SignInForm';
import {useHistory} from 'react-router-dom';
import SignInLayout from '../components/Layouts/SignInLayout';

const SignIn = () => {
	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);
	const history = useHistory();

	useEffect(() => {
		if (userTicket) {
			history.push('/');
		}
	}, [userTicket]);

	return (
		<SignInLayout>
			<SignInForm />
		</SignInLayout>
	);
};

export default SignIn;
