import React, {useEffect} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import SettingAppLayout from '../components/Setting/SettingLayout';
import IdentitiesSpace from '../components/Setting/Space/IdentitiesSpace';
import {AUTH} from '../reducers/api/auth';

const Identities = () => {
	const history = useHistory();

	const {userData} = useSelector((state) => state[AUTH], shallowEqual);

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
