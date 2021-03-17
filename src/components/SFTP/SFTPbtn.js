import React, {useEffect} from 'react';
import {BiTransferAlt} from 'react-icons/bi';
import {PropTypes} from 'prop-types';
import SFTP from '../../dist/sftp_pb';
import {OPEN_TAB} from '../../reducers/common';
import {useDispatch} from 'react-redux';

const SFTPbtn = ({data}) => {
	const dispatch = useDispatch();

	const connectSftp = () => {
		const ws = new WebSocket(
			'ws://' + data.host + ':8080/ws/sftp/protobuf',
		);

		var msgObj = new SFTP.Message();
		msgObj.setType(SFTP.Message.Types.REQUEST);

		var reqObj = new SFTP.Request();
		reqObj.setType(SFTP.Request.Types.CONNECT);

		var conObj = new SFTP.ConnectRequest();
		conObj.setHost('211.253.10.9');
		conObj.setUser('root');
		conObj.setPassword('Netand141)');
		conObj.setPort(10021);

		reqObj.setBody(conObj.serializeBinary());
		msgObj.setBody(reqObj.serializeBinary());

		ws.binaryType = 'arraybuffer';

		ws.onopen = () => {
			// on connecting, do nothing but log it to the console
			console.log('connected');
			ws.send(msgObj.serializeBinary());
		};
		ws.onmessage = (evt) => {
			const message = SFTP.Message.deserializeBinary(evt.data);

			const response = SFTP.Response.deserializeBinary(message.getBody());

			if (response.getType() === SFTP.Response.Types.CONNECT) {
				const conObj = SFTP.ConnectResponse.deserializeBinary(
					response.getBody(),
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
		};
	};

	return (
		<button
			onClick={connectSftp}
			style={{background: 'transparent', outline: 'none', border: 'none'}}
		>
			<BiTransferAlt style={{fontSize: '21px'}} />
		</button>
	);
};

SFTPbtn.propTypes = {
	data: PropTypes.object.isRequired,
};

export default SFTPbtn;
