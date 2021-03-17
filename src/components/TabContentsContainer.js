import React, {useCallback} from 'react';
import {PropTypes} from 'prop-types';
import {Card} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {RiTerminalFill} from 'react-icons/ri';
import {BiTransferAlt} from 'react-icons/bi';

import {CLOSE_TAB} from '../reducers/common';
import {FaTimes} from 'react-icons/all';
import SSHTContainer from './SSHT/SSHTContainer';
import styled from 'styled-components';
import {SECOND_NAV_HEIGHT} from '../styles/global';
import SSH from '../dist/ssh_pb';
import SFTP from '../dist/sftp_pb';

const ContainerCardHeader = styled(Card.Header)`
	padding: 7px 20px;
	margin: 0;
	height: ${SECOND_NAV_HEIGHT};
	background: rgba(0, 0, 0, 0.03);
`;

const TabContentsContainer = ({index, type, display, server, socket}) => {
	const dispatch = useDispatch();

	const onClickDelete = useCallback(
		(i) => () => {
			console.log('Client Closed on Contents Container');

			if (type === 'SSHT') {
				const msgObj = new SSH.Message();
				msgObj.setType(SSH.Message.Types.REQUEST);

				const reqObj = new SSH.Request();
				reqObj.setType(SSH.Request.Types.DISCONNECT);

				const disObj = new SSH.DisconnectRequest();
				disObj.setUuid(socket.uuid);

				reqObj.setBody(disObj.serializeBinary());
				msgObj.setBody(reqObj.serializeBinary());

				socket.ws.send(msgObj.serializeBinary());
			} else {
				const msgObj = new SFTP.Message();
				msgObj.setType(SFTP.Message.Types.REQUEST);

				const reqObj = new SFTP.Request();
				reqObj.setType(SFTP.Request.Types.DISCONNECT);

				const disObj = new SFTP.DisconnectRequest();
				disObj.setUuid(socket.uuid);

				reqObj.setBody(disObj.serializeBinary());
				msgObj.setBody(reqObj.serializeBinary());

				socket.ws.send(msgObj.serializeBinary());
			}

			dispatch({type: CLOSE_TAB, data: i});
		},
		[dispatch],
	);

	return (
		<Card
			className={display ? 'visible' : 'invisible'}
			style={{height: '100%'}}
		>
			<ContainerCardHeader as='h6'>
				{type === 'SSHT' ? <RiTerminalFill /> : <BiTransferAlt />}
				{server?.name}
				<span style={{float: 'right'}}>
					<FaTimes onClick={onClickDelete(index)} />
				</span>
			</ContainerCardHeader>
			<SSHTContainer
				index={index}
				my_server={server}
				socket={socket}
				type={type}
			/>
		</Card>
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
