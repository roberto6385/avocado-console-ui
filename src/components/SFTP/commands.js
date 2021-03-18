import SFTP from '../../dist/sftp_pb';

export const sendConnect = (ws, data) => {
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
};

export const sendDisconnect = (ws, uuid) => {
	const msgObj = new SFTP.Message();
	msgObj.setType(SFTP.Message.Types.REQUEST);

	const reqObj = new SFTP.Request();
	reqObj.setType(SFTP.Request.Types.DISCONNECT);

	const disObj = new SFTP.DisconnectRequest();
	disObj.setUuid(uuid);

	reqObj.setBody(disObj.serializeBinary());
	msgObj.setBody(reqObj.serializeBinary());

	ws.send(msgObj.serializeBinary());
};

export const sendCommandByCd = (ws, uuid, path) => {
	var msgObj = new SFTP.Message();
	msgObj.setType(SFTP.Message.Types.REQUEST);

	var reqObj = new SFTP.Request();
	reqObj.setType(SFTP.Request.Types.MESSAGE);

	var msgReqObj = new SFTP.MessageRequest();
	msgReqObj.setUuid(uuid);

	var cmdObj = new SFTP.CommandByCd();
	cmdObj.setPath(path);

	msgReqObj.setCd(cmdObj);
	reqObj.setBody(msgReqObj.serializeBinary());
	msgObj.setBody(reqObj.serializeBinary());

	ws.send(msgObj.serializeBinary());
};

export const sendCommandByPwd = (ws, uuid) => {
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

	ws.send(msgObj.serializeBinary());
};
