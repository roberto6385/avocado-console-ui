import React from 'react';
import TabNavBar from './TabNavBar';
import WorkSpace from './WorkSpace';
import {useSelector} from 'react-redux';
import {OutlineCol} from '../styles/common';
import Footer from './Footer';
import {PropTypes} from 'prop-types';
import MainPage from './MainPage';

const RightContainer = ({setShowAddServerForm}) => {
	const {tab, current_tab} = useSelector((state) => state.common);

	return (
		<OutlineCol className={'fix-height'} xs={10}>
			<TabNavBar />
			{tab.length !== 0 ? (
				<WorkSpace />
			) : (
				<MainPage setShowAddServerForm={setShowAddServerForm} />
			)}
			{current_tab !== null && <Footer />}
		</OutlineCol>
	);
};

RightContainer.propTypes = {
	setShowAddServerForm: PropTypes.func.isRequired,
};

export default RightContainer;
