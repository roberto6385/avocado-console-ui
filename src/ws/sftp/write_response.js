import SFTP from '../../dist/sftp_pb';
import {ERROR, WRITE_SUCCESS} from '../../reducers/sftp';

let writePercent = 0;
let writeByteSum = 0;
export function writeResponse({data, payload}) {
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
							SFTP.CommandResponse.CommandCase.WRITEFILE
						) {
							const write = command.getWritefile();
							console.log('command : write file', write);

							if (write.getCompleted() === false) {
								console.log(write.getWritebytes());
								writeByteSum += write.getWritebytes();
							} else {
								writeByteSum = 0;
							}
							writePercent =
								(writeByteSum * 100) / payload.file.size;

							console.log(
								'writeByteSum : ' +
									writeByteSum +
									'current file length : ' +
									payload.file.size,
							);
							console.log('writePercent : ' + writePercent);

							if (
								write.getWritebytes() === -1 ||
								write.getCompleted()
							) {
								writeByteSum = 0;
								writePercent = 0;
							}
							if (writePercent >= 100) writePercent -= 100;

							return resolve({
								type: WRITE_SUCCESS,
								byteSum: writeByteSum,
								end:
									write.getWritebytes() === -1
										? true
										: writeByteSum === payload.file.size,
								last: write.getCompleted(),
								percent:
									write.getWritebytes() === -1
										? 100
										: writePercent,
							});
						}
					}
					// else if (
					// 	response.getResponseCase() ===
					// 	SFTP.Response.ResponseCase.ERROR
					// ) {
					// 	const error = response.getError();
					// 	console.log(error.getMessage());
					// 	return {
					// 		type: ERROR,
					// 		err: error.getMessage(),
					// 	};
					// }
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
