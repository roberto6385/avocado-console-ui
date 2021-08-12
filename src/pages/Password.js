import React, {useEffect} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import FindPasswordForm from '../components/Form/FindPasswordForm';
import SignInLayout from '../components/Layouts/SignInLayout';
import {AUTH} from '../reducers/api/auth';

const Password = () => {
	const history = useHistory();

	const {userData} = useSelector((state) => state[AUTH], shallowEqual);

	useEffect(() => {
		if (userData) history.push('/');
	}, [history, userData]);

	return (
		<SignInLayout>
			<FindPasswordForm />
		</SignInLayout>
	);
};

export default Password;
