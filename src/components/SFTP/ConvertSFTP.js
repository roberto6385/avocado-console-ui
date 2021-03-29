import React from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch} from 'react-redux';
import {ConvertIcon} from '../../styles/sftp';
import {IconButton} from '../../styles/common';
import sftp_ws from '../../ws/sftp_ws';
import SFTP from '../../dist/sftp_pb';
import {OPEN_TAB} from '../../reducers/common';
import useSftpWebsocket from '../../hooks/useSftpWebsocket';

const ConvertSFTP = ({data}) => {
	const dispatch = useDispatch();

	const connection = () => {
		const ws = new WebSocket(`ws://${data.host}:8080/ws/sftp/protobuf`);
		const {readyState, message} = useSftpWebsocket({
			sftp_ws: ws,
			sendFunction: sftp_ws({
				keyword: 'Connection',
				ws,
				data,
			}),
		});
		console.log()
	};

	return (
		<IconButton onClick={connection}>
			<ConvertIcon />
		</IconButton>
	);
};

ConvertSFTP.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ConvertSFTP;
