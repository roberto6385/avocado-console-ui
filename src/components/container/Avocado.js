import React from 'react';
import styled from 'styled-components';
import Aside from './Aside';
import WorkSpace from './WorkSpace';
import {useSelector} from 'react-redux';
import MainPage from '../MainPage';
import SideMenuContainer from '../RightSide/SideMenuContainer';

const Container = styled.div`
	display: flex;
	overflow: hidden;
	flex: 1;
`;

const Avocado_Main = () => {
	const {tab} = useSelector((state) => state.common);

	return (
		<Container>
			<Aside />
			{tab.length ? <WorkSpace /> : <MainPage />}
		</Container>
	);
};

export default Avocado_Main;