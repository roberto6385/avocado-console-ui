import SFTP from '../../../dist/sftp_pb';

export const sendCommandByPut = (
	command,
	uploadFile,
	ws,
	uuid,
	getPath,
	getFileName,
) => {
	console.log('run sendCommandByPut');

	// eslint-disable-next-line no-undef
	return new Promise((resolve) => {
		console.log('file size : ', uploadFile.size);

		const uploadFileSize = uploadFile.size;

		const chunkSize = 8 * 1024;
		const fileSlices = [];

		for (var i = 0; i < uploadFileSize; i += chunkSize) {
			(function (start) {
				fileSlices.push({offset: start, length: chunkSize + start});
			})(i);
		}

		const sendBuffer = (data) => {
			console.log('recv data : ', data);
			var msgObj = new SFTP.Message();
			msgObj.setType(SFTP.Message.Types.REQUEST);

			var reqObj = new SFTP.Request();
			reqObj.setType(SFTP.Request.Types.MESSAGE);

			var msgReqObj = new SFTP.MessageRequest();
			msgReqObj.setUuid(uuid);

			var cmdObj;

			if (command === 'put') {
				cmdObj = new SFTP.CommandByPut();
				msgReqObj.setPut(cmdObj);
			} else if (command === 'put-direct') {
				cmdObj = new SFTP.CommandByPutDirect();
				msgReqObj.setPutdirect(cmdObj);
			}

			cmdObj.setPath(getPath);
			cmdObj.setFilename(getFileName);
			cmdObj.setFilesize(uploadFileSize);
			cmdObj.setContents(Buffer.from(data.buffer));
			cmdObj.setOffset(1);
			cmdObj.setLast(data.last);

			reqObj.setBody(msgReqObj.serializeBinary());

			msgObj.setBody(reqObj.serializeBinary());

			//console.log('send proto buffer', cmdObj);
			//console.log('send proto buffer binary', cmdObj.serializeBinary());

			ws.send(msgObj.serializeBinary());
		};

		const readBytes = (file, slice) => {
			const reader = new FileReader();

			// eslint-disable-next-line no-undef
			return new Promise((resolve) => {
				reader.onload = (e) => {
					resolve(e.target.result);
				};

				var blob = file.slice(slice.offset, slice.length);
				reader.readAsArrayBuffer(blob);
			});
		};

		var total = 0;
		const readFile = (file, slice) => {
			readBytes(file, slice).then((data) => {
				// send protocol buffer
				console.log('read arraybuffer : ', data);
				total += data.byteLength;

				if (0 < fileSlices.length) {
					sendBuffer({buffer: data, last: false});

					readFile(file, fileSlices.shift());
				} else {
					sendBuffer({buffer: data, last: true});
					console.log('file read end. total size : ', total);
					resolve();
				}
			});
		};

		readFile(uploadFile, fileSlices.shift());
	});
};
