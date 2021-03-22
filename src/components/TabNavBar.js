import React, {useCallback, useState} from 'react';
import {Nav, NavLink, Tab} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {RiTerminalFill} from 'react-icons/ri';
import {BiTransferAlt} from 'react-icons/bi';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import {CHANGE_VISIBLE_TAB, CLOSE_TAB, OPEN_TAB} from '../reducers/common';
import {FaTimes} from 'react-icons/all';
import {HIGHLIGHT_COLOR, NAV_HEIGHT} from '../styles/global';
import SplitBar from './SplitBar';
import SSH from '../dist/ssh_pb';
import {sendDisconnect} from './SFTP/commands/sendDisconnect';
import SFTP from '../dist/sftp_pb';
import {
	SFTP_DELETE_CURRENT_LIST,
	SFTP_DELETE_CURRENT_PATH,
} from '../reducers/sftp';

const TabContainer = styled(Tab.Container)`
	display: flex !important;
	height: ${NAV_HEIGHT};
`;
const TabNav = styled(Nav)`
	height: ${NAV_HEIGHT};
	flex: 1;
	flex-wrap: nowrap;
	overflow-x: scroll;
`;

const NavItem = styled(Nav.Item)`
	.tab_navLink {
		display: flex;
		align-items: center;
		height: 100%;
	}
	.active_tab_item {
		background-color: ${HIGHLIGHT_COLOR};
	}
`;

const Span = styled.span`
	display: flex;
	align-items: center;
	color: black;
`;

const FlexBox = styled.div`
	display: flex;
`;

const TabNavBar = () => {
	const dispatch = useDispatch();
	const [active, setActive] = useState('');
	const {tab, current_tab} = useSelector((state) => state.common);

	const changeVisibleTab = useCallback(
		(tab_id) => () => {
			dispatch({type: CHANGE_VISIBLE_TAB, data: tab_id});
		},
		[dispatch],
	);

	const onClickDelete = useCallback(
		(tab_id) => () => {
			const current_tab = tab.find((x) => x.id === tab_id);
			const {type} = current_tab;
			const {ws, uuid} = current_tab.socket;

			if (type === 'SSHT') {
				console.log('Client Closed on Nav Bar');
				const msgObj = new SSH.Message();
				msgObj.setType(SSH.Message.Types.REQUEST);

				const reqObj = new SSH.Request();
				reqObj.setType(SSH.Request.Types.DISCONNECT);

				const disObj = new SSH.DisconnectRequest();
				disObj.setUuid(uuid);

				reqObj.setBody(disObj.serializeBinary());
				msgObj.setBody(reqObj.serializeBinary());
				ws.send(msgObj.serializeBinary());
			} else {
				sendDisconnect(ws, uuid, tab_id, dispatch);
			}
		},
		[dispatch, tab],
	);

	return (
		<TabContainer
			activeKey={active}
			defaultActiveKey={active}
			onSelect={(i) => setActive(i)}
		>
			<FlexBox>
				<TabNav className='here is tab'>
					{tab &&
						tab.map((data) => (
							<NavItem key={data.id.toString()}>
								<NavLink
									className={
										data.id === current_tab
											? 'tab_navLink active_tab_item'
											: 'tab_navLink'
									}
									as={Link}
									to='/'
									eventKey={data.id}
								>
									<Span onClick={changeVisibleTab(data.id)}>
										{data.type === 'SSHT' ? (
											<RiTerminalFill />
										) : (
											<BiTransferAlt />
										)}
										{data.server.name}
									</Span>
									<span
										style={{
											marginLeft: '10px',
											color: '#116466',
										}}
									>
										<FaTimes
											onClick={onClickDelete(data.id)}
										/>
									</span>
								</NavLink>
							</NavItem>
						))}
				</TabNav>
				<SplitBar />
			</FlexBox>
		</TabContainer>
	);
};

export default TabNavBar;
