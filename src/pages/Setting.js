import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {MainContainer, MainRow} from '../styles/page';
import RightSetting from '../components/Setting/RightSetting';
import LeftSetting from '../components/Setting/LeftSetting';

const Setting = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<MainContainer fluid>
			<MainRow className={'fix-height'}>
				<LeftSetting />
				<RightSetting />
			</MainRow>
		</MainContainer>
	);
};

export default Setting;
