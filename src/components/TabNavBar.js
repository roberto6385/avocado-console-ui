import React, {useCallback, useState} from 'react';
import {NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import SplitBar from './SplitBar';
import {sendDisconnect} from './SFTP/commands/sendDisconnect';
import {CHANGE_VISIBLE_TAB, CLOSE_TAB, OPEN_TAB} from '../reducers/common';
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
import usePostMessage from './SFTP/hooks/usePostMessage';
import getMessage from './SFTP/hooks/useGetMessage';
import {
	SFTP_DELETE_CURRENT_LIST,
	SFTP_DELETE_CURRENT_PATH,
} from '../reducers/sftp';

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
		(data) => async () => {
			const clicked_tab = tab.find((x) => x.id === data.id);
			const {type} = clicked_tab;
			const {ws, uuid} = clicked_tab.socket;

			if (type === 'SSHT') ws.send(Close(uuid));
			else {
				await usePostMessage({
					keyword: 'Disconnection',
					ws,
					uuid,
				});
				dispatch({type: CLOSE_TAB, data: data.id});
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
									<IconButton onClick={onClickDelete(data)}>
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
