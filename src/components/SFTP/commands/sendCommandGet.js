import SFTP from '../../../dist/sftp_pb';
import {listConversion} from '../commands';
import {
	SFTP_SAVE_COMPARE_TEXT,
	SFTP_SAVE_CURRENT_TEXT,
} from '../../../reducers/sftp';

// eslint-disable-next-line no-undef
let fileBuffer = new ArrayBuffer(0);

const appendBuffer = (buffer1, buffer2) => {
	// eslint-disable-next-line no-undef
	var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
	// eslint-disable-next-line no-undef
	tmp.set(new Uint8Array(buffer1), 0);
	// eslint-disable-next-line no-undef
	tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
	return tmp.buffer;
};

export const sendCommandByGet = (
	command,
	ws,
	uuid,
	getPath,
	getFileName,
	dispatch,
) => {
	console.log('run sendCommandByGet');

	// eslint-disable-next-line no-undef
	return new Promise((resolve) => {
		var msgObj = new SFTP.Message();
		msgObj.setType(SFTP.Message.Types.REQUEST);

		var reqObj = new SFTP.Request();
		reqObj.setType(SFTP.Request.Types.MESSAGE);

		var msgReqObj = new SFTP.MessageRequest();
		msgReqObj.setUuid(uuid);

		let cmdObj;

		if (command === 'get' || command === 'edit') {
			cmdObj = new SFTP.CommandByGet();
			cmdObj.setPath(getPath);
			cmdObj.setFilename(getFileName);
			msgReqObj.setGet(cmdObj);
		} else {
			cmdObj = new SFTP.CommandByGetDirect();
			cmdObj.setPath(getPath);
			cmdObj.setFilename(getFileName);
			msgReqObj.setGetdirect(cmdObj);
		}

		reqObj.setBody(msgReqObj.serializeBinary());

		msgObj.setBody(reqObj.serializeBinary());

		ws.send(msgObj.serializeBinary());

		ws.binaryType = 'arraybuffer';
		ws.onmessage = (evt) => {
			// eslint-disable-next-line no-undef
			if (evt.data instanceof ArrayBuffer) {
				const message = SFTP.Message.deserializeBinary(evt.data);

				if (message.getType() === SFTP.Message.Types.RESPONSE) {
					const response = SFTP.Response.deserializeBinary(
						message.getBody(),
					);
					if (response.getType() === SFTP.Response.Types.MESSAGE) {
						const msgObj = SFTP.MessageResponse.deserializeBinary(
							response.getBody(),
						);
						console.log(msgObj.getStatus());
						msgObj.getStatus() === 'progress' &&
							console.log(msgObj.getResult());
					} else if (
						response.getType() === SFTP.Response.Types.FILE
					) {
						const fileObj = SFTP.FileResponse.deserializeBinary(
							response.getBody(),
						);

						var arr = fileObj.getContents_asU8();

						fileBuffer = appendBuffer(fileBuffer, arr);

						// 프로그래스바
						// var sum = this.state.getReceiveSum + arr.length;
						// const percent = (sum * 100) / fileObj.getFilesize();
						//
						// this.setState({
						// 	getReceiveSum: sum,
						// 	progress: percent,
						// });

						if (fileObj.getLast() === true) {
							const blob = new Blob([fileBuffer]);
							// eslint-disable-next-line no-undef
							fileBuffer = new ArrayBuffer(0);
							if (command === 'edit') {
								blob.stream()
									.getReader()
									.read()
									.then(({value, done}) => {
										return new TextDecoder('utf-8').decode(
											value,
										);
									})
									.then((text) => {
										dispatch({
											type: SFTP_SAVE_CURRENT_TEXT,
											data: {
												uuid,
												text,
												name: getFileName,
											},
										});
										dispatch({
											type: SFTP_SAVE_COMPARE_TEXT,
											data: {
												uuid,
												text,
												name: getFileName,
											},
										});
									});
							} else {
								var url = URL.createObjectURL(blob);
								var a = document.createElement('a');
								document.body.appendChild(a);
								a.style = 'display: none';
								a.href = url;
								a.download = getFileName;
								a.click();
								window.URL.revokeObjectURL(url);
							}
							resolve();

							// this.setState({
							// 	getReceiveSum: 0,
							// 	getProgress: 0,
							// });
						}
					}
				}
			}
		};
	});
};
