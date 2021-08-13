import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {useHistory} from 'react-router-dom';
import SignUpForm from '../components/Form/SignUpForm';
import SignInLayout from '../components/Layouts/SignInLayout';
import {authSelector} from '../reducers/api/auth';

const SignUp = () => {
	const {userData} = useSelector(authSelector.all);
	const history = useHistory();

	useEffect(() => {
		if (userData) history.push('/');
	}, [history, userData]);

	return (
		<SignInLayout>
			<SignUpForm />
		</SignInLayout>
	);
};

export default SignUp;
