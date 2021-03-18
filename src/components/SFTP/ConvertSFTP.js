import React, {useEffect} from 'react';
import {PropTypes} from 'prop-types';
import {BiTransferAlt} from 'react-icons/bi';
import SFTP from '../../dist/sftp_pb';
import {OPEN_TAB} from '../../reducers/common';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

const ConvertButton = styled.button`
	background: transparent;
	outline: none;
	border: none;
`;

const ConvertIcon = styled(BiTransferAlt)`
	font-size: 21px;
`;

const ConvertSFTP = ({data}) => {
	const dispatch = useDispatch();

	const sendConnect = () => {
		const ws = new WebSocket(`ws://${data.host}:8080/ws/sftp/protobuf`);
		const msgObj = new SFTP.Message();
		msgObj.setType(SFTP.Message.Types.REQUEST);

		const reqObj = new SFTP.Request();
		reqObj.setType(SFTP.Request.Types.CONNECT);

		const conObj = new SFTP.ConnectRequest();
		conObj.setHost(data.host);
		conObj.setUser(data.user);
		conObj.setPassword(data.password);
		conObj.setPort(data.port);

		reqObj.setBody(conObj.serializeBinary());
		msgObj.setBody(reqObj.serializeBinary());

		ws.binaryType = 'arraybuffer';
		ws.onopen = () => ws.send(msgObj.serializeBinary());
		ws.onmessage = (evt) => {
			// eslint-disable-next-line no-undef
			if (evt.data instanceof ArrayBuffer) {
				const message = SFTP.Message.deserializeBinary(evt.data);
				if (message.getType() === SFTP.Message.Types.RESPONSE) {
					const response = SFTP.Response.deserializeBinary(
						message.getBody(),
					);
					console.log('[receive]response type', response.getType());
					if (response.getType() === SFTP.Response.Types.CONNECT) {
						const conObj = SFTP.ConnectResponse.deserializeBinary(
							response.getBody(),
						);
						console.log('[receive]connect', conObj);
						console.log(
							'[receive]connect to json',
							conObj.toObject(),
						);
						if (conObj.getStatus() === 'connected') {
							dispatch({
								type: OPEN_TAB,
								data: {
									id: data.id,
									type: 'SFTP',
									ws: ws,
									uuid: conObj.getUuid(),
								},
							});
						}
					}
				}
			}
		};
	};

	return (
		<ConvertButton onClick={sendConnect}>
			<ConvertIcon />
		</ConvertButton>
	);
};

ConvertSFTP.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ConvertSFTP;
