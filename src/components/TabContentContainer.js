import React, {useCallback} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import SSHTContainer from './SSHT/SSHTContainer';
import SFTPContainer from './SFTP/SFTPContainer';
import {CHANGE_CURRENT_TAB, CLOSE_TAB} from '../reducers/common';
import {TabContentCardHeader, TabSFTPIcon, TabSSHTIcon} from '../styles/common';
import {ssht_ws_request} from '../ws/ssht_ws_request';
import {GetMessage} from '../ws/ssht_ws_logic';
import {disconnectAction} from '../reducers/sftp';
import {Card} from 'react-bootstrap';
import styled from 'styled-components';

const TabContentCard = styled(Card)`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`;

const TabContentContainer = ({index, type, server, socket}) => {
	const dispatch = useDispatch();
	const {ws} = socket;
	const {tab, current_tab} = useSelector((state) => state.common);
	const clicked_tab = tab.find((x) => x.id === index);

	const onClickDelete = useCallback(() => {
		if (type === 'SSHT') {
			ssht_ws_request({keyword: 'SendDisconnect', ws: ws});

			ws.onmessage = (evt) => {
				const message = GetMessage(evt);
				console.log(message);

				if (message.type === 'DISCONNECT')
					dispatch({type: CLOSE_TAB, data: index});
				else console.log('V TabContentContainer onmessage: ', message);
			};
		} else if (type === 'SFTP') {
			const channel = clicked_tab.channel;
			dispatch(disconnectAction({socket: ws, channel, id: index}));
		}
	}, [dispatch]);

	const onClickChangeTab = useCallback(() => {
		if (current_tab !== index)
			dispatch({type: CHANGE_CURRENT_TAB, data: index});
	}, [index]);

	return (
		<TabContentCard onClick={onClickChangeTab}>
			{tab.filter((v) => v.display === true).length !== 1 && (
				<TabContentCardHeader as='h6'>
					{type === 'SSHT' ? <TabSSHTIcon /> : <TabSFTPIcon />}
					{server?.name}
					<span className='right'>
						<FaTimes onClick={onClickDelete} />
					</span>
				</TabContentCardHeader>
			)}
			{type === 'SSHT' ? (
				<SSHTContainer index={index} server_id={server.id} />
			) : (
				<SFTPContainer uuid={socket.uuid} data={server} />
			)}
		</TabContentCard>
	);
};

TabContentContainer.propTypes = {
	index: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	server: PropTypes.object.isRequired,
	socket: PropTypes.object.isRequired,
};

export default TabContentContainer;
