import React from 'react';
import TabNavBar from './TabNavBar';
import WorkSpace from './WorkSpace';
import {useSelector} from 'react-redux';
import {OutlineCol} from '../styles/common';
import Footer from './Footer';

const RightContainer = () => {
	const {current_tab} = useSelector((state) => state.common);

	return (
		<OutlineCol className={'fix-height'} xs={10}>
			<TabNavBar />
			<WorkSpace />
			{current_tab !== null && <Footer />}
		</OutlineCol>
	);
};

export default RightContainer;
