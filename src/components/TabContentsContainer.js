import React, {useCallback, useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import {Card} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {RiTerminalFill} from 'react-icons/ri';
import {BiTransferAlt} from 'react-icons/bi';
import {FaTimes} from 'react-icons/all';

import SSHTContainer from './SSHT/SSHTContainer';
import styled from 'styled-components';
import {SECOND_NAV_HEIGHT} from '../styles/global';
import SSH from '../dist/ssh_pb';
import SFTPContainer from './SFTP/SFTPContainer';
import {CHANGE_CURRENT_TAB, CLOSE_TAB} from '../reducers/common';
import {sendDisconnect} from './SFTP/commands/sendDisconnect';
import SFTP from '../dist/sftp_pb';
import {
	SFTP_DELETE_CURRENT_LIST,
	SFTP_DELETE_CURRENT_PATH,
} from '../reducers/sftp';

const ContainerCardHeader = styled(Card.Header)`
	padding: 7px 20px;
	margin: 0;
	height: ${SECOND_NAV_HEIGHT};
	background: rgba(0, 0, 0, 0.03);
`;

const CardContainer = styled(Card)`
	display: flex;
	flex-direction: column;
	height: ${(props) => props.h};
	width: ${(props) => props.w};
`;

const TabContentsContainer = ({index, type, display, server, socket}) => {
	const dispatch = useDispatch();
	const {ws, uuid} = socket;
	const {cols, tab} = useSelector((state) => state.common);
	const [height, setHeight] = useState(null);
	const [width, setWidth] = useState(null);

	const onClickDelete = useCallback(
		() => () => {
			if (type === 'SSHT') {
				console.log('Client Closed on Contents Container');
				const msgObj = new SSH.Message();
				msgObj.setType(SSH.Message.Types.REQUEST);

				const reqObj = new SSH.Request();
				reqObj.setType(SSH.Request.Types.DISCONNECT);

				const disObj = new SSH.DisconnectRequest();
				disObj.setUuid(uuid);

				reqObj.setBody(disObj.serializeBinary());
				msgObj.setBody(reqObj.serializeBinary());

				ws.send(msgObj.serializeBinary());
			} else {
				sendDisconnect(ws, uuid, index, dispatch);
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
		<CardContainer
			onClick={onClickChangeTab}
			className={display ? 'visible' : 'invisible'}
			h={height}
			w={width}
		>
			<ContainerCardHeader as='h6'>
				{type === 'SSHT' ? <RiTerminalFill /> : <BiTransferAlt />}
				{server?.name}
				<span className='right'>
					<FaTimes onClick={onClickDelete()} />
				</span>
			</ContainerCardHeader>
			{type === 'SSHT' ? (
				<SSHTContainer
					index={index}
					display={display}
					server_id={server.id}
					socket={socket}
				/>
			) : (
				<SFTPContainer index={index} socket={socket} />
			)}
		</CardContainer>
	);
};

TabContentsContainer.propTypes = {
	index: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	display: PropTypes.bool.isRequired,
	server: PropTypes.object.isRequired,
	socket: PropTypes.object.isRequired,
};

export default TabContentsContainer;
