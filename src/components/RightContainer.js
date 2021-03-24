import React from 'react';
import TabNavBar from './TabNavBar';
import WorkSpace from './WorkSpace';
import {useSelector} from 'react-redux';
import {BotttomBar, RC_Col} from '../styles/common';

const RightContainer = () => {
	const {current_tab} = useSelector((state) => state.common);

	return (
		<RC_Col className={'fix-height'} xs={10}>
			<TabNavBar />
			<WorkSpace />
			{current_tab !== null && <BotttomBar />}
		</RC_Col>
	);
};

export default RightContainer;
