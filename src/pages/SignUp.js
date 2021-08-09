import React, {useEffect} from 'react';
import {shallowEqual, useSelector} from 'react-redux';

import {useHistory} from 'react-router-dom';
import SignUpForm from '../components/Form/SignUpForm';
import SignInLayout from '../components/Layouts/SignInLayout';

const SignUp = () => {
	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);
	const history = useHistory();

	useEffect(() => {
		if (userTicket) history.push('/');
	}, [history, userTicket]);

	return (
		<SignInLayout>
			<SignUpForm />
		</SignInLayout>
	);
};

export default SignUp;
