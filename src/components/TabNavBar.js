import React, {useCallback, useState} from 'react';
import {Nav, NavLink, Tab} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {RiTerminalFill} from 'react-icons/ri';
import {BiTransferAlt} from 'react-icons/bi';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import {CHANGE_VISIBLE_TAB, CLOSE_TAB} from '../reducers/common';
import {FaTimes} from 'react-icons/all';
import {NAV_HEIGHT} from '../styles/global';
// import WindowSplitBar from './SplitWindowBar';

const Tab_Nav = styled(Nav)`
	height: ${NAV_HEIGHT};
`;

const Tab_NavItem = styled(Nav.Item)``;

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
			dispatch({type: CLOSE_TAB, data: tab_id});
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
								as={Link}
								to='/'
								eventKey={data.id}
								style={
									data.id === current_tab
										? {
												display: 'flex',
												alignItems: 'center',
												height: '100%',
												backgroundColor: '#edeae5',
										  }
										: {
												display: 'flex',
												alignItems: 'center',
										  }
								}
							>
								<span
									onClick={changeVisibleTab(data.id)}
									style={{
										display: 'flex',
										alignItems: 'center',
										color: 'black',
									}}
									className={'ssht-sftp-icon'}
								>
									{data.type === 'SSHT' ? (
										<RiTerminalFill />
									) : (
										<BiTransferAlt />
									)}
									{data.server.name}
								</span>
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
