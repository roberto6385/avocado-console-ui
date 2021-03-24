import React, {useCallback, useState} from 'react';
import {NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {RiTerminalFill} from 'react-icons/ri';
import {BiTransferAlt} from 'react-icons/bi';
import {useDispatch, useSelector} from 'react-redux';
import {CHANGE_VISIBLE_TAB} from '../reducers/common';
import {FaTimes} from 'react-icons/all';
import SplitBar from './SplitBar';

import {sendDisconnect} from './SFTP/commands/sendDisconnect';
import {Close} from '../dist/ssht_ws';
import {FlexBox, NavItem, Span, TabContainer, TabNav} from '../styles/common';

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
				ws.send(Close(uuid));
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
