import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import IdentitiesContainer from '../components/Setting/IdentitiesContainer';
import SettingAppLayout from '../components/Setting/SettingLayout';

import {useHistory} from 'react-router-dom';

const Identities = () => {
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
			<IdentitiesContainer />
		</SettingAppLayout>
	);
};

export default Identities;
