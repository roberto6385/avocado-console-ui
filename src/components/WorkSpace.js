import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import Nav from './Nav';
import MainPage from './MainPage';
import {closeIcon, sftpIcon, sshIcon} from '../icons/icons';
import RightCornerIcons from './RightCornerIcons';
import PanesContainer from './PanesContainer';
import AsideContainer from './Setting/AsideContainer';
import {CHANGE_VISIBLE_TAB, SORT_TAB} from '../reducers/common';
import {SSH_SEND_DISCONNECTION_REQUEST} from '../reducers/ssh';
import {
	activeColor,
	fontColor,
	mainBackColor,
	tabbarColor,
	tabColor,
} from '../styles/color';
import {ClickableIconButton, IconBox} from '../styles/button';
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

const _Nav = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: ${(props) => tabbarColor[props.theme_value]};
`;

const _TabItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	height: 100%;
	font-weight: bold;
	background: ${(props) =>
		props.clicked
			? tabColor[props.theme_value]
			: tabbarColor[props.theme_value]};
	color: ${(props) =>
		props.clicked
			? activeColor[props.theme_value]
			: fontColor[props.theme_value]};
	width: 160px;
	border-top: 2px solid;
	border-color: ${(props) =>
		props.clicked
			? activeColor[props.theme_value]
			: tabbarColor[props.theme_value]};
`;

const _Tab = styled.div`
	display: flex;
	flex-warp: nowrap;
	align-items: center;
	justify-content: space-between;
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

const _TabsContianer = styled.div`
	display: flex;
	overflow: auto;
	max-width: calc(100% - 152px);
	height: 54px;
`;

const _ServerName = styled.div`
	flex: 1;
	overflow: hidden;
`;

const WorkSpace = () => {
	const dispatch = useDispatch();
	const {tab, current_tab, theme} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {ssh, loading: sshLoading} = useSelector(
		(state) => state.ssh,
		shallowEqual,
	);
	const {sftp, loading: sftpLoading} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);
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
		(data) => (e) => {
			e.stopPropagation();
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
						socket: sftp.find((v) => v.uuid === data.uuid)?.socket,
					}),
				);
			}
		},
		[ssh, sftp],
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
		[tab, oldOlder, draggedItem],
	);

	return (
		<_Container>
			<Nav toggle={navToggle} setToggle={setNavToggle} />
			<_MainContainer
				className={navToggle ? 'mainContainer' : 'mainContainer close'}
			>
				<_Nav theme_value={theme}>
					<_TabsContianer>
						{tab.map((data) => {
							return (
								<_Tab
									key={data.uuid}
									onDragOver={(e) => e.preventDefault()}
									onDrop={nextPutItem(data)}
									onClick={changeVisibleTab(data.uuid)}
								>
									<_TabItem
										draggable='true'
										onDragStart={prevPutItem(data)}
										clicked={
											current_tab === data.uuid ? 1 : 0
										}
										theme_value={theme}
									>
										<IconBox
											margin_right={'6px'}
											size={'xs'}
											color={
												current_tab === data.uuid
													? activeColor[theme]
													: fontColor[theme]
											}
										>
											{data.type === 'SSH' && sshIcon}
											{data.type === 'SFTP' && sftpIcon}
										</IconBox>
										<_ServerName
											onClick={changeVisibleTab(
												data.uuid,
											)}
										>
											{data.server.name}
										</_ServerName>
										<ClickableIconButton
											size={'xs'}
											margin={'0px 0px 0px 6px'}
											theme_value={theme}
											onClick={onClickDelete(data)}
										>
											{closeIcon}
										</ClickableIconButton>
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
