import SFTP from '../../../dist/sftp_pb';
import {listConversion} from '../commands';

export const sendCommandByLs = (ws, uuid, path, dispatch) => {
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

	msgObj.setBody(reqObj.serializeBinary());

	console.log('send proto buffer', msgObj);
	console.log('send proto buffer binary', msgObj.serializeBinary());

	ws.send(msgObj.serializeBinary());

	ws.binaryType = 'arraybuffer';
	ws.onmessage = (evt) => {
		// listen to data sent from the websocket server

		// eslint-disable-next-line no-undef
		if (evt.data instanceof ArrayBuffer) {
			const message = SFTP.Message.deserializeBinary(evt.data);

			if (message.getType() === SFTP.Message.Types.RESPONSE) {
				const response = SFTP.Response.deserializeBinary(
					message.getBody(),
				);
				console.log('[receive]response type', response.getType());
				if (response.getType() === SFTP.Response.Types.MESSAGE) {
					const msgObj = SFTP.MessageResponse.deserializeBinary(
						response.getBody(),
					);
					console.log('[receive]message', msgObj);
					console.log('[receive]message to json', msgObj.toObject());

					listConversion(msgObj.getResult(), uuid, dispatch);
				}
			}
		}
	};
};
