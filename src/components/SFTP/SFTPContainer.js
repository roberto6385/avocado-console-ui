import React, {useCallback, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import {Card} from 'react-bootstrap';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import SFTP_Body from './SFTP';
import SFTP from '../../dist/sftp_pb';
import {CLOSE_TAB} from '../../reducers/common';

const SftpContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const SFTPBody = styled(Card.Body)`
	padding: 0px;
`;

const SFTPContainer = ({index, socket}) => {
	const {ws} = socket;
	const dispatch = useDispatch();

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
							dispatch({type: CLOSE_TAB, data: index});
						}
					}
				}
			}
		};
	}, [ws, dispatch, index]);

	return (
		<SftpContainer>
			<Card.Header style={{position: 'relative'}}>
				네비게이션 버튼들
			</Card.Header>
			<SFTPBody onClick={onCLickChangeCurrentTab}>
				<SFTP_Body
					id={`sftp ${String(index)}`}
					index={index}
					ws={socket.ws}
					uuid={socket.uuid}
				/>
			</SFTPBody>
		</SftpContainer>
	);
};

SFTPContainer.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
};

export default SFTPContainer;
