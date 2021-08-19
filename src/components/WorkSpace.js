import React, {useState} from 'react';
import styled from 'styled-components';
import {shallowEqual, useSelector} from 'react-redux';

import MainPage from './MainPage';
import PanesContainer from './Panels/PanesContainer';
import AsideContainer from './Setting/AsideContainer';
import TabBar from './Tab/TabBar';
import NavBar from './Nav/NavBar';
import {tabBarSelector} from '../reducers/tabBar';
import {sshSelector} from '../reducers/ssh';

const _Container = styled.div`
	display: flex;
	overflow: hidden;
	flex: 1;
	height: 100%;
	width: 100%;
	position: relative;

	.mainContainer {
		margin-left: 256px;
		transition: margin 0.5s ease-in-out;
	}
	.mainContainer.close {
		margin: 0;
	}

	.nav {
		position: absolute;
		left: 0px;
		display: inline-block;
		transition: transform 0.5s ease-in-out;
		z-index: 1;
	}
	.nav.close {
		transform: translateX(-256px);
		z-index: 5;
	}
`;

const _MainContainer = styled.div`
	display: flex;
	overflow: hidden;
	width: 100%;
	flex-direction: column;
	background: ${(props) =>
		props.theme.pages.webTerminal.main.backgroundColor};
`;

const _MainSpace = styled.div`
	display: flex;
	flex: 1;
	height: 100%;
	width: 100%;
	overflow: hidden;
	position: relative;

	.work {
		margin-right: 300px;
		transition: margin 0.5s ease-in-out;
	}
	.work.close {
		margin: 0;
	}
	.aside {
		position: absolute;
		right: 0px;
		display: inline-block;
		transition: transform 0.5s ease-in-out;
	}
	.aside.close {
		transform: translateX(300px);
	}
`;

const _WorkSpaceContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	overflow: hidden;
	position: relative;
	opacity: ${(props) => props?.opacity || 1};
`;

const WorkSpace = () => {
	const {terminalTabs} = useSelector(tabBarSelector.all);
	const {loading: sshLoading} = useSelector(sshSelector.all);
	const {loading: sftpLoading} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);

	const [isNavOpened, setIsNavOpened] = useState(true);
	const [isAsideOpened, setIsAsideOpened] = useState(false);

	return (
		<_Container>
			<NavBar isOpened={isNavOpened} setIsOpened={setIsNavOpened} />
			<_MainContainer
				className={
					isNavOpened ? 'mainContainer' : 'mainContainer close'
				}
			>
				<TabBar
					isOpned={isAsideOpened}
					setisOpened={setIsAsideOpened}
				/>
				<_MainSpace>
					<_WorkSpaceContainer
						className={isAsideOpened ? 'work' : 'work close'}
						opacity={sshLoading || sftpLoading ? 0.7 : undefined}
					>
						{terminalTabs.length !== 0 ? (
							<PanesContainer />
						) : (
							<MainPage />
						)}
					</_WorkSpaceContainer>
					<AsideContainer
						isOpened={isAsideOpened}
						setIsOpened={setIsAsideOpened}
					/>
				</_MainSpace>
			</_MainContainer>
		</_Container>
	);
};

export default WorkSpace;
