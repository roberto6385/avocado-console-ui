import React, {useState} from 'react';
import styled from 'styled-components';
import {shallowEqual, useSelector} from 'react-redux';

import MainPage from './MainPage';
import PanesContainer from './Panels/PanesContainer';
import AsideContainer from './Setting/AsideContainer';

import {mainBackColor} from '../styles/color';

import TabBar from './Tab/TabBar';
import NavBar from './Nav/NavBar';

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
`;

const _MainSpace = styled.div`
	display: flex;
	flex: 1;
	height: 100%;
	width: 100%;
	overflow: hidden;
	position: relative;
	background: ${(props) => mainBackColor[props.theme_value]};
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
	const {tab, theme} = useSelector((state) => state.common, shallowEqual);
	const {loading: sshLoading} = useSelector(
		(state) => state.ssh,
		shallowEqual,
	);
	const {loading: sftpLoading} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);

	const [asideToggle, setAsideToggle] = useState(false);
	const [navToggle, setNavToggle] = useState(true);

	// useEffect(() => {
	// 	toast.success('happy', {autoClose: 4000});
	// });

	console.log(asideToggle);

	return (
		<_Container>
			<NavBar toggle={navToggle} setToggle={setNavToggle} />
			<_MainContainer
				className={navToggle ? 'mainContainer' : 'mainContainer close'}
			>
				<TabBar toggle={asideToggle} setToggle={setAsideToggle} />
				<_MainSpace theme_value={theme}>
					<_WorkSpaceContainer
						className={asideToggle ? 'work' : 'work close'}
						opacity={sshLoading || sftpLoading ? 0.7 : undefined}
					>
						{tab.length !== 0 ? <PanesContainer /> : <MainPage />}
					</_WorkSpaceContainer>
					<AsideContainer
						toggle={asideToggle}
						setToggle={setAsideToggle}
					/>
				</_MainSpace>
			</_MainContainer>
		</_Container>
	);
};

export default WorkSpace;
