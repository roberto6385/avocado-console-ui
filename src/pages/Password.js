import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import PasswordForm from '../components/Form/PasswordForm';
import LoginLayout from '../components/LoginLayout';

const Password = () => {
	const {userTicket} = useSelector((state) => state.userTicket);
	const history = useHistory();

	useEffect(() => {
		if (userTicket) history.push('/');
	}, [userTicket]);

	return (
		<LoginLayout>
			<PasswordForm />
		</LoginLayout>
	);
};

export default Password;
