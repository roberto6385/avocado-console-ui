import React, {useEffect} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import AccountSpace from '../components/Setting/Space/AccountSpace';
import SettingAppLayout from '../components/Setting/SettingLayout';
import {AUTH} from '../reducers/api/auth';

const Account = () => {
	const {userData} = useSelector((state) => state[AUTH], shallowEqual);
	const history = useHistory();

	useEffect(() => {
		if (!userData) {
			history.push('/signin');
			location.reload();
		}
	}, [history, userData]);

	return (
		<SettingAppLayout>
			<AccountSpace />
		</SettingAppLayout>
	);
};

export default Account;
