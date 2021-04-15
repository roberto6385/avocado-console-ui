import React, {useCallback, useEffect, useState} from 'react';
import {NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import SplitBar from './SplitBar';
import {CHANGE_VISIBLE_TAB, CLOSE_TAB, SORT_TAB} from '../reducers/common';
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
import Sortable from 'sortablejs';
import {sendDisconnect} from '../sagas/sftp';
import {disconnectAction} from '../reducers/sftp/index';

const TabNavBar = () => {
	const dispatch = useDispatch();
	const [active, setActive] = useState('');
	const {tab, current_tab} = useSelector((state) => state.common);
	const [oldOlder, setOldOlder] = useState(0);
	const [draggedItem, setDraggedItem] = useState({});

	const changeVisibleTab = useCallback(
		(tab_id) => () => {
			dispatch({type: CHANGE_VISIBLE_TAB, data: tab_id});
		},
		[],
	);

	const onClickDelete = useCallback(
		(id) => async () => {
			const clicked_tab = tab.find((x) => x.id === id);
			const {ws, uuid} = clicked_tab.socket;

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
				const channel = clicked_tab.channel;
				dispatch(disconnectAction({socket: ws, channel, id, uuid}));
			}
		},
		[tab],
	);

	const prevPutItem = useCallback(
		(item) => () => {
			// console.log(tab.findIndex((it) => it === item)); //이전 위치
			setOldOlder(tab.findIndex((it) => it === item));
			setDraggedItem(item);
		},
		[tab],
	);

	const nextPutItem = useCallback(
		(item) => () => {
			// console.log(tab);
			console.log(oldOlder);
			const newOlder = tab.findIndex((it) => it === item);
			console.log(tab.findIndex((it) => it === item)); //바뀐위치
			console.log(draggedItem);
			dispatch({
				type: SORT_TAB,
				data: {
					oldOrder: oldOlder,
					newOrder: newOlder,
					newTab: draggedItem,
				},
			});
		},
		[tab, oldOlder, draggedItem],
	);

	useEffect(() => {
		const sortableTabNav = document.getElementById('sortableTabNav');
		sortableTabNav !== null &&
			Sortable.create(sortableTabNav, {
				// group: 'sorting',
				sort: false,
				direction: 'horizontal',
			});
	}, [Sortable]);

	return (
		<TabContainer
			activeKey={active}
			defaultActiveKey={active}
			onSelect={(i) => setActive(i)}
		>
			<FlexBox>
				<TabNav id='sortableTabNav'>
					{tab &&
						tab.map((data) => (
							<TabNavItem
								key={data.id.toString()}
								draggable='true'
								onDragStart={prevPutItem(data)}
								onDrop={nextPutItem(data)}
							>
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
