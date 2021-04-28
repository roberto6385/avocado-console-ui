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

const TabContentContainer = ({uuid, type, server}) => {
	const dispatch = useDispatch();
	const {tab, current_tab} = useSelector((state) => state.common);
	const clicked_tab = tab.find((x) => x.uuid === uuid);
	const {socket} = clicked_tab;

	const onClickDelete = useCallback(() => {
		if (type === 'SSHT') {
			ssht_ws_request({keyword: 'SendDisconnect', ws: socket});

			socket.onmessage = (evt) => {
				const message = GetMessage(evt);
				console.log(message);

				if (message.type === 'DISCONNECT')
					dispatch({type: CLOSE_TAB, data: uuid});
				else console.log('V TabContentContainer onmessage: ', message);
			};
		} else if (type === 'SFTP') {
			dispatch(disconnectAction(uuid));
		}
	}, [dispatch]);

	const onClickChangeTab = useCallback(() => {
		if (current_tab !== uuid)
			dispatch({type: CHANGE_CURRENT_TAB, data: uuid});
	}, [uuid]);

	return (
		<TabContentCard onClick={onClickChangeTab}>
			{tab.filter((v) => v.display === true).length !== 1 && (
				<TabContentCardHeader as='h6'>
					{type === 'SSHT' ? <TabSSHTIcon /> : <TabSFTPIcon />}
					{server.name}
					<span className='right'>
						<FaTimes onClick={onClickDelete} />
					</span>
				</TabContentCardHeader>
			)}
			{type === 'SSHT' ? (
				<SSHTContainer uuid={uuid} server_key={server.key} />
			) : (
				<SFTPContainer uuid={uuid} />
			)}
		</TabContentCard>
	);
};

TabContentContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	server: PropTypes.object.isRequired,
};

export default TabContentContainer;
