import {HoverButton, Icon} from '../../styles/components/icon';
import {closeIcon, sftpIcon, sshIcon} from '../../icons/icons';
import MenuButtons from './MenuButtons';
import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {SSH_SEND_DISCONNECTION_REQUEST} from '../../reducers/ssh';
import PropTypes from 'prop-types';
import {DISCONNECTION_REQUEST} from '../../reducers/sftp';
import {tabBarAction, tabBarSelector} from '../../reducers/tabBar';

const _Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: ${(props) =>
		props.theme.pages.webTerminal.main.tab.backgroundColor};
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
			? props.theme.pages.webTerminal.main.tab.selectedItems
					.backgroundColor
			: props.theme.pages.webTerminal.main.tab.normalItems
					.backgroundColor};
	color: ${(props) =>
		props.clicked
			? props.theme.pages.webTerminal.main.tab.selectedItems.font.color
			: props.theme.pages.webTerminal.main.tab.normalItems.font.color};
	width: 160px;
	border-top: 2px solid
		${(props) =>
			props.clicked
				? props.theme.pages.webTerminal.main.tab.selectedItems.border
						.color
				: props.theme.pages.webTerminal.main.tab.normalItems.border
						.color};
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

const TabBar = ({toggle, setToggle}) => {
	const dispatch = useDispatch();

	const {terminalTabs, selectedTab} = useSelector(tabBarSelector.all);
	const {ssh} = useSelector((state) => state.ssh, shallowEqual);
	const {socket: sftpSockets} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);

	const [draggedTabIndex, setDraggedTabIndex] = useState(0);
	const [draggedTab, setDraggedTab] = useState({});

	const onClickChangeVisibleTab = useCallback(
		(v) => () => {
			dispatch(tabBarAction.selectTab(v));
		},
		[dispatch],
	);

	const onClickCloseTerminalTab = useCallback(
		(item) => (e) => {
			e.stopPropagation();

			if (item.type === 'SSH') {
				dispatch({
					type: SSH_SEND_DISCONNECTION_REQUEST,
					payload: {
						uuid: item.uuid,
						ws: ssh.find((v) => v.uuid === item.uuid).ws,
					},
				});
			} else if (item.type === 'SFTP') {
				dispatch({
					type: DISCONNECTION_REQUEST,
					payload: {
						uuid: item.uuid,
						socket: sftpSockets.find((v) => v.uuid === item.uuid)
							.socket,
					},
				});
			}
		},
		[ssh, sftpSockets],
	);

	const onDragStartTab = useCallback(
		(item) => () => {
			setDraggedTabIndex(terminalTabs.findIndex((v) => v === item));
			setDraggedTab(item);
		},
		[terminalTabs],
	);

	const onDropTab = useCallback(
		(item) => (e) => {
			e.preventDefault();
			if (item === undefined) return;

			dispatch(
				tabBarAction.sortTab({
					oldOrder: draggedTabIndex,
					newOrder: terminalTabs.findIndex((v) => v === item),
					newTab: draggedTab,
				}),
			);
		},
		[terminalTabs, dispatch, draggedTabIndex, draggedTab],
	);

	return (
		<_Container>
			<_Tabs>
				{terminalTabs.map((data) => {
					return (
						<_Tab
							key={data.uuid}
							onDragOver={(e) => e.preventDefault()}
							onDrop={onDropTab(data)}
							onClick={onClickChangeVisibleTab(data.uuid)}
						>
							<_TabItem
								draggable='true'
								onDragStart={onDragStartTab(data)}
								clicked={selectedTab === data.uuid ? 1 : 0}
							>
								<Icon
									margin_right={'6px'}
									size={'xs'}
									itype={
										selectedTab === data.uuid
											? 'selected'
											: 'font'
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
									onClick={onClickCloseTerminalTab(data)}
								>
									{closeIcon}
								</HoverButton>
							</_TabItem>
						</_Tab>
					);
				})}
			</_Tabs>
			<MenuButtons toggle={toggle} setToggle={setToggle} />
		</_Container>
	);
};

TabBar.propTypes = {
	toggle: PropTypes.bool.isRequired,
	setToggle: PropTypes.func.isRequired,
};

export default TabBar;
