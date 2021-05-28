import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

import Nav from './Nav';
import WorkSpace from './WorkSpace';
import MainPage from './MainPage';
import AlertPopup from './Popup/AlertPopup';

const _Container = styled.div`
	display: flex;
	overflow: hidden;
	flex: 1;
	height: 100%;
	width: 100%;
`;

const Main = () => {
	const {tab} = useSelector((state) => state.common);

	return (
		<_Container>
			<Nav />
			{tab.length ? <WorkSpace /> : <MainPage />}
		</_Container>
	);
};

export default Main;
