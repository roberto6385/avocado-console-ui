import React from 'react';
import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import RightCornerIcons from './RightCornerIcons';
import {
	GREEN_COLOR,
	Span,
	IconButton,
	EIGHTEEN,
	ICON_DARK_COLOR,
	LIGHT_BACK_COLOR,
	LIGHT_MODE_SIDE_COLOR,
	MAIN_HEIGHT,
	RIGHT_SIDE_WIDTH,
	TAB_WIDTH,
	sideColor,
	backColor,
	fontColor,
	iconColor,
	IconContainer,
} from '../styles/global';
import {RiTerminalFill} from 'react-icons/all';
import {SSH_SEND_DISCONNECTION_REQUEST} from '../reducers/ssh';
import {disconnectAction} from '../reducers/sftp';
import {CHANGE_VISIBLE_TAB, SORT_TAB} from '../reducers/common';
import PanesContainer from './PanesContainer';
import AsideContainer from './Setting/AsideContainer';
import {closeIconSmall, sftpIconSmall} from '../icons/icons';

const _Container = styled.div`
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

const _WorkSpaceContainer = styled.div`
	display: flex;
	flex: 1;
	height: 100%;
	width: 100%;
	overflow: hidden;
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

const _TabsContianer = styled.div`
	display: flex;
	overflow: scroll;
	max-width: calc(100% - 152px);
	height: ${MAIN_HEIGHT};
`;

const WorkSpace = () => {
	const dispatch = useDispatch();
	const {tab, current_tab, theme} = useSelector((state) => state.common);
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
			if (data.type === 'SSH') {
				dispatch({
					type: SSH_SEND_DISCONNECTION_REQUEST,
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
		<_Container>
			<_Nav back={sideColor[theme]}>
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
											? backColor[theme]
											: sideColor[theme]
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
										{data.type === 'SSH' && (
											<RiTerminalFill />
										)}
										{data.type === 'SFTP' && sftpIconSmall}
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
				<RightCornerIcons />
			</_Nav>
			<_WorkSpaceContainer>
				<PanesContainer />
				<AsideContainer />
			</_WorkSpaceContainer>
		</_Container>
	);
};

export default WorkSpace;
