import React, {useCallback, useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import SSHTContainer from './SSHT/SSHTContainer';
import SFTPContainer from './SFTP/SFTPContainer';
import {CHANGE_CURRENT_TAB, CLOSE_TAB} from '../reducers/common';
import {Close} from '../ws/ssh_ws';
import {
	TabContentCard,
	TabContentCardHeader,
	TabSFTPIcon,
	TabSSHTIcon,
} from '../styles/common';
import sftp_ws from '../ws/sftp_ws';

const TabContentContainer = ({index, type, display, server, socket}) => {
	const dispatch = useDispatch();
	const {ws, uuid} = socket;
	const {cols, tab} = useSelector((state) => state.common);
	const [height, setHeight] = useState(null);
	const [width, setWidth] = useState(null);

	const onClickDelete = useCallback(
		() => async () => {
			if (type === 'SSHT') ws.send(Close(uuid));
			else {
				await sftp_ws({
					keyword: 'Disconnection',
					ws,
					uuid,
				});
				dispatch({type: CLOSE_TAB, data: index});
			}
		},
		[dispatch],
	);

	useEffect(() => {
		if (!display) {
			setHeight('0%');
			setWidth('0%');
		} else {
			const visible_tab_length = tab.filter((x) => x.display === true)
				.length;
			if (cols === 2 && visible_tab_length > 2) setHeight('50%');
			else setHeight('100%');

			if (visible_tab_length === 3 && cols === 3)
				setWidth('calc(100% / 3)');
			else if (
				visible_tab_length === 1 ||
				(visible_tab_length === 3 &&
					cols === 2 &&
					tab
						.filter((v) => v.display === true)
						.findIndex((i) => i.id === index) === 2)
			)
				setWidth('100%');
			else setWidth('50%');
		}
	}, [display, cols, tab]);

	const onClickChangeTab = useCallback(() => {
		dispatch({type: CHANGE_CURRENT_TAB, data: index});
	}, []);

	return (
		<TabContentCard
			onClick={onClickChangeTab}
			className={display ? 'visible' : 'invisible'}
			h={height}
			w={width}
		>
			{tab.filter((v) => v.display === true).length !== 1 && (
				<TabContentCardHeader as='h6'>
					{type === 'SSHT' ? <TabSSHTIcon /> : <TabSFTPIcon />}
					{server?.name}
					<span className='right'>
						<FaTimes onClick={onClickDelete()} />
					</span>
				</TabContentCardHeader>
			)}
			{type === 'SSHT' ? (
				<SSHTContainer
					index={index}
					display={display}
					server_id={server.id}
					socket={socket}
				/>
			) : (
				<SFTPContainer index={index} socket={socket} data={server} />
			)}
		</TabContentCard>
	);
};

TabContentContainer.propTypes = {
	index: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	display: PropTypes.bool.isRequired,
	server: PropTypes.object.isRequired,
	socket: PropTypes.object.isRequired,
};

export default TabContentContainer;