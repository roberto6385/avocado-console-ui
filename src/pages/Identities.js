import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import SettingAppLayout from '../components/Setting/SettingLayout';

import {useHistory} from 'react-router-dom';
import IdentitiesSpace from '../components/Setting/Space/IdentitiesSpace';

const Identities = () => {
	const userTicket = useSelector((state) => state.userTicket.userTicket);
	const history = useHistory();

	useEffect(() => {
		if (!userTicket) {
			history.push('/signin');
			location.reload();
		}
	}, [history, userTicket]);

	return (
		<SettingAppLayout>
			<IdentitiesSpace />
		</SettingAppLayout>
	);
};

export default Identities;
