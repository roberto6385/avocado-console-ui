import SFTP from '../../dist/sftp_pb';
import {READ_SUCCESS} from '../../reducers/sftp';

let readPercent = 0;
let readByteSum = 0;
let text = '';

let fileBuffer = new ArrayBuffer(0);

const appendBuffer = (buffer1, buffer2) => {
	const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
	tmp.set(new Uint8Array(buffer1), 0);
	tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
	return tmp.buffer;
};

export async function readResponse({data, payload, pass}) {
	try {
		if (pass) {
			readPercent = 0;
			readByteSum = 0;
			if (payload.offset !== undefined) {
				readByteSum = payload.offset;
				readPercent = (readByteSum * 100) / payload.file.size;
			}
		}
		if (data instanceof ArrayBuffer) {
			const message = SFTP.Message.deserializeBinary(data);
			if (message.getTypeCase() === SFTP.Message.TypeCase.RESPONSE) {
				const response = message.getResponse();
				console.log(response);
				console.log('response status: ', response.getStatus());

				console.log(response.getResponseCase());
				console.log(SFTP.CommandResponse.CommandCase.READFILE);
				console.log(
					response.getResponseCase() ===
						SFTP.Response.ResponseCase.READFILE,
				);

				if (
					response.getResponseCase() ===
					SFTP.Response.ResponseCase.COMMAND
				) {
					const command = response.getCommand();
					if (
						command.getCommandCase() ===
						SFTP.CommandResponse.CommandCase.READFILE
					) {
						const read = command.getReadfile();
						const data = read.getData_asU8();
						fileBuffer = appendBuffer(fileBuffer, data);

						console.log('command : read file', read);
						console.log(read.getReadbytes());
						console.log('payload.file.size : ' + payload.file.size);

						if (read.getCompleted() === false) {
							readByteSum += read.getReadbytes();
						}
						readPercent = (readByteSum * 100) / payload.file.size;

						console.log('readByteSum : ' + readByteSum);
						console.log('readPercent : ' + readPercent);

						if (read.getCompleted()) {
							const blob = new Blob([fileBuffer]);
							if (payload.todo === 'read') {
								const url = URL.createObjectURL(blob);

								const a = document.createElement('a');
								document.body.appendChild(a);
								a.setAttribute('hidden', true);
								a.href = url;
								a.download = payload.file.name;
								a.click();
								window.URL.revokeObjectURL(url);
								fileBuffer = new ArrayBuffer(0);
							} else if (payload.todo === 'edit') {
								text = await new Response(blob).text();
								console.log(text);
								fileBuffer = new ArrayBuffer(0);
							}
						}
						if (read.getReadbytes() === -1) {
							readByteSum = 0;
							readPercent = 0;
						}
						return {
							type: READ_SUCCESS,
							byteSum: readByteSum,
							end:
								read.getReadbytes() === -1
									? true
									: readByteSum === payload.file.size,
							last: read.getCompleted(),
							percent:
								read.getReadbytes() === -1 ? 100 : readPercent,
							text,
						};
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
