import React, {useCallback} from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from 'react-bootstrap';
import {FaExpand} from 'react-icons/all';

import {CHANGE_CURRENT_TAB} from '../../reducers/common';
import styled from 'styled-components';
import SSHT from './SSHT';
import ConvertSFTP from '../SFTP/ConvertSFTP';

const SSHTContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const SSHTBody = styled(Card.Body)`
	padding: 0px;
`;

const SSHContainer = ({index, my_server, socket}) => {
	const dispatch = useDispatch();
	const {server} = useSelector((state) => state.common);

	const onCLickFullScreen = useCallback(() => {
		document.getElementById('ssht_' + String(index)).requestFullscreen();
	}, [index]);

	const onCLickChangeCurrentTab = useCallback(() => {
		// dispatch({type: CHANGE_CURRENT_TAB, data: id});
	}, []);

	return (
		<SSHTContainer>
			<Card.Header style={{position: 'relative'}}>
				<FaExpand
					onClick={onCLickFullScreen}
					style={{fontSize: '17px'}}
				/>
				<ConvertSFTP data={server.find((x) => x.id === my_server.id)} />
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
	);
};

SSHContainer.propTypes = {
	index: PropTypes.number.isRequired,
	my_server: PropTypes.object.isRequired,
	socket: PropTypes.object.isRequired,
};

export default SSHContainer;
