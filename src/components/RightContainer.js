import React from 'react';
import TabNavBar from './TabNavBar';
import WorkSpace from './WorkSpace';
import {useSelector} from 'react-redux';
import Footer from './Footer';
import MainPage from './MainPage';
import {ColBox} from '../styles/divs';

const RightContainer = () => {
	const {tab, current_tab} = useSelector((state) => state.common);

	return (
		<ColBox flex={1}>
			<TabNavBar />
			{tab.length ? <WorkSpace /> : <MainPage />}
			{current_tab !== null && <Footer />}
		</ColBox>
	);
};

export default RightContainer;
