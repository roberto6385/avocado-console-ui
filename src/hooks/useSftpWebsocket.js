import React, {useRef, useState, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import SFTP from '../dist/sftp_pb';

const useSftpWebsocket = ({sftp_ws, sendFunction, otherData}) => {
	const [message, setMessage] = useState('');
	const socket = useRef(null);
	let progress = 0;
	let getReceiveSum = 0;
	let fileBuffer = new ArrayBuffer(0);
	const appendBuffer = (buffer1, buffer2) => {
		const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
		tmp.set(new Uint8Array(buffer1), 0);
		tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
		return tmp.buffer;
	};

	useEffect(() => {
		console.log('running sftp socket hook');
		socket.current = sftp_ws;
		socket.current.binaryType = 'arraybuffer';

		socket.current.onopen = () => {
			console.log('sftp socket connected');
			sendFunction();
		};

		socket.current.onclose = () => {
			console.log('closed');
			// dispatch delete tab, disconnection function execution
		};

		socket.current.onmessage = (evt) => {
			if (evt.data instanceof ArrayBuffer) {
				const message = SFTP.Message.deserializeBinary(evt.data);

				if (message.getType() === SFTP.Message.Types.RESPONSE) {
					const response = SFTP.Response.deserializeBinary(
						message.getBody(),
					);
					console.log('[receive]response type', response.getType());
					if (response.getType() === SFTP.Response.Types.CONNECT) {
						const msgObj = SFTP.ConnectResponse.deserializeBinary(
							response.getBody(),
						);

						if (msgObj.getStatus() === 'connected') {
							setMessage(msgObj.toObject());
						}
					} else if (
						response.getType() === SFTP.Response.Types.DISCONNECT
					) {
						const msgObj = SFTP.DisconnectResponse.deserializeBinary(
							response.getBody(),
						);

						if (msgObj.getStatus() === 'disconnected') {
							setMessage(msgObj.toObject());
						}
					} else if (
						response.getType() === SFTP.Response.Types.MESSAGE
					) {
						const msgObj = SFTP.MessageResponse.deserializeBinary(
							response.getBody(),
						);

						var percent = progress;

						if (
							msgObj.getStatus() !== undefined &&
							msgObj.getStatus() === 'progress'
						) {
							percent = msgObj
								.getResult()
								.replace('percent : ', '');
							console.log('[progress]..........', percent);
						} else {
							if (
								otherData.keyword !== 'CommandByGet' &&
								// keyword !== 'CommandByPut' &&
								otherData.keyword !== 'EDIT'
							) {
								console.log(msgObj.toObject());
								console.log(msgObj.getStatus());
								setMessage(msgObj.toObject());
							}
						}
					} else if (
						response.getType() === SFTP.Response.Types.FILE
					) {
						const msgObj = SFTP.FileResponse.deserializeBinary(
							response.getBody(),
						);

						var arr = msgObj.getContents_asU8();

						console.log('file as u8', arr);

						fileBuffer = appendBuffer(fileBuffer, arr);
						console.log('fileBuffer---> ', fileBuffer);

						// 프로그래스바
						var sum = getReceiveSum + arr.length;
						const percent = (sum * 100) / msgObj.getFilesize();

						console.log({
							getReceiveSum: sum,
							progress: percent,
						});

						if (msgObj.getLast() === true) {
							const blob = new Blob([fileBuffer]);

							// eslint-disable-next-line no-undef
							fileBuffer = new ArrayBuffer(0);

							if (otherData.keyword === 'EDIT') {
								// let text = '';
								blob.stream()
									.getReader()
									.read()
									.then(({value, done}) => {
										setMessage(
											new TextDecoder('utf-8').decode(
												value,
											),
										);
									});
							} else {
								var url = URL.createObjectURL(blob);
								var a = document.createElement('a');
								document.body.appendChild(a);
								a.style = 'display: none';
								a.href = url;
								a.download = otherData.fileName;
								a.click();
								window.URL.revokeObjectURL(url);
								setMessage(msgObj.toObject());
							}
						}
					}
				}
			}
		};
		return () => {
			socket.current.close();
			socket.current = null;
		};
	}, [message]);

	function readyState() {
		switch (socket.current.readyState) {
			case 0:
				return 'CONNECTING';
			case 1:
				return 'OPEN';
			case 2:
				return 'CLOSING';
			case 3:
				return 'CLOSED';
			default:
				return;
		}
	}

	return {
		message,
		readyState,
	};
};

useSftpWebsocket.propTypes = {
	sftp_ws: PropTypes.object.isRequired,
	sendFunction: PropTypes.object.isRequired,
	otherData: PropTypes.object,
};

export default useSftpWebsocket;
