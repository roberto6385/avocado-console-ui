import React, {useCallback, useRef, useState, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import {useSelector} from 'react-redux';
import {Card} from 'react-bootstrap';
import {CgMaximizeAlt} from 'react-icons/all';

import SSHT from './SSHT';
import ConvertSFTP from '../SFTP/ConvertSFTP';
import {SSHTBody, SSHTContainer} from '../../styles/ssht';
import {IconButton} from '../../styles/common';

const SSHContainer = ({index, display, server_id, socket}) => {
	const {server} = useSelector((state) => state.common);
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);
	const sshtBody = useRef(null);

	const onCLickFullScreen = useCallback(() => {
		document.getElementById('ssht_' + String(index)).requestFullscreen();
	}, [index]);

	const setSize = useCallback((h, w) => {
		if (Number.isInteger(h) && Number.isInteger(w)) {
			setHeight(h);
			setWidth(w);
		}
	}, []);

	useEffect(() => {
		if (display && sshtBody) {
			setSize(
				sshtBody.current?.clientHeight,
				sshtBody.current?.clientWidth,
			);
		} else {
			setSize(0, 0);
		}
	});

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (display && sshtBody && sshtBody.current)
				setSize(
					sshtBody.current?.clientHeight,
					sshtBody.current?.clientWidth,
				);
		});
	}, [display]);

	return (
		<SSHTContainer className={'fix-height'}>
			<Card.Header>
				<IconButton>
					<CgMaximizeAlt onClick={onCLickFullScreen} />
				</IconButton>
				<ConvertSFTP data={server.find((x) => x.id === server_id)} />
			</Card.Header>
			<SSHTBody ref={sshtBody} id={`ssht_${String(index)}`}>
				<SSHT
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
