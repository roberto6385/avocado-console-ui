import React from 'react';
import TabNavBar from './TabNavBar';
import WorkSpace from './WorkSpace';
import {useSelector} from 'react-redux';
import {OutlineCol} from '../styles/common';
import Footer from './Footer';
import * as PropTypes from 'prop-types';
import MainPage from './MainPage';

const RightContainer = ({setShowAddServerForm}) => {
	const {tab, current_tab, minimize} = useSelector((state) => state.common);

	return (
		<OutlineCol flex={1} className={'fix-height'}>
			<TabNavBar />
			{tab.length !== 0 ? (
				<WorkSpace />
			) : (
				<MainPage setShowAddServerForm={setShowAddServerForm} />
			)}
			{current_tab && <Footer />}
		</OutlineCol>
	);
};

RightContainer.propTypes = {
	setShowAddServerForm: PropTypes.func.isRequired,
};

export default RightContainer;
