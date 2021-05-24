import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import LeftSetting from '../components/Setting/LeftSetting';
import PreferencesContainer from '../components/Setting/PreferencesContainer';
import {RowBox} from '../styles/divs';
import styled from 'styled-components';
import SettingHeader from '../components/Setting/SettingHeader';
import SettingNav from '../components/Setting/SettingNav';
import AccountSetting from '../components/Setting/AccountSetting';
import Footer from '../components/Footer';

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

const Preferences = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<_Container>
			<SettingHeader />
			<_ContentsContainer>
				<SettingNav />
				<PreferencesContainer />
			</_ContentsContainer>
			<Footer />
		</_Container>
	);
};

export default Preferences;
