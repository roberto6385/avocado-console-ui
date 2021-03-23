import SFTP from '../../../dist/sftp_pb';

export const sendCommandByRm = (ws, uuid, path, type) => {
	console.log('run sendCommandByRm');

	console.log(path);
	// eslint-disable-next-line no-undef
	return new Promise((resolve) => {
		var msgObj = new SFTP.Message();
		msgObj.setType(SFTP.Message.Types.REQUEST);

		var reqObj = new SFTP.Request();
		reqObj.setType(SFTP.Request.Types.MESSAGE);

		var msgReqObj = new SFTP.MessageRequest();
		msgReqObj.setUuid(uuid);
		var cmdObj =
			type === 'file'
				? new SFTP.CommandByRm()
				: new SFTP.CommandByRmdir();
		cmdObj.setPath(path);

		type === 'file' ? msgReqObj.setRm(cmdObj) : msgReqObj.setRmdir(cmdObj);
		reqObj.setBody(msgReqObj.serializeBinary());
		msgObj.setBody(reqObj.serializeBinary());

		ws.send(msgObj.serializeBinary());
		ws.binaryType = 'arraybuffer';
		ws.onmessage = (evt) => {
			// eslint-disable-next-line no-undef
			if (evt.data instanceof ArrayBuffer) {
				const message = SFTP.Message.deserializeBinary(evt.data);

				if (message.getType() === SFTP.Message.Types.RESPONSE) {
					const response = SFTP.Response.deserializeBinary(
						message.getBody(),
					);
					if (response.getType() === SFTP.Response.Types.MESSAGE) {
						const msgObj = SFTP.MessageResponse.deserializeBinary(
							response.getBody(),
						);
						console.log(msgObj.getStatus());
						resolve();
						// msgObj.getResult().trim() !== '' &&
						// msgObj.getStatus() !== 'progress' &&
					}
				}
			}
		};
	});
};
