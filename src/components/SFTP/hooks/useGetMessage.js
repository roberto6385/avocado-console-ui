import React from 'react';
import SFTP from '../../../dist/sftp_pb';

const getMessage = (evt) => {
	const appendBuffer = (buffer1, buffer2) => {
		var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
		tmp.set(new Uint8Array(buffer1), 0);
		tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
		return tmp.buffer;
	};

	let progress = 0;
	let getReceiveSum = 0;
	let fileBuffer;

	// listen to data sent from the websocket server

	if (evt.data instanceof ArrayBuffer) {
		const message = SFTP.Message.deserializeBinary(evt.data);

		if (message.getType() === SFTP.Message.Types.RESPONSE) {
			const response = SFTP.Response.deserializeBinary(message.getBody());
			console.log('[receive]response type', response.getType());
			if (response.getType() === SFTP.Response.Types.CONNECT) {
				const postObj = SFTP.ConnectResponse.deserializeBinary(
					response.getBody(),
				);
				if (postObj.getStatus() === 'connected') {
					return {
						type: 'Connection',
						uuid: postObj.getUuid(),
					};
				}
			} else if (response.getType() === SFTP.Response.Types.DISCONNECT) {
				const postObj = SFTP.DisconnectResponse.deserializeBinary(
					response.getBody(),
				);
				console.log('[receive]disconnect', postObj);
				console.log('[receive]disconnect to json', postObj.toObject());

				if (postObj.getStatus() === 'disconnected') {
					return {
						type: 'Disconnection',
					};
				}
			} else if (response.getType() === SFTP.Response.Types.MESSAGE) {
				const msgObj = SFTP.MessageResponse.deserializeBinary(
					response.getBody(),
				);
				console.log('[receive]message', msgObj);
				console.log('[receive]message to json', msgObj.toObject());

				var percent = progress;

				if (
					msgObj.getStatus() !== undefined &&
					msgObj.getStatus() === 'progress'
				) {
					percent = msgObj.getResult().replace('percent : ', '');
					console.log('[progress]..........', percent);
				}

				if (percent === 100) {
					return {
						result: msgObj.getResult(),
						cmdStatus: msgObj.getStatus(),
						progress: msgObj.getResult().replace('percent : ', ''),
					};
				}
			} else if (response.getType() === SFTP.Response.Types.FILE) {
				const fileObj = SFTP.FileResponse.deserializeBinary(
					response.getBody(),
				);
				console.log('[receive]file', fileObj);
				console.log('[receive]file to json', fileObj.toObject());

				var arr = fileObj.getContents_asU8();

				console.log('file as u8', arr);

				fileBuffer = appendBuffer(fileBuffer, arr);
				console.log('fileBuffer---> ', fileBuffer);

				// 프로그래스바
				var sum = getReceiveSum + arr.length;
				const percent = (sum * 100) / fileObj.getFilesize();
				console.log(sum);
				console.log(percent);

				if (percent === 100) {
					return {
						getReceiveSum: sum,
						progress: percent,
					};
				}

				if (fileObj.getLast() === true) {
					const blob = new Blob([fileBuffer]);

					fileBuffer = new ArrayBuffer(0);

					var url = URL.createObjectURL(blob);

					var a = document.createElement('a');
					document.body.appendChild(a);
					a.style = 'display: none';
					a.href = url;
					// a.download = state.getFileName;
					a.click();
					window.URL.revokeObjectURL(url);
				}
			}
		} else {
			console.log('data is not protocol buffer.');
		}
	} else {
		const message = JSON.parse(evt.data);

		// setState({dataFromServer: message})
		console.log('data is not ArrayBuffer', message);

		if (message['status'] === 'connected') {
			return {type: 'Connection', uuid: message.uuid};
		}
	}
};

export default getMessage;
