import SFTP from '../../dist/sftp_pb';
import {CREATE_NEW_WEBSOCKET_SUCCESS, ERROR} from '../../reducers/sftp';

export async function createNewSocketResponse({data}) {
	return new Promise((resolve, reject) => {
		try {
			if (data instanceof ArrayBuffer) {
				const message = SFTP.Message.deserializeBinary(data);
				if (message.getTypeCase() === SFTP.Message.TypeCase.RESPONSE) {
					const response = message.getResponse();
					console.log(response);
					console.log('response status: ', response.getStatus());

					if (
						response.getResponseCase() ===
						SFTP.Response.ResponseCase.CONNECT
					) {
						const connect = response.getConnect();
						return resolve({
							type: CREATE_NEW_WEBSOCKET_SUCCESS,
							uuid: connect.getUuid(),
						});
					} else if (
						response.getResponseCase() ===
						SFTP.Response.ResponseCase.ERROR
					) {
						const error = response.getError();
						console.log(error.getMessage());
						return resolve({
							type: ERROR,
							err: error.getMessage(),
						});
					}
				} else {
					console.log('data is not protocol buffer.');
				}
			} else {
				const message = JSON.parse(data);

				console.log('data is not ArrayBuffer', message);

				if (message['status'] === 'connected') {
					console.log(message['uuid']);
				}
				console.log(message.result);
			}
		} catch (err) {
			console.log(err);
			reject({type: ERROR, err: err});
		}
	});
}
