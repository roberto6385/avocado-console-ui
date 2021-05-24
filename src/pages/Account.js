import React from 'react';
import {useSelector} from 'react-redux';

import Footer from '../components/Footer';
import styled from 'styled-components';
import SettingMain from '../components/Setting/SettingMain';
import SettingHeader from '../components/Setting/SettingHeader';
import SettingNav from '../components/Setting/SettingNav';
import AccountSetting from '../components/Setting/AccountSetting';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	font-family: 'Roboto', sans-serif;
`;

const _ContentsContainer = styled.div`
	display: flex;
	overflow: hidden;
	flex: 1;
`;

const Account = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<_Container>
			<SettingHeader />
			<_ContentsContainer>
				<SettingNav />
				<AccountSetting />
			</_ContentsContainer>
			<Footer />
		</_Container>
	);
};

export default Account;
