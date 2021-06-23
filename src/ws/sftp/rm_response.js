import SFTP from '../../dist/sftp_pb';
import {RM_SUCCESS} from '../../reducers/sftp';

export async function rmResponse({data}) {
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
						SFTP.CommandResponse.CommandCase.RM
					) {
						const rm = command.getRm();
						console.log('command : rm', rm);

						return {type: RM_SUCCESS};
					}
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
	}
}
