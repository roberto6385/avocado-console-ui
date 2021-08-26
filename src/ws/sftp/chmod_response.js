import SFTP from '../../dist/sftp_pb';
import {CHMOD_SUCCESS, ERROR} from '../../reducers/sftp';

export function chmodResponse({data}) {
	try {
		if (data instanceof ArrayBuffer) {
			const message = SFTP.Message.deserializeBinary(data);
			if (message.getTypeCase() === SFTP.Message.TypeCase.RESPONSE) {
				const response = message.getResponse();
				console.log(response);
				console.log('response status: ', response.getStatus());

				if (
					response.getResponseCase() ===
					SFTP.Response.ResponseCase.COMMAND
				) {
					const command = response.getCommand();
					if (
						command.getCommandCase() ===
						SFTP.CommandResponse.CommandCase.CHMOD
					) {
						const chmod = command.getChmod();
						console.log('command : chmod', chmod);

						return {type: CHMOD_SUCCESS};
					}
				} else if (
					response.getResponseCase() ===
					SFTP.Response.ResponseCase.ERROR
				) {
					const error = response.getError();
					return {
						type: ERROR,
						err: error.getMessage(),
					};
				}
			} else {
				console.log('resourceGroupId is not protocol buffer.');
			}
		} else {
			const message = JSON.parse(data);

			console.log('resourceGroupId is not ArrayBuffer', message);

			if (message['status'] === 'connected') {
				console.log(message['uuid']);
			}
			console.log(message.result);
		}
	} catch (err) {
		console.log(err);
	}
}
