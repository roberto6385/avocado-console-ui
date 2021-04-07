import React from 'react';

import AddServerForm from '../components/AddServerForm/AddServerForm';
import LeftContainer from '../components/LeftContainer';
import RightContainer from '../components/RightContainer';
import {MainContainer, MainRow} from '../styles/page';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

const Main = () => {
	const {me} = useSelector((state) => state.common);

	if (!me) return <Redirect to='/login' />;

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
