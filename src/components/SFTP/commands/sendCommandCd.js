import SFTP from '../../../dist/sftp_pb';
import {sendCommandByPwd} from './sendCommandPwd';

export const sendCommandByCd = (ws, uuid, path, dispatch) => {
	console.log('run sendCommandByCd');

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
					const msg = SFTP.MessageResponse.deserializeBinary(
						response.getBody(),
					);
					msg.array.length !== 0 &&
						msg.array[1] === 'ok' &&
						sendCommandByPwd(ws, uuid, dispatch);
				}
			}
		}
	};
};
