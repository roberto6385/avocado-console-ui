import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import AccountSpace from '../components/Setting/AccountSpace';

import SettingAppLayout from '../components/Setting/SettingLayout';

const Account = () => {
	const {userTicket} = useSelector((state) => state.userTicket);
	const history = useHistory();

	useEffect(() => {
		if (!userTicket) {
			history.push('/signin');
		}
	}, [userTicket]);

	return (
		<SettingAppLayout>
			<AccountSpace />
		</SettingAppLayout>
	);
};

export default Account;
