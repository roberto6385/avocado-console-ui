import React, {useCallback, useRef, useState, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import {CgMaximizeAlt} from 'react-icons/all';

import SSHT from './SSHT';
import ConvertSFTP from '../SFTP/ConvertSFTP';
import {SSHTBody, SSHTContainer} from '../../styles/ssht';
import {IconButton} from '../../styles/common';

const SSHContainer = ({uuid, server_key}) => {
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);
	const sshtBody = useRef(null);

	const onCLickFullScreen = useCallback(() => {
		sshtBody.current.requestFullscreen();
	}, [sshtBody]);

	const setSize = useCallback((h, w) => {
		if (Number.isInteger(h) && Number.isInteger(w)) {
			setHeight(h);
			setWidth(w);
		}
	}, []);

	useEffect(() => {
		if (sshtBody && sshtBody.current) {
			setSize(
				sshtBody.current?.clientHeight,
				sshtBody.current?.clientWidth,
			);
			console.log(
				sshtBody.current?.clientHeight,
				sshtBody.current?.clientWidth,
			);
		} else setSize(0, 0);
	});

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (sshtBody && sshtBody.current)
				setSize(
					sshtBody.current?.clientHeight,
					sshtBody.current?.clientWidth,
				);
		});
	}, [sshtBody]);

	return (
		<SSHTContainer className={'fix-height'}>
			<Card.Header>
				<IconButton>
					<CgMaximizeAlt onClick={onCLickFullScreen} />
				</IconButton>
				<ConvertSFTP server_key={server_key} />
			</Card.Header>
			<SSHTBody ref={sshtBody}>
				<SSHT uuid={uuid} height={height} width={width} />
			</SSHTBody>
		</SSHTContainer>
	);
};

SSHContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	server_key: PropTypes.string.isRequired,
};

export default SSHContainer;
