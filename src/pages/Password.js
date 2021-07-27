import React, {useEffect} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import PasswordForm from '../components/Form/PasswordForm';
import LoginLayout from '../components/LoginLayout';

const Password = () => {
	const history = useHistory();

	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);

	useEffect(() => {
		if (userTicket) history.push('/');
	}, [history, userTicket]);

	return (
		<LoginLayout>
			<PasswordForm />
		</LoginLayout>
	);
};

export default Password;
