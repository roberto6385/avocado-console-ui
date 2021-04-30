import React, {useCallback, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';
import {Card} from 'react-bootstrap';
import styled from 'styled-components';

import SSHTContainer from './SSHT/SSHTContainer';
import SFTPContainer from './SFTP/SFTPContainer';
import {CHANGE_CURRENT_TAB} from '../reducers/common';
import {TabContentCardHeader, TabSFTPIcon, TabSSHTIcon} from '../styles/common';
import {commandPwdAction, disconnectAction} from '../reducers/sftp';
import {SSHT_SEND_DISCONNECTION_REQUEST} from '../reducers/ssht';

const TabContentCard = styled(Card)`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`;

const TabContentContainer = ({uuid, type, server}) => {
	const dispatch = useDispatch();
	const {tab, current_tab, cols} = useSelector((state) => state.common);
	const {ssht} = useSelector((state) => state.ssht);
	const {sftp} = useSelector((state) => state.sftp);

	const onClickDelete = useCallback(() => {
		if (type === 'SSHT') {
			dispatch({
				type: SSHT_SEND_DISCONNECTION_REQUEST,
				data: {
					uuid: uuid,
					ws: ssht.find((v) => v.uuid === uuid).ws,
				},
			});
		} else if (type === 'SFTP') {
			dispatch(
				disconnectAction({
					uuid,
					socket: sftp.find((v) => v.uuid === uuid).socket,
				}),
			);
		}
	}, [ssht, sftp, uuid, type]);

	const onClickChangeTab = useCallback(() => {
		if (current_tab !== uuid)
			dispatch({type: CHANGE_CURRENT_TAB, data: uuid});
	}, [current_tab, uuid]);

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
				<SSHTContainer uuid={uuid} server_id={server.id} />
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
