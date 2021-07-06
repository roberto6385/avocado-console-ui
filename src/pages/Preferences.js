import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import SettingAppLayout from '../components/Setting/SettingLayout';
import PreferencesSpace from '../components/Setting/Space/PreferencesSpace';

const Preferences = () => {
	const userTicket = useSelector((state) => state.userTicket.userTicket);
	const history = useHistory();

	useEffect(() => {
		if (!userTicket) {
			history.push('/signin');
		}
	}, [userTicket]);

	return (
		<SettingAppLayout>
			<PreferencesSpace />
		</SettingAppLayout>
	);
};

export default Preferences;
