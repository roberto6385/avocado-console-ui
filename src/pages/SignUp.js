import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {useHistory} from 'react-router-dom';
import SignUpForm from '../components/Form/SignUpForm';
import LoginLayout from '../components/LoginLayout';

const SignUp = () => {
	const {userTicket} = useSelector((state) => state.userTicket);
	const history = useHistory();

	useEffect(() => {
		if (userTicket) history.push('/');
	}, [userTicket]);

	return (
		<LoginLayout>
			<SignUpForm />
		</LoginLayout>
	);
};

export default SignUp;
