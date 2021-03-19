import React, {useCallback, useRef, useState, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from 'react-bootstrap';
import {FaExpand} from 'react-icons/all';

import styled from 'styled-components';
import SSHT from './SSHT';
import ConvertSFTP from '../SFTP/ConvertSFTP';
import {NAV_HEIGHT} from '../../styles/global';

const SSHTContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	.card-header {
		height: ${NAV_HEIGHT};
		fontsize: 17px;
	}
`;

const SSHTBody = styled(Card.Body)`
	padding: 0px;
	flex: 1;
`;

const SSHContainer = ({index, display, server_id, socket}) => {
	const dispatch = useDispatch();
	const {server} = useSelector((state) => state.common);
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);
	const ref = useRef(null);

	const onCLickFullScreen = useCallback(() => {
		document.getElementById('ssht_' + String(index)).requestFullscreen();
	}, [index]);

	const onCLickChangeCurrentTab = useCallback(() => {
		// dispatch({type: CHANGE_CURRENT_TAB, data: id});
	}, []);

	useEffect(() => {
		if (display) {
			setHeight(ref.current.clientHeight);
			setWidth(ref.current.clientWidth);
		} else {
			setHeight(0);
			setWidth(0);
		}
	});

	return (
		<SSHTContainer>
			<Card.Header>
				<FaExpand onClick={onCLickFullScreen} />
				<ConvertSFTP data={server.find((x) => x.id === server_id)} />
			</Card.Header>
			<SSHTBody ref={ref}>
				<SSHT
					id={`ssht_${String(index)}`}
					index={index}
					display={display}
					height={height}
					width={width}
					ws={socket.ws}
					uuid={socket.uuid}
				/>
			</SSHTBody>
		</SSHTContainer>
	);
};

SSHContainer.propTypes = {
	index: PropTypes.number.isRequired,
	display: PropTypes.bool.isRequired,
	server_id: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
};

export default SSHContainer;
