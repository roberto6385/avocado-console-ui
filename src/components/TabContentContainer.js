import React, {useCallback, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import SSHTContainer from './SSHT/SSHTContainer';
import SFTPContainer from './SFTP/SFTPContainer';
import {CHANGE_CURRENT_TAB} from '../reducers/common';
import {TabSFTPIcon, TabSSHTIcon} from '../styles/common';
import {disconnectAction} from '../reducers/sftp';
import {SSHT_SEND_DISCONNECTION_REQUEST} from '../reducers/ssht';
import {BaseCard, SubHeader} from '../styles/cards';

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
		<BaseCard onClick={onClickChangeTab}>
			{tab.filter((v) => v.display === true).length !== 1 && (
				<SubHeader padding={'2px 4px'} justify='space-between'>
					<div>
						{type === 'SSHT' ? <TabSSHTIcon /> : <TabSFTPIcon />}
						{server.name}
					</div>
					<span className='right'>
						<FaTimes onClick={onClickDelete} />
					</span>
				</SubHeader>
			)}
			{type === 'SSHT' ? (
				<SSHTContainer uuid={uuid} server_id={server.id} />
			) : (
				<SFTPContainer uuid={uuid} />
			)}
		</BaseCard>
	);
};

TabContentContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	server: PropTypes.object.isRequired,
};

export default TabContentContainer;
