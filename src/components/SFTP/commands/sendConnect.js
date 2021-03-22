import SFTP from '../../../dist/sftp_pb';

export const sendConnect = (ws, data) => {
	var msgObj = new SFTP.Message();
	msgObj.setType(SFTP.Message.Types.REQUEST);

	var reqObj = new SFTP.Request();
	reqObj.setType(SFTP.Request.Types.CONNECT);

	var conObj = new SFTP.ConnectRequest();
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
