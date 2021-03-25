import React from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch} from 'react-redux';
import {ConvertIcon} from '../../styles/sftp';
import {IconButton} from '../../styles/common';
import usePostMessage from './hooks/usePostMessage';
import SFTP from '../../dist/sftp_pb';
import {OPEN_TAB} from '../../reducers/common';

const ConvertSFTP = ({data}) => {
	const dispatch = useDispatch();

	const connection = () => {
		const ws = new WebSocket(`ws://${data.host}:8080/ws/sftp/protobuf`);
		ws.binaryType = 'arraybuffer';
		ws.onopen = async () => {
			const {uuid} = await usePostMessage({
				keyword: 'Connection',
				ws,
				data,
			});
			dispatch({
				type: OPEN_TAB,
				data: {
					id: data.id,
					type: 'SFTP',
					ws: ws,
					uuid: uuid,
				},
			});
		};
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
