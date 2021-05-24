import React from 'react';
import {useSelector} from 'react-redux';

import Footer from '../components/Footer';
import styled from 'styled-components';
import SettingMain from '../components/Setting/SettingMain';
import SettingHeader from '../components/Setting/SettingHeader';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	font-family: 'Roboto', sans-serif;
`;

const Account = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<_Container>
			<SettingHeader />
			<SettingMain />
			<Footer />
		</_Container>
	);
};

export default Account;
