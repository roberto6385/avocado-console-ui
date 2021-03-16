import React, {useCallback, useState} from 'react';
import {Nav, NavLink, Tab} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {RiTerminalFill} from 'react-icons/ri';
import {BiTransferAlt} from 'react-icons/bi';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import SSH from '../dist/ssh_pb';

import {CHANGE_VISIBLE_TAB, CLOSE_TAB, OPEN_TAB} from '../reducers/common';
import {FaTimes} from 'react-icons/all';
import {HIGHLIGHT_COLOR, NAV_HEIGHT} from '../styles/global';
// import WindowSplitBar from './SplitWindowBar';

const Tab_Nav = styled(Nav)`
	height: ${NAV_HEIGHT};
`;

const Tab_NavItem = styled(Nav.Item)`
	.tab_navLink {
		display: flex;
		align-items: center;
		height: 100%;
	}
	.tab_navLink.active {
		background-color: ${HIGHLIGHT_COLOR};
	}
`;

const Tab_Nav_Span = styled.span`
	display: flex;
	align-items: center;
	color: black;
`;

const TabNavBar = () => {
	const dispatch = useDispatch();
	const [active, setActive] = useState('');
	const {tab, current_tab} = useSelector((state) => state.common);

	const changeVisibleTab = useCallback(
		(tab_id) => () => {
			//dispatch({type: CHANGE_VISIBLE_TAB, data: tab_id});
		},
		[dispatch],
	);

	const onClickDelete = useCallback(
		(tab_id) => () => {
			// 각각의 탭을 구분지으려면 index id가 필요함
			console.log(tab, tab_id);
			const currentTab = tab?.find((item) => item.id === tab_id);
			console.log(currentTab);
			// if (currentTab) {
			// 	const uuid = currentTab?.socket.uuid;
			// 	const ws = currentTab?.socket.ws;
			// 	console.log(uuid);
			// 	console.log(ws);
			//
			// 	//서버 연결해제
			// 	const msgObj = new SSH.Message();
			// 	msgObj.setType(SSH.Message.Types.REQUEST);
			//
			// 	const reqObj = new SSH.Request();
			// 	reqObj.setType(SSH.Request.Types.DISCONNECT);
			//
			// 	const disObj = new SSH.DisconnectRequest();
			// 	disObj.setUuid(uuid);
			//
			// 	reqObj.setBody(disObj.serializeBinary());
			// 	msgObj.setBody(reqObj.serializeBinary());
			//
			// 	ws.send(msgObj.serializeBinary());
			// 	ws.onmessage = (evt) => {
			// 		const message = SSH.Message.deserializeBinary(evt.data);
			//
			// 		const response = SSH.Response.deserializeBinary(
			// 			message.getBody(),
			// 		);
			//
			// 		if (response.getType() === SSH.Response.Types.DISCONNECT) {
			// 			const conObj = SSH.DisconnectResponse.deserializeBinary(
			// 				response.getBody(),
			// 			);
			// 			if (conObj.getStatus() === 'disconnected') {
			// 				dispatch({type: CLOSE_TAB, data: tab_id});
			// 			}
			// 		}
			// 	};
			// }
		},
		[dispatch],
	);

	return (
		<Tab.Container
			activeKey={active}
			defaultActiveKey={active}
			onSelect={(i) => setActive(i)}
		>
			<Tab_Nav>
				{tab &&
					tab.map((data) => (
						<Tab_NavItem key={data.id.toString()}>
							<NavLink
								className={
									data.id === current_tab
										? 'tab_navLink active'
										: 'tab_navLink'
								}
								as={Link}
								to='/'
								eventKey={data.id}
							>
								<Tab_Nav_Span
									onClick={changeVisibleTab(data.id)}
								>
									{data.type === 'SSHT' ? (
										<RiTerminalFill />
									) : (
										<BiTransferAlt />
									)}
									{data.server.name}
								</Tab_Nav_Span>
								<span
									style={{
										marginLeft: '10px',
										color: '#116466',
									}}
								>
									<FaTimes onClick={onClickDelete(data.id)} />
								</span>
							</NavLink>
						</Tab_NavItem>
					))}
			</Tab_Nav>
			{/*<WindowSplitBar />*/}
		</Tab.Container>
	);
};

export default TabNavBar;
