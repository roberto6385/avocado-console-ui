import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {MainContainer, MainRow} from '../styles/page';
import RightSetting from '../components/Setting/RightSetting';
import LeftSetting from '../components/Setting/LeftSetting';

const Setting = () => {
	const {me} = useSelector((state) => state.user);

	if (!me) return <Redirect to='/login' />;

	return (
		<MainContainer fluid>
			<MainRow className={'fix-height'}>
				<LeftSetting />
				<RightSetting />
			</MainRow>
		</MainContainer>
	);
};

export default Setting;