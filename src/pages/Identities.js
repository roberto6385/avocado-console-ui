import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import LeftSetting from '../components/Setting/LeftSetting';
import IdentitiesContainer from '../components/Setting/IdentitiesContainer';
import {RowBox} from '../styles/divs';

const Identities = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<RowBox height={'100vh'}>
			<LeftSetting />
			<IdentitiesContainer />
		</RowBox>
	);
};

export default Identities;
