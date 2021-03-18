import React, {useEffect} from 'react';
import {PropTypes} from 'prop-types';
import {BiTransferAlt} from 'react-icons/bi';
import SFTP from '../../dist/sftp_pb';
import {OPEN_TAB} from '../../reducers/common';
import {useDispatch} from 'react-redux';

const ConvertSFTP = ({data}) => {
	const dispatch = useDispatch();
	console.log(data);

	const ws = new WebSocket(`ws://${data.host}:8080/ws/sftp/protobuf`);
	const sendConnect = () => {
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

		console.log('send proto buffer', msgObj);
		console.log('send proto buffer binary', msgObj.serializeBinary());
		ws.send(msgObj.serializeBinary());
	};

	useEffect(() => {
		ws.binaryType = 'arraybuffer';

		ws.onopen = () => {
			console.log('Convert Sftp Server Connection');
		};

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
	}, [ws, dispatch, data]);

	return (
		<button
			onClick={sendConnect}
			style={{background: 'transparent', outline: 'none', border: 'none'}}
		>
			<BiTransferAlt style={{fontSize: '21px'}} />
		</button>
	);
};

ConvertSFTP.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ConvertSFTP;
