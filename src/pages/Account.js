import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import AccountSpace from '../components/Setting/Space/AccountSpace';
import SettingAppLayout from '../components/Setting/SettingLayout';

const Account = () => {
	const userTicket = useSelector((state) => state.userTicket.userTicket);
	const history = useHistory();

	useEffect(() => {
		if (!userTicket) {
			history.push('/signin');
		}
	}, [history, userTicket]);

	return (
		<SettingAppLayout>
			<AccountSpace />
		</SettingAppLayout>
	);
};

export default Account;
