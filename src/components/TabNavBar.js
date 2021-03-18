import React, {useCallback, useState} from 'react';
import {Nav, NavLink, Tab} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {RiTerminalFill} from 'react-icons/ri';
import {BiTransferAlt} from 'react-icons/bi';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import {CHANGE_VISIBLE_TAB, CLOSE_TAB} from '../reducers/common';
import {FaTimes} from 'react-icons/all';
import {HIGHLIGHT_COLOR, NAV_HEIGHT} from '../styles/global';
import SplitBar from './SplitBar';
import SSH from '../dist/ssh_pb';
import SFTP from '../dist/sftp_pb';

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

const Split_Bar = styled(SplitBar)`
	float: right;
	margin-left: 10px;
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
			console.log(type, ws, uuid);

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
				const msgObj = new SFTP.Message();
				msgObj.setType(SFTP.Message.Types.REQUEST);

				const reqObj = new SFTP.Request();
				reqObj.setType(SFTP.Request.Types.DISCONNECT);

				const disObj = new SFTP.DisconnectRequest();
				disObj.setUuid(uuid);

				reqObj.setBody(disObj.serializeBinary());
				msgObj.setBody(reqObj.serializeBinary());

				ws.send(msgObj.serializeBinary());
			}

			// dispatch({type: CLOSE_TAB, data: tab_id});
		},
		[dispatch, tab],
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
				<Split_Bar />
			</Tab_Nav>
		</Tab.Container>
	);
};

export default TabNavBar;
