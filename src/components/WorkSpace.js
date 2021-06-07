import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

import Nav from './Nav';
import MainPage from './MainPage';
import {
	backColor,
	EIGHTEEN,
	fontColor,
	GREEN_COLOR,
	IconButton,
	iconColor,
	IconContainer,
	MAIN_HEIGHT,
	sideColor,
	Span,
	TAB_WIDTH,
} from '../styles/global';
import {closeIconSmall, sftpIconSmall, sshIcon} from '../icons/icons';
import RightCornerIcons from './RightCornerIcons';
import PanesContainer from './PanesContainer';
import AsideContainer from './Setting/AsideContainer';
import {CHANGE_VISIBLE_TAB, SORT_TAB} from '../reducers/common';
import {SSH_SEND_DISCONNECTION_REQUEST} from '../reducers/ssh';
import {disconnectAction} from '../reducers/sftp';

const _Container = styled.div`
	display: flex;
	overflow: hidden;
	flex: 1;
	height: 100%;
	width: 100%;
	position: relative;

	.mainContainer {
		margin-left: 256px;
		transition: all 0.5s ease-in-out;
	}
	.mainContainer.close {
		margin: 0;
	}

	.nav {
		position: absolute;
		left: 0px;
		display: inline-block;
		transition: all 0.5s ease-in-out;
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

const _Nav = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: ${(props) => props?.back};
`;

const _TabItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	height: 100%;
	background: ${(props) => props?.back};
	color: ${(props) => props.color};
	width: ${TAB_WIDTH};
	border-top: 2px solid;
	border-color: ${(props) => props.bColor};
	font-weight: bold;
`;

const _Tab = styled.div`
	display: flex;
	flex-warp: nowrap;
	align-items: center;
	justify-content: space-between;
	background: ${(props) => props?.back};
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
		transition: all 0.5s ease-in-out;
	}

	.work.close {
		margin: 0;
	}

	.aside {
		position: absolute;
		right: 0px;
		display: inline-block;
		transition: all 0.5s ease-in-out;
	}
	.aside.close {
		transform: translateX(300px);
	}
`;

const _WorkSpaceContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	background: ${(props) => props?.back};
	overflow: hidden;
	position: relative;
`;

const _TabsContianer = styled.div`
	display: flex;
	overflow: scroll;
	max-width: calc(100% - 152px);
	height: ${MAIN_HEIGHT};
`;

const WorkSpace = () => {
	const dispatch = useDispatch();
	const {tab, current_tab, theme} = useSelector((state) => state.common);
	const {ssh} = useSelector((state) => state.ssh);
	const {sftp} = useSelector((state) => state.sftp);
	const [oldOlder, setOldOlder] = useState(0);
	const [draggedItem, setDraggedItem] = useState({});
	const [asideToggle, setAsideToggle] = useState(false);
	const [navToggle, setNavToggle] = useState(true);

	const changeVisibleTab = useCallback(
		(uuid) => () => {
			dispatch({type: CHANGE_VISIBLE_TAB, data: uuid});
		},
		[],
	);

	const onClickDelete = useCallback(
		(data) => () => {
			if (data.type === 'SSH') {
				dispatch({
					type: SSH_SEND_DISCONNECTION_REQUEST,
					data: {
						uuid: data.uuid,
						ws: ssh.find((v) => v.uuid === data.uuid).ws,
					},
				});
			} else if (data.type === 'SFTP') {
				dispatch(
					disconnectAction({
						uuid: data.uuid,
						socket: sftp.find((v) => v.uuid === data.uuid).socket,
					}),
				);
			}
		},
		[dispatch, ssh, sftp],
	);

	const prevPutItem = useCallback(
		(item) => () => {
			setOldOlder(tab.findIndex((it) => it === item));
			setDraggedItem(item);
		},
		[tab],
	);
	const nextPutItem = useCallback(
		(item) => (e) => {
			e.preventDefault();
			if (item === undefined) return;
			const newOlder = tab.findIndex((it) => it === item);

			dispatch({
				type: SORT_TAB,
				data: {
					oldOrder: oldOlder,
					newOrder: newOlder,
					newTab: draggedItem,
				},
			});
		},
		[tab, oldOlder, draggedItem, dispatch],
	);

	return (
		<_Container>
			<Nav toggle={navToggle} setToggle={setNavToggle} />
			<_MainContainer
				className={navToggle ? 'mainContainer' : 'mainContainer close'}
			>
				<_Nav
					back={
						tab.length !== 0 ? backColor[theme] : sideColor[theme]
					}
				>
					<_TabsContianer>
						{tab.map((data) => {
							return (
								<_Tab
									key={data.uuid}
									onDragOver={(e) => e.preventDefault()}
									onDrop={nextPutItem(data)}
								>
									<_TabItem
										draggable='true'
										onDragStart={prevPutItem(data)}
										onClick={changeVisibleTab(data.uuid)}
										back={
											current_tab === data.uuid
												? sideColor[theme]
												: backColor[theme]
										}
										color={
											current_tab === data.uuid
												? GREEN_COLOR
												: fontColor[theme]
										}
										bColor={
											current_tab === data.uuid
												? GREEN_COLOR
												: sideColor[theme]
										}
									>
										<IconContainer padding={'6px'}>
											{data.type === 'SSH' &&
												sshIcon(
													current_tab === data.uuid
														? GREEN_COLOR
														: fontColor[theme],
												)}
											{data.type === 'SFTP' &&
												sftpIconSmall}
										</IconContainer>
										<Span flex={1} padding={'0px'}>
											{data.server.name}
										</Span>
										<IconButton
											size={EIGHTEEN}
											onClick={onClickDelete(data)}
											color={iconColor[theme]}
										>
											{closeIconSmall}
										</IconButton>
									</_TabItem>
								</_Tab>
							);
						})}
					</_TabsContianer>
					<RightCornerIcons
						toggle={asideToggle}
						setToggle={setAsideToggle}
					/>
				</_Nav>
				<_MainSpace>
					<_WorkSpaceContainer
						className={asideToggle ? 'work' : 'work close'}
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
