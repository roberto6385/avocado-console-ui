import React, {useState} from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import WorkSpace from './WorkSpace';
import {useSelector} from 'react-redux';
import MainPage from './MainPage';
import SnippetsManeger from './SSH/SnippetsManager';

const _Container = styled.div`
	display: flex;
	overflow: hidden;
	flex: 1;
`;

const Main = () => {
	const {tab} = useSelector((state) => state.common);
	// const [open, setOpen] = useState(true);
	return (
		<_Container>
			<Nav />
			{tab.length ? <WorkSpace /> : <MainPage />}
			{/*<SnippetsManeger setOpen={setOpen} open={open} />*/}
		</_Container>
	);
};

export default Main;
