import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import SettingAppLayout from '../components/Setting/SettingLayout';
import IdentitiesSpace from '../components/Setting/Space/IdentitiesSpace';
import {authSelector} from '../reducers/api/auth';

const Identities = () => {
	const history = useHistory();

	const {userData} = useSelector(authSelector.all);

	useEffect(() => {
		if (!userData) {
			history.push('/signin');
			location.reload();
		}
	}, [history, userData]);

	return (
		<SettingAppLayout>
			<IdentitiesSpace />
		</SettingAppLayout>
	);
};

export default Identities;
