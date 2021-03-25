import React, {useCallback, useState} from 'react';
import {NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import SplitBar from './SplitBar';
import {sendDisconnect} from './SFTP/commands/sendDisconnect';
import {CHANGE_VISIBLE_TAB} from '../reducers/common';
import {Close} from '../dist/ssht_ws';
import {
	FlexBox,
	IconButton,
	IconSpan,
	TabNavItem,
	TabContainer,
	TabIconSpan,
	TabNav,
	TabSFTPIcon,
	TabSSHTIcon,
} from '../styles/common';

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
			const clicked_tab = tab.find((x) => x.id === tab_id);
			const {type} = clicked_tab;
			const {ws, uuid} = clicked_tab.socket;

			if (type === 'SSHT') ws.send(Close(uuid));
			else sendDisconnect(ws, uuid, tab_id, dispatch);
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
				<TabNav>
					{tab &&
						tab.map((data) => (
							<TabNavItem key={data.id.toString()}>
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
									<IconSpan
										onClick={changeVisibleTab(data.id)}
									>
										{data.type === 'SSHT' ? (
											<TabSSHTIcon />
										) : (
											<TabSFTPIcon />
										)}
										{data.server.name}
									</IconSpan>
									<IconButton
										onClick={onClickDelete(data.id)}
									>
										<FaTimes />
									</IconButton>
								</NavLink>
							</TabNavItem>
						))}
				</TabNav>
				<SplitBar />
			</FlexBox>
		</TabContainer>
	);
};

export default TabNavBar;
