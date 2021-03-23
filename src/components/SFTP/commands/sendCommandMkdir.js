import SFTP from '../../../dist/sftp_pb';

export const sendCommandByMkdir = (ws, uuid, path) => {
	console.log('run sendCommandByMkdir');

	var msgObj = new SFTP.Message();
	msgObj.setType(SFTP.Message.Types.REQUEST);

	var reqObj = new SFTP.Request();
	reqObj.setType(SFTP.Request.Types.MESSAGE);

	var msgReqObj = new SFTP.MessageRequest();
	msgReqObj.setUuid(uuid);

	var cmdObj = new SFTP.CommandByMkdir();
	cmdObj.setPath(path);

	msgReqObj.setMkdir(cmdObj);
	reqObj.setBody(msgReqObj.serializeBinary());
	msgObj.setBody(reqObj.serializeBinary());

	ws.send(msgObj.serializeBinary());
};
