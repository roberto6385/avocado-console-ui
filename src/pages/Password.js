import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import FindPasswordForm from '../components/Forms/FindPasswordForm';
import SignInLayout from '../components/Layouts/SignInLayout';
import {authSelector} from '../reducers/api/auth';

const Password = () => {
	const history = useHistory();

	const {userData} = useSelector(authSelector.all);

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
