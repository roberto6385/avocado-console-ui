import * as React from 'react';

// import {Tab, Tabs} from '@blueprintjs/core';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SSH_SFTP from './SSH_SFTP';
import styled, {keyframes} from 'styled-components';
import RightCornerIcons from '../RightCornerIcons';
import {
	GREEN_COLOR,
	Avocado_span,
	IconButton,
	EIGHTEEN,
	ICON_DARK_COLOR,
	LIGHT_BACK_COLOR,
	LIGHT_MODE_BACK_COLOR,
	MAIN_HEIGHT,
	RIGHT_SIDE_WIDTH,
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
import WorkSpaceTabPanels from '../WorkSpaceTabPanels';
import SideMenuContainer from './SideMenuContainer';

const WorkSpace_Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
`;

const WorkSpace_Nav = styled(Nav)`
	display: flex;
	align-items: center;
	background: ${LIGHT_BACK_COLOR};
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

const slide = keyframes`
  0% {
    opacity: 0;
	transform: translateX(300px);
	visibility: hidden;
	width:0px;
  }
  100% {
    opacity: 1;
	transform: translateX(0px);
	visibility: visible;
	width: ${RIGHT_SIDE_WIDTH};
  }
`;

const Main_Container = styled.div`
	display: flex;
	flex: 1;
	position: relative;
	#right_side_menu {
		width: 0px;
		max-width: ${RIGHT_SIDE_WIDTH};
		display: none;
	}
	#right_side_menu.active {
		display: block;
		width: ${RIGHT_SIDE_WIDTH};
	}
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
			<WorkSpace_Nav>
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
									current_tab === data.uuid
										? LIGHT_MODE_BACK_COLOR
										: LIGHT_BACK_COLOR
								}
								color={
									current_tab === data.uuid
										? GREEN_COLOR
										: 'black'
								}
								border={
									current_tab === data.uuid
										? `2px solid ${GREEN_COLOR}`
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
								<IconButton
									size={EIGHTEEN}
									onClick={onClickDelete(data)}
									color={ICON_DARK_COLOR}
								>
									<IoCloseOutline />
								</IconButton>
							</TabItem>
						</TabNavbar>
					);
				})}
				<RightCornerIcons />
			</WorkSpace_Nav>
			<Main_Container>
				<WorkSpaceTabPanels />
				<SideMenuContainer />
			</Main_Container>
		</WorkSpace_Container>
	);
};

export default WorkSpace;
