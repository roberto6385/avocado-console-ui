import React, {useEffect} from 'react';

import LeftContainer from '../components/LeftContainer';
import RightContainer from '../components/RightContainer';
import {useSelector} from 'react-redux';
import {RowBox} from '../styles/divs';

const Main = () => {
	const {userTicket} = useSelector((state) => state.userTicket);

	// useEffect(() => {
	// 	if (!userTicket) return <Redirect to='/login' />;
	// }, [userTicket]);

	return (
		<RowBox height={'100vh'}>
			<LeftContainer />
			<RightContainer />
		</RowBox>
	);
};

export default Main;
