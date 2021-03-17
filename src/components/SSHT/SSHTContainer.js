import React, {useCallback} from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from 'react-bootstrap';
import {FaExpand} from 'react-icons/all';

import {CHANGE_CURRENT_TAB} from '../../reducers/common';
import SFTPbtn from '../SFTP/SFTPbtn';
import styled from 'styled-components';
import SSHT from './SSHT';
import SFTP from '../SFTP/SFTP';

const SSHTContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const SSHTBody = styled(Card.Body)`
	padding: 0px;
`;

const SSHContainer = ({index, my_server, socket, type}) => {
	const dispatch = useDispatch();
	const {server} = useSelector((state) => state.common);

	const onCLickFullScreen = useCallback(() => {
		document.getElementById('ssht_' + String(index)).requestFullscreen();
	}, [index]);

	const onCLickChangeCurrentTab = useCallback(() => {
		// dispatch({type: CHANGE_CURRENT_TAB, data: id});
	}, []);

	return type === 'SSHT' ? (
		<SSHTContainer>
			<Card.Header style={{position: 'relative'}}>
				<FaExpand
					onClick={onCLickFullScreen}
					style={{fontSize: '17px'}}
				/>
				<SFTPbtn data={server.find((x) => x.id === my_server.id)} />
			</Card.Header>
			<SSHTBody onClick={onCLickChangeCurrentTab}>
				<SSHT
					id={`ssht_${String(index)}`}
					index={index}
					ws={socket.ws}
					uuid={socket.uuid}
				/>
			</SSHTBody>
		</SSHTContainer>
	) : (
		<SSHTContainer>
			<Card.Header style={{position: 'relative'}}>
				sftp 네비게이션 부
			</Card.Header>
			<SSHTBody onClick={onCLickChangeCurrentTab}>
				<SFTP
					id={`sftp_${String(index)}`}
					index={index}
					ws={socket.ws}
					uuid={socket.uuid}
				/>
			</SSHTBody>
		</SSHTContainer>
	);
};

SSHContainer.propTypes = {
	index: PropTypes.number.isRequired,
	my_server: PropTypes.object.isRequired,
	socket: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
};

export default SSHContainer;
