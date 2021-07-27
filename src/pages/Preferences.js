import React, {useEffect} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import SettingAppLayout from '../components/Setting/SettingLayout';
import PreferencesSpace from '../components/Setting/Space/PreferencesSpace';

const Preferences = () => {
	const history = useHistory();

	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);

	useEffect(() => {
		if (!userTicket) {
			history.push('/signin');
			location.reload();
		}
	}, [history, userTicket]);

	return (
		<SettingAppLayout>
			<PreferencesSpace />
		</SettingAppLayout>
	);
};

export default Preferences;
