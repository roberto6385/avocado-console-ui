import React, {useEffect} from 'react';
import {shallowEqual, useSelector} from 'react-redux';

import SignInForm from '../components/Form/SignInForm';
import {useHistory} from 'react-router-dom';
import SignInLayout from '../components/Layouts/SignInLayout';
import {authSelector} from '../reducers/api/auth';

const SignIn = () => {
	const {userData} = useSelector(authSelector.all);
	const history = useHistory();

	useEffect(() => {
		if (userData) {
			history.push('/');
		}
	}, [userData]);

	return (
		<SignInLayout>
			<SignInForm />
		</SignInLayout>
	);
};

export default SignIn;
