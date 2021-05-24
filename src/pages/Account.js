import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Main from '../components/container/Main';
import Footer from '../components/container/Footer';
import styled from 'styled-components';
import SettingMain from '../components/container/SettingMain';
import SettingHeader from '../components/container/SettingHeader';

const Container = styled.div`
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
		<Container>
			<SettingHeader />
			<SettingMain />
			<Footer />
		</Container>
	);
};

export default Account;
