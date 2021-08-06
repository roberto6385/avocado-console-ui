import React, {useEffect} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import FindPasswordForm from '../components/Form/FindPasswordForm';
import SigninLayout from '../components/Layouts/SigninLayout';

const Password = () => {
	const history = useHistory();

	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);

	useEffect(() => {
		if (userTicket) history.push('/');
	}, [history, userTicket]);

	return (
		<SigninLayout>
			<FindPasswordForm />
		</SigninLayout>
	);
};

export default Password;
