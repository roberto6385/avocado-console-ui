import React, {useEffect} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import SettingAppLayout from '../components/Setting/SettingLayout';
import PreferencesSpace from '../components/Setting/Space/PreferencesSpace';
import {AUTH} from '../reducers/api/auth';

const Preferences = () => {
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
			<PreferencesSpace />
		</SettingAppLayout>
	);
};

export default Preferences;
