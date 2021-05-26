import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import SettingAppLayout from '../components/Setting/SettingLayout';

import {useHistory} from 'react-router-dom';
import IdentitiesSetting from '../components/Setting/IdentitiesSetting';

const Identities = () => {
	const {userTicket} = useSelector((state) => state.userTicket);
	const history = useHistory();

	useEffect(() => {
		if (!userTicket) {
			history.push('/login');
		}
	}, [userTicket]);

	return (
		<SettingAppLayout>
			<IdentitiesSetting />
		</SettingAppLayout>
	);
};

export default Identities;
