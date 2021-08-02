import {Icon, HoverButton} from '../../styles/components/icon';
import {
	activeColor,
	fontColor,
	tabbarColor,
	tabColor,
} from '../../styles/color';
import {closeIcon, sftpIcon, sshIcon} from '../../icons/icons';
import RightCornerIcons from './RightCornerIcons';
import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {CHANGE_VISIBLE_TAB, SORT_TAB} from '../../reducers/common';
import {SSH_SEND_DISCONNECTION_REQUEST} from '../../reducers/ssh';
import {disconnectAction} from '../../reducers/sftp';

const _Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: ${(props) => tabbarColor[props.theme_value]};
`;

const _Tabs = styled.div`
	display: flex;
	overflow: auto;
	max-width: calc(100% - 152px);
	height: 54px;
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

const _ServerTitle = styled.div`
	flex: 1;
	overflow: hidden;
`;

const TabBar = () => {
	const dispatch = useDispatch();

	const {tab, current_tab, theme} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {ssh} = useSelector((state) => state.ssh, shallowEqual);
	const {socket: sftp_socketState} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);

	const [oldOlder, setOldOlder] = useState(0);
	const [draggedItem, setDraggedItem] = useState({});
	const [asideToggle, setAsideToggle] = useState(false);

	const onClickChangeVisibleTab = useCallback(
		(uuid) => () => {
			dispatch({type: CHANGE_VISIBLE_TAB, data: uuid});
		},
		[],
	);

	const onClickCloseTab = useCallback(
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
						socket: sftp_socketState.find(
							(v) => v.uuid === data.uuid,
						).socket,
					}),
				);
			}
		},
		[ssh, sftp_socketState],
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
		[tab, dispatch, oldOlder, draggedItem],
	);

	return (
		<_Container theme_value={theme}>
			<_Tabs>
				{tab.map((data) => {
					return (
						<_Tab
							key={data.uuid}
							onDragOver={(e) => e.preventDefault()}
							onDrop={nextPutItem(data)}
							onClick={onClickChangeVisibleTab(data.uuid)}
						>
							<_TabItem
								draggable='true'
								onDragStart={prevPutItem(data)}
								clicked={current_tab === data.uuid ? 1 : 0}
								theme_value={theme}
							>
								<Icon
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
								</Icon>
								<_ServerTitle
									onClick={onClickChangeVisibleTab(data.uuid)}
								>
									{data.server.name}
								</_ServerTitle>
								<HoverButton
									size={'xs'}
									margin={'0px 0px 0px 6px'}
									theme_value={theme}
									onClick={onClickCloseTab(data)}
								>
									{closeIcon}
								</HoverButton>
							</_TabItem>
						</_Tab>
					);
				})}
			</_Tabs>
			<RightCornerIcons toggle={asideToggle} setToggle={setAsideToggle} />
		</_Container>
	);
};

export default TabBar;
