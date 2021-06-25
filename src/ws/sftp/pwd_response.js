import SFTP from '../../dist/sftp_pb';
import {PWD_SUCCESS} from '../../reducers/sftp';
import {pathFunction} from '../../components/SFTP/listConversion';

export async function pwdResponse({data}) {
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
						SFTP.CommandResponse.CommandCase.PWD
					) {
						const pwd = command.getPwd();
						console.log('command : pwd', pwd);

						let pathList = pathFunction({path: pwd.getPath()});

						return {
							type: PWD_SUCCESS,
							path: pwd.getPath(),
							pathList,
						};
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