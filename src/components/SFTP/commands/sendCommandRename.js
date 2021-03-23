import SFTP from '../../../dist/sftp_pb';

export const sendCommandByRename = (ws, uuid, path, newPath) => {
	console.log('run sendCommandByRename');

	var msgObj = new SFTP.Message();
	msgObj.setType(SFTP.Message.Types.REQUEST);

	var reqObj = new SFTP.Request();
	reqObj.setType(SFTP.Request.Types.MESSAGE);

	var msgReqObj = new SFTP.MessageRequest();
	msgReqObj.setUuid(uuid);

	var cmdObj = new SFTP.CommandByRename();
	cmdObj.setOldpath(path);
	cmdObj.setNewpath(newPath);

	msgReqObj.setRename(cmdObj);

	reqObj.setBody(msgReqObj.serializeBinary());

	msgObj.setBody(reqObj.serializeBinary());

	ws.send(msgObj.serializeBinary());
};
