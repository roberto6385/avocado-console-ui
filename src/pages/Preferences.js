import React from 'react';
import {useSelector} from 'react-redux';

import PreferencesContainer from '../components/Setting/PreferencesContainer';
import SettingAppLayout from '../components/Setting/SettingLayout';

const Preferences = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<SettingAppLayout>
			<PreferencesContainer />
		</SettingAppLayout>
	);
};

export default Preferences;
