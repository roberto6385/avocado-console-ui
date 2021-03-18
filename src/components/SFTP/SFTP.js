import React, {useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import SFTP from '../../dist/sftp_pb';
import {CLOSE_TAB} from '../../reducers/common';

const SFTP_Body = ({index, ws, uuid}) => {
	// const [progress, setProgress] = useState(initState);

	const sendCommandByPwd = () => {
		const msgObj = new SFTP.Message();
		msgObj.setType(SFTP.Message.Types.REQUEST);

		const reqObj = new SFTP.Request();
		reqObj.setType(SFTP.Request.Types.MESSAGE);

		const msgReqObj = new SFTP.MessageRequest();
		msgReqObj.setUuid(uuid);

		const cmdObj = new SFTP.CommandByPwd();

		msgReqObj.setPwd(cmdObj);

		reqObj.setBody(msgReqObj.serializeBinary());

		msgObj.setBody(reqObj.serializeBinary());

		console.log('send proto buffer', msgObj);
		console.log('send proto buffer binary', msgObj.serializeBinary());

		ws.send(msgObj.serializeBinary());
	};

	useEffect(() => {
		sendCommandByPwd();
	}, [uuid]);

	return <div>SFTP_Body</div>;
};

SFTP_Body.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default SFTP_Body;
