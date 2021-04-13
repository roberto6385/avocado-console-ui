import React from 'react';
import TabNavBar from './TabNavBar';
import WorkSpace from './WorkSpace';
import {useSelector} from 'react-redux';
import {OutlineCol} from '../styles/common';
import Footer from './Footer';
import MainPage from './MainPage';

const RightContainer = () => {
	const {tab, current_tab} = useSelector((state) => state.common);

	return (
		<OutlineCol flex={1} className={'fix-height'}>
			<TabNavBar />
			{tab.length !== 0 ? <WorkSpace /> : <MainPage />}
			{current_tab !== null && <Footer />}
		</OutlineCol>
	);
};

export default RightContainer;
