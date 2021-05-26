import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import PreferencesContainer from '../components/Setting/PreferencesContainer';
import SettingAppLayout from '../components/Setting/SettingLayout';

const Preferences = () => {
	const {userTicket} = useSelector((state) => state.userTicket);
	const history = useHistory();

	useEffect(() => {
		// if (!userTicket) return <Redirect to='/login' />;
		if (!userTicket) {
			history.push('/login');
		}
	}, [userTicket]);

	return (
		<SettingAppLayout>
			<PreferencesContainer />
		</SettingAppLayout>
	);
};

export default Preferences;
