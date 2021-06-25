import SFTP from '../../dist/sftp_pb';
import {READ_SUCCESS} from '../../reducers/sftp';

let readPercent = 0;
let readByteSum = 0;

let fileBuffer = new ArrayBuffer(0);

const appendBuffer = (buffer1, buffer2) => {
	const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
	tmp.set(new Uint8Array(buffer1), 0);
	tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
	return tmp.buffer;
};

export async function readResponse({data, payload}) {
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
						SFTP.CommandResponse.CommandCase.READFILE
					) {
						const read = command.getReadfile();
						const data = read.getData_asU8();
						fileBuffer = appendBuffer(fileBuffer, data);

						console.log('command : read file', read);
						console.log(read.getReadbytes());
						console.log('payload.file.size : ' + payload.file.size);

						if (read.getCompleted() === false)
							readByteSum += read.getReadbytes();
						readPercent = (readByteSum * 100) / payload.file.size;

						console.log('readByteSum : ' + readByteSum);
						console.log('readPercent : ' + readPercent);

						if (read.getCompleted()) {
							const blob = new Blob([fileBuffer]);
							const url = URL.createObjectURL(blob);

							const a = document.createElement('a');
							document.body.appendChild(a);
							a.setAttribute('hidden', true);
							a.href = url;
							a.download = payload.file.name;
							a.click();
							window.URL.revokeObjectURL(url);

							fileBuffer = new ArrayBuffer(0);
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