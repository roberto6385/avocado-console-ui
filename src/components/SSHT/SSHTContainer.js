import React, {useCallback, useRef, useState, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import {CgMaximizeAlt} from 'react-icons/all';

import SSHT from './SSHT';
import ConvertSFTP from '../SFTP/ConvertSFTP';
import {SSHTBody, SSHTComponents} from '../../styles/ssht';
import {IconButton} from '../../styles/common';
import _ from 'lodash';

const SSHTContainer = ({uuid, server_id}) => {
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

	// useEffect(() => {
	// 	const windowReizer = _.debounce(() => {
	// 		setSize(
	// 			sshtBody.current?.clientHeight,
	// 			sshtBody.current?.clientWidth,
	// 		);
	// 		console.log(
	// 			sshtBody.current?.clientHeight,
	// 			sshtBody.current?.clientWidth,
	// 		);
	// 	}, 1000);
	// });

	useEffect(() => {
		const windowReizer = _.debounce(() => {
			setSize(
				sshtBody.current?.clientHeight,
				sshtBody.current?.clientWidth,
			);
		}, 1000);

		window.addEventListener('resize', windowReizer);

		return () => {
			window.removeEventListener('resize', windowReizer);
		};
	}, [sshtBody]);

	return (
		<SSHTComponents className={'fix-height'}>
			<Card.Header>
				<IconButton>
					<CgMaximizeAlt onClick={onCLickFullScreen} />
				</IconButton>
				<ConvertSFTP server_id={server_id} />
			</Card.Header>
			<SSHTBody ref={sshtBody}>
				<SSHT uuid={uuid} height={height} width={width} />
			</SSHTBody>
		</SSHTComponents>
	);
};

SSHTContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	server_id: PropTypes.number.isRequired,
};

export default SSHTContainer;
