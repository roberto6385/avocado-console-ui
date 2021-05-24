import React from 'react';
import {useSelector} from 'react-redux';

import IdentitiesContainer from '../components/Setting/IdentitiesContainer';
import SettingAppLayout from '../components/Setting/SettingLayout';

const Identities = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<SettingAppLayout>
			<IdentitiesContainer />
		</SettingAppLayout>
	);
};

export default Identities;
