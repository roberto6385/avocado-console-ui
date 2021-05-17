import * as React from 'react';

// import {Tab, Tabs} from '@blueprintjs/core';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SSH_SFTP from './SSH_SFTP';
import styled from 'styled-components';
import RightCornerIcons from '../RightCornerIcons';
import {
	AVOCADO_COLOR,
	Avocado_span,
	Button,
	EIGHTEEN,
	ICON_DARK_COLOR,
	LIGHT_BACK_COLOR,
	LIGHT_MODE_BACK_COLOR,
	MAIN_HEIGHT,
	TAB_WIDTH,
} from '../../styles/global_design';
import {
	IoCloseOutline,
	RiArrowUpDownLine,
	RiTerminalFill,
} from 'react-icons/all';
import {SSHT_SEND_DISCONNECTION_REQUEST} from '../../reducers/ssht';
import {disconnectAction} from '../../reducers/sftp';
import {CHANGE_VISIBLE_TAB, SORT_TAB} from '../../reducers/common';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {Nav} from 'react-bootstrap';
import WorkSpace_TabPanels from '../WorkSpace_TabPanels';

const WorkSpace_Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
`;

const SSHT_SFTP_Container = styled.div`
	flex: 1;
`;

const TabItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	background: ${(props) => props?.back};
	color: ${(props) => props.color};
	width: ${TAB_WIDTH};
	border-top: ${(props) => props?.border};
	font-weight: bold;
`;

const TabNavbar = styled.div`
	display: flex;
	flex-warp: nowrap;
	align-items: center;
	justify-content: space-between;
`;

const WorkSpace = () => {
	const dispatch = useDispatch();
	const {tab, current_tab} = useSelector((state) => state.common);
	const visibleTab = tab.filter((v) => v.display === true);
	const {ssht} = useSelector((state) => state.ssht);
	const {sftp} = useSelector((state) => state.sftp);
	const [oldOlder, setOldOlder] = useState(0);
	const [draggedItem, setDraggedItem] = useState({});

	const changeVisibleTab = useCallback(
		(uuid) => () => {
			dispatch({type: CHANGE_VISIBLE_TAB, data: uuid});
		},
		[],
	);

	const onClickDelete = useCallback(
		(data) => () => {
			if (data.type === 'SSHT') {
				dispatch({
					type: SSHT_SEND_DISCONNECTION_REQUEST,
					data: {
						uuid: data.uuid,
						ws: ssht.find((v) => v.uuid === data.uuid).ws,
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
		[dispatch, ssht, sftp],
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
			console.log(oldOlder);
			console.log(newOlder);
			console.log(draggedItem);

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
		<WorkSpace_Container>
			<Nav>
				{tab.map((data) => {
					return (
						<TabNavbar
							key={data.uuid}
							onDragOver={(e) => e.preventDefault()}
							onDrop={nextPutItem(data)}
						>
							<TabItem
								draggable='true'
								onDragStart={prevPutItem(data)}
								onClick={changeVisibleTab(data.uuid)}
								back={
									current_tab === data.uuid &&
									LIGHT_MODE_BACK_COLOR
								}
								color={
									current_tab === data.uuid
										? AVOCADO_COLOR
										: 'black'
								}
								border={
									current_tab === data.uuid
										? `2px solid ${AVOCADO_COLOR}`
										: undefined
								}
							>
								<Avocado_span size={EIGHTEEN}>
									{data.type === 'SSHT' ? (
										<RiTerminalFill />
									) : (
										<RiArrowUpDownLine />
									)}
								</Avocado_span>
								<Avocado_span flex={1} padding={'0px'}>
									{data.server.name}
								</Avocado_span>
								<Button
									size={EIGHTEEN}
									onClick={onClickDelete(data)}
									color={ICON_DARK_COLOR}
								>
									<IoCloseOutline />
								</Button>
							</TabItem>
						</TabNavbar>
					);
				})}
				{/*tab 수 만큼 TabPanel 있어야 함. display:none;*/}
				{/*<WorkSpace_TabPanels />*/}
				<RightCornerIcons />
			</Nav>
			<WorkSpace_TabPanels />
			{/*<SSHT_SFTP_Container>*/}
			{/*	{tab.map((data) => {*/}
			{/*		return (*/}
			{/*			<SSH_SFTP*/}
			{/*				key={data.uuid}*/}
			{/*				uuid={data.uuid}*/}
			{/*				type={data.type}*/}
			{/*				server={data.server}*/}
			{/*			/>*/}
			{/*		);*/}
			{/*	})}*/}
			{/*</SSHT_SFTP_Container>*/}
		</WorkSpace_Container>
	);
};

export default WorkSpace;
