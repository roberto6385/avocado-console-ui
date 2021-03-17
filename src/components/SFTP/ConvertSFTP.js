import React, {useEffect} from 'react';
import {PropTypes} from 'prop-types';
import {BiTransferAlt} from 'react-icons/bi';
import SFTP from '../../dist/sftp_pb';

const ConvertSFTP = ({data}) => {
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

		console.log('send proto buffer', msgObj);
		console.log('send proto buffer binary', msgObj.serializeBinary());

		ws.send(msgObj.serializeBinary());
	};

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
