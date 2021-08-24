import SFTP from '../../dist/sftp_pb';
import {ERROR, LS_SUCCESS} from '../../reducers/sftp';

export function lsResponse({data}) {
	try {
		if (data instanceof ArrayBuffer) {
			const message = SFTP.Message.deserializeBinary(data);
			if (message.getTypeCase() === SFTP.Message.TypeCase.RESPONSE) {
				const response = message.getResponse();
				console.log(response);
				console.log('response status: ', response.getStatus());
				console.log(
					response.getResponseCase() ===
						SFTP.Response.ResponseCase.COMMAND,
				);
				if (
					response.getResponseCase() ===
					SFTP.Response.ResponseCase.COMMAND
				) {
					const command = response.getCommand();
					console.log(command.getCommandCase());
					console.log(SFTP.CommandResponse.CommandCase.LS);
					console.log(
						command.getCommandCase() ===
							SFTP.CommandResponse.CommandCase.LS,
					);
					if (
						command.getCommandCase() ===
						SFTP.CommandResponse.CommandCase.LS
					) {
						const ls = command.getLs();
						// console.log('command : ls', ls);

						const entryList = ls.getEntryList();
						// console.log('entry ', entryList.length);

						// const list = [];
						const list = [];
						for (let i = 0; i < entryList.length; i++) {
							const entry = entryList[i];
							// list.push(entry.getLongname());

							// new pure list
							const splitedValue = entry
								.getLongname()
								.replace(/\s{2,}/gi, ' ')
								.split(' ');
							// 나중에 longname에서 가져와야 할 정보나 값이 생기면
							// splitedValue 에서 사용하기 바람.
							// console.log(splitedValue);

							list.push({
								name: entry.getFilename(),
								size: entry.getAttributes().getSize(),
								type:
									entry
										.getAttributes()
										.getPermissionsstring()
										.charAt(0) === 'd'
										? 'directory'
										: 'file',
								lastModified: entry
									.getAttributes()
									.getMtimestring(),
								permission: entry
									.getAttributes()
									.getPermissionsstring(),
								link: splitedValue[1],
								owner: splitedValue[2],
								group: splitedValue[3],
							});
						}
						return {type: LS_SUCCESS, list: list};
					}
				} else if (
					response.getResponseCase() ===
					SFTP.Response.ResponseCase.ERROR
				) {
					const error = response.getError();
					console.log(error.getMessage());
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
