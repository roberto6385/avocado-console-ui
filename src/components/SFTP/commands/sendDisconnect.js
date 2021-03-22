import SFTP from '../../../dist/sftp_pb';

export const sendDisconnect = (ws, uuid) => {
	var msgObj = new SFTP.Message();
	msgObj.setType(SFTP.Message.Types.REQUEST);

	var reqObj = new SFTP.Request();
	reqObj.setType(SFTP.Request.Types.DISCONNECT);

	var disObj = new SFTP.DisconnectRequest();
	disObj.setUuid(uuid);

	reqObj.setBody(disObj.serializeBinary());

	msgObj.setBody(reqObj.serializeBinary());

	console.log('send proto buffer', msgObj);
	console.log('send proto buffer binary', msgObj.serializeBinary());

	ws.send(msgObj.serializeBinary());


};
