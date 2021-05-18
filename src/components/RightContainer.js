import React from 'react';
import TabNavBar from './TabNavBar';
import WorkSpace from './container/WorkSpace';
import {useSelector} from 'react-redux';
import Footer from './Footer';
import MainPage from './MainPage';
import {ColBox, RowBox} from '../styles/divs';
import SideMenuContainer from './RightSide/SideMenuContainer';

const RightContainer = () => {
	const {tab, current_tab} = useSelector((state) => state.common);

	return (
		<ColBox flex={1}>
			<TabNavBar />
			<RowBox position={'relative'} flex={1} height={'100px'}>
				{tab.length ? <WorkSpace /> : <MainPage />}
				{/*<SideMenuContainer />*/}
			</RowBox>
			{current_tab !== null && <Footer />}
		</ColBox>
	);
};

export default RightContainer;
