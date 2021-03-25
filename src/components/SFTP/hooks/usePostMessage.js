import React from 'react';
import SFTP from '../../../dist/sftp_pb';
import * as PropTypes from 'prop-types';

const usePostMessage = (keyword, data, uuid) => {
	// message 는 객체 형태로 전송, message 는 keyword,server id를 갖고있음.

	const msgObj = new SFTP.Message();
	msgObj.setType(SFTP.Message.Types.REQUEST);
	const reqObj = new SFTP.Request();
	let postObj = null;

	switch (keyword) {
		case 'Connection':
			reqObj.setType(SFTP.Request.Types.CONNECT);
			postObj = new SFTP.ConnectRequest();
			postObj.setHost(data.host);
			postObj.setUser(data.user);
			postObj.setPassword(data.password);
			postObj.setPort(data.port);
			break;

		case 'Disconnection':
			reqObj.setType(SFTP.Request.Types.DISCONNECT);
			postObj = new SFTP.DisconnectRequest();
			postObj.setUuid(uuid);
			break;

		default:
			break;
	}

	reqObj.setBody(postObj.serializeBinary());
	msgObj.setBody(reqObj.serializeBinary());

	return msgObj.serializeBinary();
};

usePostMessage.propTypes = {
	keyword: PropTypes.string.isRequired,
	data: PropTypes.object,
	uuid: PropTypes.string,
};

export default usePostMessage;
