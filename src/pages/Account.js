import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import LeftSetting from '../components/Setting/LeftSetting';
import AccountContainer from '../components/Setting/AccountContainer';
import {RowBox} from '../styles/divs';

const Account = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<RowBox height={'100vh'}>
			<LeftSetting />
			<AccountContainer />
		</RowBox>
	);
};

export default Account;
