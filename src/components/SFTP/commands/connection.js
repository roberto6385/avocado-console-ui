import SFTP from '../../../dist/sftp_pb';

export const connection = (ws) => {
	ws.onopen = () => {
		var msgObj = new SFTP.Message();
		msgObj.setType(SFTP.Message.Types.REQUEST);

		var reqObj = new SFTP.Request();
		reqObj.setType(SFTP.Request.Types.CONNECT);

		var conObj = new SFTP.ConnectRequest();
		conObj.setHost('211.253.10.9');
		conObj.setUser('root');
		conObj.setPassword('Netand141)');
		conObj.setPort(10021);

		reqObj.setBody(conObj.serializeBinary());
		msgObj.setBody(reqObj.serializeBinary());

		ws.binaryType = 'arraybuffer';
		ws.send(msgObj.serializeBinary());
		ws.onmessage = (evt) => {
			const message = SFTP.Message.deserializeBinary(evt.data);
			console.log(message);
			const response = SFTP.Response.deserializeBinary(message.getBody());

			if (response.getType() === SFTP.Response.Types.CONNECT) {
				const conObj = SFTP.ConnectResponse.deserializeBinary(
					response.getBody(),
				);

				if (conObj.getStatus() === 'connected') {
					// setUuid(conObj.getUuid());
					console.log(conObj);
					console.log(ws);
				}
			}
		};
	};
};
