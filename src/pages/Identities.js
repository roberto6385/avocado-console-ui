import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import LeftSetting from '../components/Setting/LeftSetting';
import IdentitiesContainer from '../components/Setting/IdentitiesContainer';
import {RowBox} from '../styles/divs';
import SettingHeader from '../components/Setting/SettingHeader';
import SettingNav from '../components/Setting/SettingNav';
import AccountSetting from '../components/Setting/AccountSetting';
import Footer from '../components/Footer';
import styled from 'styled-components';
import {Redirect, useHistory} from 'react-router-dom';
import IdentitiesSetting from '../components/Setting/IdentitiesSetting';

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

const Identities = () => {
	const {userTicket} = useSelector((state) => state.userTicket);
	const history = useHistory();

	useEffect(() => {
		// if (!userTicket) return <Redirect to='/login' />;
		if (!userTicket) {
			history.push('/login');
		}
	}, [userTicket]);

	return (
		<_Container>
			<SettingHeader />
			<_ContentsContainer>
				<SettingNav />
				<IdentitiesSetting />
			</_ContentsContainer>
			<Footer />
		</_Container>
	);
};

export default Identities;
