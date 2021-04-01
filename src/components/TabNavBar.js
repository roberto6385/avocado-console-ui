import React, {useCallback, useState} from 'react';
import {NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import SplitBar from './SplitBar';
import {CHANGE_VISIBLE_TAB, CLOSE_TAB} from '../reducers/common';
import {
	FlexBox,
	IconButton,
	IconSpan,
	TabNavItem,
	TabContainer,
	TabNav,
	TabSSHTIcon,
	TabSFTPIcon,
} from '../styles/common';
import newSftp_ws from '../ws/sftp_ws';
import {ssht_ws_request} from '../ws/ssht_ws_request';
import {GetMessage} from '../ws/ssht_ws_logic';

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
		(id) => async () => {
			const clicked_tab = tab.find((x) => x.id === id);
			const {ws} = clicked_tab.socket;

			if (clicked_tab.type === 'SSHT') {
				ssht_ws_request({keyword: 'SendDisconnect', ws: ws});

				ws.onmessage = (evt) => {
					const message = GetMessage(evt);
					console.log(message);

					if (message.type === 'DISCONNECT')
						dispatch({type: CLOSE_TAB, data: id});
					else console.log('V TabNavBar onmessage: ', message);
				};
			} else {
				newSftp_ws({
					keyword: 'Disconnection',
					ws,
				}).then((r) => {
					dispatch({type: CLOSE_TAB, data: id});
				});
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
