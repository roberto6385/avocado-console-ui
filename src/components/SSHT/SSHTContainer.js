import React, {useCallback} from 'react';
import * as PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import {AiOutlineFile, CgMaximizeAlt} from 'react-icons/all';

import SSHT from './SSHT';
import ConvertSFTP from '../SFTP/ConvertSFTP';
import {SSHTComponents} from '../../styles/ssht';
import {IconButton} from '../../styles/common';

const SSHTContainer = ({uuid, server_id}) => {
	const onCLickFullScreen = useCallback(() => {
		document.getElementById('full_ssht_' + uuid).requestFullscreen();
	}, []);

	return (
		<SSHTComponents className={'fix-height'}>
			<Card.Header>
				<IconButton>
					<AiOutlineFile />
				</IconButton>
				<IconButton>
					<CgMaximizeAlt onClick={onCLickFullScreen} />
				</IconButton>
				<ConvertSFTP server_id={server_id} />
			</Card.Header>
			<SSHT id={`full_ssht_${uuid}`} uuid={uuid} />
		</SSHTComponents>
	);
};

SSHTContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	server_id: PropTypes.number.isRequired,
};

export default SSHTContainer;
