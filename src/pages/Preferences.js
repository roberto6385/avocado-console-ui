import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {MainContainer, MainRow} from '../styles/page';
import LeftSetting from '../components/Setting/LeftSetting';
import PreferencesContainer from '../components/Setting/PreferencesContainer';

const Preferences = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<MainContainer fluid>
			<MainRow className={'fix-height'}>
				<LeftSetting />
				<PreferencesContainer />
			</MainRow>
		</MainContainer>
	);
};

export default Preferences;
