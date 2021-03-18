import React, {useCallback, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import SFTP from '../../dist/sftp_pb';
import {CLOSE_TAB} from '../../reducers/common';
import {
	SFTP_DELETE_CURRENT_PATH,
	SFTP_SAVE_CURRENT_PATH,
} from '../../reducers/sftp';
import FileList from './FileList';
import History from './History';

const SftpContainer = styled.div`
	display: flex;
	height: 100%;
`;
const SFTPContainer = ({index, socket}) => {
	const {ws, uuid} = socket;
	const dispatch = useDispatch();

	// console.log(uuid);

	const onCLickChangeCurrentTab = useCallback(() => {
		// dispatch({type: CHANGE_CURRENT_TAB, data: id});
	}, []);

	useEffect(() => {
		ws.binaryType = 'arraybuffer';

		ws.onmessage = (evt) => {
			// eslint-disable-next-line no-undef
			if (evt.data instanceof ArrayBuffer) {
				const message = SFTP.Message.deserializeBinary(evt.data);
				if (message.getType() === SFTP.Message.Types.RESPONSE) {
					const response = SFTP.Response.deserializeBinary(
						message.getBody(),
					);
					console.log('[receive]response type', response.getType());
					if (response.getType() === SFTP.Response.Types.DISCONNECT) {
						const conObj = SFTP.DisconnectResponse.deserializeBinary(
							response.getBody(),
						);
						console.log('[receive]disconnect', conObj);
						console.log(
							'[receive]disconnect to json',
							conObj.toObject(),
						);

						if (conObj.getStatus() === 'disconnected') {
							console.log('SFTP Container Server Disconnection!');
							dispatch({
								type: SFTP_DELETE_CURRENT_PATH,
								data: uuid,
							});
							dispatch({type: CLOSE_TAB, data: index});
						}
					} else if (
						response.getType() === SFTP.Response.Types.MESSAGE
					) {
						const msgObj = SFTP.MessageResponse.deserializeBinary(
							response.getBody(),
						);
						console.log('[receive]message', msgObj);
						console.log(
							'[receive]message to json',
							msgObj.toObject(),
						);

						// useState로 받거나 reducer에 저장할 때
						let percent = null;

						if (
							msgObj.getStatus() !== undefined &&
							msgObj.getStatus() === 'progress'
						) {
							percent = msgObj
								.getResult()
								.replace('percent : ', '');
							console.log('[progress]..........', percent);
						}

						console.log(msgObj.getResult());
						// console.log(msgObj.getStatus());
						// console.log(msgObj.getUuid());
						// console.log(percent);

						dispatch({
							type: SFTP_SAVE_CURRENT_PATH,
							data: {
								uuid: msgObj.getUuid(),
								path: msgObj.getResult(),
							},
						});
					}
				}
			}
		};
	}, [ws, dispatch, index]);

	return (
		<SftpContainer onClick={onCLickChangeCurrentTab}>
			<FileList index={index} socket={socket} />
			<History index={index} socket={socket} />
		</SftpContainer>
	);
};

SFTPContainer.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
};

export default SFTPContainer;
