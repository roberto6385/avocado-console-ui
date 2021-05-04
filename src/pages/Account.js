import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {MainContainer, MainRow} from '../styles/page';
import LeftSetting from '../components/Setting/LeftSetting';
import AccountContainer from '../components/Setting/AccountContainer';

const Account = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<MainContainer fluid>
			<MainRow className={'fix-height'}>
				<LeftSetting />
				<AccountContainer />
			</MainRow>
		</MainContainer>
	);
};

export default Account;
