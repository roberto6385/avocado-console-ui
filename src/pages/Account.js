import React from 'react';
import {useSelector} from 'react-redux';

import AccountSetting from '../components/Setting/AccountSetting';
import SettingAppLayout from '../components/Setting/SettingLayout';

const Account = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<SettingAppLayout>
			<AccountSetting />
		</SettingAppLayout>
	);
};

export default Account;
