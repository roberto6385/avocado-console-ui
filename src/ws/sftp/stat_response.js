import SFTP from '../../dist/sftp_pb';
import {ERROR, STAT_SUCCESS} from '../../reducers/sftp';

export function statResponse({data}) {
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
						SFTP.CommandResponse.CommandCase.STAT
					) {
						const stat = command.getStat();
						console.log('command : stat', stat);

						// TODO getPermissions() is not a function error
						// const permissions = stat.getPermissions();
						const permissions = stat.array[0][2];
						const oct = permissions.toString(8);
						const splitedOct = oct.split('');
						console.log(oct);
						const per = splitedOct.splice(-3);

						return {
							type: STAT_SUCCESS,
							fileType: parseInt(splitedOct.join('')),
							permission: parseInt(per.join('')),
						};
					}
				} else if (
					response.getResponseCase() ===
					SFTP.Response.ResponseCase.ERROR
				) {
					const error = response.getError();
					console.log(error.getMessage());
					const errorIndex = error.getMessage().indexOf(']');
					const substring = error
						.getMessage()
						.substring(errorIndex + 1);
					console.log(substring.trim());
					return {
						type: ERROR,
						err: error.getMessage(),
					};
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
