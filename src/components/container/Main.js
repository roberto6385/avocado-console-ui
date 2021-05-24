import React from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import WorkSpace from './WorkSpace';
import {useSelector} from 'react-redux';
import MainPage from '../MainPage';

const _Container = styled.div`
	display: flex;
	overflow: hidden;
	flex: 1;
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
