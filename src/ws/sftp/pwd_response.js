import SFTP from '../../dist/sftp_pb';
import {ERROR, PWD_SUCCESS} from '../../reducers/sftp';
import {pathFunction} from '../../components/SFTP/listConversion';

export async function pwdResponse({data}) {
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

							return resolve({
								type: PWD_SUCCESS,
								path: pwd.getPath(),
								pathList,
							});
						}
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
