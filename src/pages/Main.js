import React from 'react';

import LeftContainer from '../components/LeftContainer';
import RightContainer from '../components/RightContainer';
import {MainContainer, MainRow} from '../styles/page';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

const Main = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// if (!userTicket) return <Redirect to='/login' />;

	return (
		<MainContainer fluid>
			<MainRow className={'fix-height'}>
				<LeftContainer />
				<RightContainer />
			</MainRow>
		</MainContainer>
	);
};

export default Main;
