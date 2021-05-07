import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import LeftSetting from '../components/Setting/LeftSetting';
import PreferencesContainer from '../components/Setting/PreferencesContainer';
import {RowBox} from '../styles/divs';

const Preferences = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<RowBox height={'100vh'}>
			<LeftSetting />
			<PreferencesContainer />
		</RowBox>
	);
};

export default Preferences;
