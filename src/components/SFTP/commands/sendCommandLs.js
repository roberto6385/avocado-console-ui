import SFTP from '../../../dist/sftp_pb';
import {listConversion} from '../commands';

export const sendCommandByLs = (ws, uuid, path, dispatch) => {
	console.log('run sendCommandByLs');

	var msgObj = new SFTP.Message();
	msgObj.setType(SFTP.Message.Types.REQUEST);

	var reqObj = new SFTP.Request();
	reqObj.setType(SFTP.Request.Types.MESSAGE);

	var msgReqObj = new SFTP.MessageRequest();
	msgReqObj.setUuid(uuid);

	var cmdObj = new SFTP.CommandByLs();
	cmdObj.setPath(path);

	msgReqObj.setLs(cmdObj);
	reqObj.setBody(msgReqObj.serializeBinary());
	console.log(msgReqObj.array.length);
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
					// console.log(msgObj.getStatus());
					// console.log(msgObj.getResult());
					msgObj.getResult().trim() !== '' &&
						msgObj.getStatus() !== 'progress' &&
						listConversion(msgObj.getResult(), uuid, dispatch);
				}
			}
		}
	};
};
