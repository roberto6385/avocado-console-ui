import SFTP from '../../../dist/sftp_pb';
import {
	SFTP_DELETE_CURRENT_LIST,
	SFTP_DELETE_CURRENT_PATH,
} from '../../../reducers/sftp';
import {CLOSE_TAB} from '../../../reducers/common';

export const sendDisconnect = (ws, uuid, index, dispatch) => {
	console.log('run sendDisconnect');

	var msgObj = new SFTP.Message();
	msgObj.setType(SFTP.Message.Types.REQUEST);

	var reqObj = new SFTP.Request();
	reqObj.setType(SFTP.Request.Types.DISCONNECT);

	var disObj = new SFTP.DisconnectRequest();
	disObj.setUuid(uuid);

	reqObj.setBody(disObj.serializeBinary());

	msgObj.setBody(reqObj.serializeBinary());

	// console.log('send proto buffer', msgObj);
	// console.log('send proto buffer binary', msgObj.serializeBinary());

	ws.send(msgObj.serializeBinary());

	ws.binaryType = 'arraybuffer';
	ws.onmessage = (evt) => {
		// console.log('run server connection');
		// listen to data sent from the websocket server

		// eslint-disable-next-line no-undef
		if (evt.data instanceof ArrayBuffer) {
			const message = SFTP.Message.deserializeBinary(evt.data);

			if (message.getType() === SFTP.Message.Types.RESPONSE) {
				const response = SFTP.Response.deserializeBinary(
					message.getBody(),
				);
				// console.log('[receive]response type', response.getType());
				if (response.getType() === SFTP.Response.Types.DISCONNECT) {
					const conObj = SFTP.DisconnectResponse.deserializeBinary(
						response.getBody(),
					);
					// console.log('[receive]disconnect', conObj);
					// console.log(
					// 	'[receive]disconnect to json',
					// 	conObj.toObject(),
					// );

					if (conObj.getStatus() === 'disconnected') {
						dispatch({
							type: SFTP_DELETE_CURRENT_PATH,
							data: uuid,
						});
						dispatch({
							type: SFTP_DELETE_CURRENT_LIST,
							data: uuid,
						});
						dispatch({type: CLOSE_TAB, data: index});
					}
				}
			}
		}
	};
};
