import React from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch} from 'react-redux';
import {sendConnect} from './commands/sendConnect';
import {ConvertIcon} from '../../styles/sftp';
import {IconButton} from '../../styles/common';
import usePostMessage from './hooks/usePostMessage';
import useGetMessage from './hooks/useGetMessage';
import SFTP from '../../dist/sftp_pb';
import {OPEN_TAB} from '../../reducers/common';
import getMessage from './hooks/useGetMessage';

const ConvertSFTP = ({data}) => {
	const dispatch = useDispatch();

	console.log(data);
	const connection = () => {
		const ws = new WebSocket(`ws://${data.host}:8080/ws/sftp/protobuf`);
		ws.binaryType = 'arraybuffer';
		ws.onopen = () => {
			ws.send(usePostMessage('Connection', data));
			console.log(usePostMessage('Connection', data));
		};
		ws.onmessage = (evt) => {
			const result = getMessage(evt);
			console.log(result);
			result.type === 'Connection' &&
				dispatch({
					type: OPEN_TAB,
					data: {
						id: data.id,
						type: 'SFTP',
						ws: ws,
						uuid: result.uuid,
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
