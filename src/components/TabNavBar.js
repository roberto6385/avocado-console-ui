import React, {useCallback, useEffect, useState} from 'react';
import {NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';
import Sortable from 'sortablejs';

import SplitBar from './SplitBar';
import {CHANGE_VISIBLE_TAB, SORT_TAB} from '../reducers/common';
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
import {disconnectAction} from '../reducers/sftp';
import {SSHT_SEND_DISCONNECTION_REQUEST} from '../reducers/ssht';

const TabNavBar = () => {
	const dispatch = useDispatch();
	const [active, setActive] = useState('');
	const {tab, current_tab} = useSelector((state) => state.common);
	const {ssht} = useSelector((state) => state.ssht);
	const {sftp} = useSelector((state) => state.sftp);
	const [oldOlder, setOldOlder] = useState(0);
	const [draggedItem, setDraggedItem] = useState({});

	const changeVisibleTab = useCallback(
		(uuid) => () => {
			dispatch({type: CHANGE_VISIBLE_TAB, data: uuid});
		},
		[],
	);

	const onClickDelete = useCallback(
		(data) => () => {
			if (data.type === 'SSHT') {
				dispatch({
					type: SSHT_SEND_DISCONNECTION_REQUEST,
					data: {
						uuid: data.uuid,
						ws: ssht.find((v) => v.uuid === data.uuid).ws,
					},
				});
			} else if (data.type === 'SFTP') {
				console.log(data.uuid);
				console.log(sftp);
				console.log(sftp.find((v) => v.uuid === data.uuid));
				dispatch(
					disconnectAction({
						uuid: data.uuid,
						socket: sftp.find((v) => v.uuid === data.uuid).socket,
					}),
				);
			}
		},
		[dispatch, ssht, sftp],
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
								key={data.uuid}
								draggable='true'
								onDragStart={prevPutItem(data)}
								onDrop={nextPutItem(data)}
							>
								<NavLink
									className={
										data.uuid === current_tab
											? 'tab_navLink active_tab_item'
											: 'tab_navLink'
									}
									as={Link}
									to='/'
									eventKey={data.uuid}
								>
									<IconSpan
										onClick={changeVisibleTab(data.uuid)}
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
