import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';
import Sortable from 'sortablejs';

import {CHANGE_VISIBLE_TAB, SORT_TAB} from '../reducers/common';
import {TabSSHTIcon, TabSFTPIcon} from '../styles/common';
import {disconnectAction} from '../reducers/sftp';
import {SSHT_SEND_DISCONNECTION_REQUEST} from '../reducers/ssht';
import {PrevIconButton} from '../styles/buttons';
import RightCornerIcons from './RightCornerIcons';
import {MainHeader} from '../styles/cards';
import {BaseNav, TabNavItem} from '../styles/navs';
import {BaseSpan} from '../styles/texts';
import {HIGHLIGHT_COLOR, light_Background, NAV_HEIGHT} from '../styles/global';
import {RowBox} from '../styles/divs';

const TabNavBar = () => {
	const dispatch = useDispatch();
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
		<MainHeader justify={'space-between'} back={light_Background}>
			<BaseNav
				id='sortableTabNav'
				overflow={'scroll'}
				height={NAV_HEIGHT}
			>
				{tab &&
					tab.map((data) => (
						<RowBox
							padding={'8px'}
							key={data.uuid}
							draggable='true'
							onDragStart={prevPutItem(data)}
							onDrop={nextPutItem(data)}
							back={data.uuid === current_tab && HIGHLIGHT_COLOR}
						>
							<BaseSpan onClick={changeVisibleTab(data.uuid)}>
								{data.type === 'SSHT' ? (
									<TabSSHTIcon />
								) : (
									<TabSFTPIcon />
								)}
								{data.server.name}
							</BaseSpan>
							<PrevIconButton onClick={onClickDelete(data)}>
								<FaTimes />
							</PrevIconButton>
							{/*</NavLink>*/}
						</RowBox>
					))}
			</BaseNav>
			<RightCornerIcons />
		</MainHeader>
	);
};

export default TabNavBar;
